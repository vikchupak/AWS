# Multi-AZ Deployment

**Multi-AZ (Availability Zone) deployment** means your application is running in multiple **isolated zones within the same AWS region**. Each AZ has independent power, networking, and connectivity. The goal is **high availability and fault tolerance**: if one AZ goes down, the others can continue serving traffic.

For your backend API containers (e.g., ECS tasks, EKS pods, or Docker containers on EC2):

1. **Deploy the same container in multiple AZs**

   * Example: Your ECS service has 6 tasks. With Multi-AZ, 2 tasks are in AZ A, 2 in AZ B, and 2 in AZ C.
   * This ensures that if AZ A fails, your service in AZ B and C still works.

2. **Load balancing**

   * Usually done via an **ALB (Application Load Balancer)**.
   * The ALB automatically routes traffic to healthy containers across all AZs.

3. **Data considerations**

   * For databases, Multi-AZ often means **synchronous replication** (e.g., RDS Multi-AZ), so containers in any AZ can access the same data reliably.

✅ So yes, you literally run the **same backend container in multiple AZs** for redundancy and resilience.

## If I only run 1 ECS task with 1 container, I cant use Multi-AZ deploment?

Correct — if you only have **1 task (1 container)**, you **cannot truly achieve Multi-AZ deployment**. Here's why:

* **Multi-AZ requires replication**. You need at least **one instance in each AZ** to tolerate an AZ failure.
* With only **1 task**, it will run in **one AZ only**. If that AZ goes down, your service goes down too.

**What you can do:**

1. **Increase the number of tasks**

   * Run **at least 1 task per AZ**.
   * For example, 2 AZs → 2 tasks, 3 AZs → 3 tasks.
   * ECS or EKS will schedule tasks automatically in different AZs if you configure it.

2. **Auto Scaling + Multi-AZ awareness**

   * Let ECS/EKS place tasks across AZs for you, so if an AZ fails, the service continues.

**TL;DR:** Multi-AZ only works if you have multiple instances/tasks so that each AZ can host at least one.

## If set 1 ECS task with 1 container but set 2 AZs as deployment targets that means the task will be deployed in one AZ. If that AZ fails, will the task be resheduled to the other AZ?

Yes — **exactly**. Here’s how it works in ECS (or similar orchestrators):

* If you have **1 task** and you configure the service to use **2 AZs**, ECS will **pick one AZ** to run the task.
* **If that AZ fails**, ECS detects that the task is **unhealthy** or **stopped**.
* ECS will then **reschedule the task** in one of the **remaining healthy AZs**.

⚠️ Caveat:

* During the failover, there will be **downtime** because there’s only one task. Multi-AZ doesn’t make a single task “highly available” instantly — it just allows ECS to try to restart it elsewhere.
* True **zero-downtime Multi-AZ deployment** requires **at least one task per AZ**, so traffic can still be served while one AZ is down.

**Summary table:**

| Tasks | AZs | Effect                                                                         |
| ----- | --- | ------------------------------------------------------------------------------ |
| 1     | 2+  | Task runs in 1 AZ. Failover reschedules task if AZ fails → temporary downtime. |
| ≥2    | 2+  | Tasks can run in multiple AZs simultaneously → continuous availability.        |

---

## But for case with 2 tasks and 2 AZs the tasks should be stateles?

Exactly — that’s the key point.

When you have **2 tasks across 2 AZs**, they can tolerate an AZ failure **without downtime** only if your tasks are **stateless**. Here’s why:

### Stateless tasks

* **No local state** (files, memory, session info).
* All state is stored externally (database, S3, Redis, etc.).
* Any task can handle any request.
* Failover is seamless — if AZ A goes down, the task in AZ B keeps serving requests.

### Stateful tasks

* Maintain **local state** inside the container (e.g., local files, in-memory sessions).
* If AZ A goes down and it had a stateful task, that data is **lost**.
* Rescheduling the task in AZ B won’t recover the lost state automatically.

✅ Best practice: **Backend API containers in Multi-AZ setups should be stateless**, with state stored in external services.

## How multi-AZ databases are handled?

Multi-AZ databases are handled very differently from stateless application containers because the **database itself is stateful**. The key idea is to **replicate data synchronously or asynchronously across AZs** so that if one AZ fails, another can take over with minimal data loss. Here’s a breakdown:

### 1. **RDS Multi-AZ (Amazon Relational Database Service)**

* **Setup**: You have a **primary DB instance** in one AZ and a **standby instance** in another AZ.
* **Replication**: Synchronous — changes are written to both primary and standby at the same time.
* **Failover**: If the primary AZ fails, RDS automatically **promotes the standby** to primary.
* **Impact**: Connection is briefly interrupted (usually <60s), but no data is lost.
* **Example engines**: MySQL, PostgreSQL, Oracle, SQL Server, MariaDB.

### 2. **Aurora (RDS managed cluster)**

* **Setup**: Primary writer node + multiple read replicas across AZs.
* **Replication**: Storage layer is **distributed across AZs**, so all replicas see the same data.
* **Failover**: If the writer fails, one of the replicas is promoted automatically.
* **Impact**: Very low downtime and minimal data loss because storage is shared and multi-AZ.

### 3. **Self-managed databases (EC2 / Kubernetes)**

* **Synchronous replication**: e.g., PostgreSQL streaming replication, Galera Cluster for MySQL.

  * Each AZ has a replica. Writes block until confirmed by other replicas → data is safe but higher latency.
* **Asynchronous replication**: Faster writes, but if primary fails, recent transactions may be lost.

### Key Points

1. **State must be replicated** to survive AZ failures.
2. **Failover** can be automatic (RDS, Aurora) or manual (self-managed).
3. **Latency**: Synchronous replication across AZs can add a tiny delay to writes.

✅ **Summary**: Multi-AZ databases are **stateful high-availability setups** where data is automatically copied across AZs. For your backend API tasks, you don’t store state locally; instead, they connect to a Multi-AZ database to stay resilient.
