## LB gets Network interface/public IP in each public subnet?

List all public IPs and what uses them
```bash
aws ec2 describe-network-interfaces \
--query "NetworkInterfaces[?Association.PublicIp!=null].[NetworkInterfaceId,Association.PublicIp,Attachment.InstanceId,SubnetId,Description]" \
--output table
```

List all public and private IPs and what uses them
```bash
aws ec2 describe-network-interfaces \
--query "NetworkInterfaces[].[NetworkInterfaceId,PrivateIpAddress,join(',',PrivateIpAddresses[].PrivateIpAddress),Association.PublicIp,SubnetId,Attachment.InstanceId,Description]" \
--output table
```

✅ Exactly!

Let’s go step by step so you see *precisely* how AWS Load Balancers (like your **Application Load Balancer**) handle **ENIs** and **IPs** in **public subnets**:

## ⚙️ 1. ALB architecture in short

When you create an **Application Load Balancer (ALB)**, you must specify **at least two subnets** in **different Availability Zones (AZs)**.
Each subnet you pick must be:

* **public** (has route to Internet Gateway), and
* **in a different AZ** for redundancy.

## 🧩 2. What AWS creates behind the scenes

For each of those subnets, AWS automatically creates:

* **1 Elastic Network Interface (ENI)**
* **1 Public IPv4 address** (allocated from AWS pool — not from your Elastic IPs unless you attach manually)

So if you have your ALB spanning **3 subnets**, you will have **3 ENIs and 3 public IPs** associated with that ALB.

---

## 💡 3. Why multiple IPs?

Because:

* Each AZ gets its own **Load Balancer node** for **high availability**.
* DNS (e.g. `production-raise-your-iq-1777637495.us-east-1.elb.amazonaws.com`) resolves to **all of those IPs**.
* If one AZ fails, Route 53 / AWS ELB automatically stops routing to that IP.

---

## 🧭 4. Summary

| Concept          | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| **ENIs per ALB** | One per subnet (and AZ)                                         |
| **IP type**      | Public IPv4 (auto-assigned, unless you use Elastic IPs via NLB) |
| **Why multiple** | Redundancy and load balancing across AZs                        |
| **Location**     | Always in the subnets you attach when creating ALB              |

# What is ALB Node

An **ALB node** (or **load balancer node**) is one of the **actual compute nodes** that AWS deploys *behind the scenes* to implement your **Application Load Balancer (ALB)**.

When you create an ALB and associate it with multiple subnets (in different AZs), AWS automatically spins up **one load balancer node per subnet**.

So, for example:

| AZ           | Subnet            | ALB Node |
| ------------ | ----------------- | -------- |
| `us-east-1a` | `public-subnet-a` | Node A   |
| `us-east-1b` | `public-subnet-b` | Node B   |

Together, these nodes make up your ALB.

---

## 🧠 **How it works**

### 🔹 Step-by-step:

1. You create an ALB in VPC `vpc-123` with subnets in `1a` and `1b`.
2. AWS deploys:

   * **Node A** (ENI with private and public IPs) in subnet `1a`.
   * **Node B** (ENI with private and public IPs) in subnet `1b`.
3. The **DNS name** of the ALB (e.g. `my-alb-123456.us-east-1.elb.amazonaws.com`) will resolve to the **public IPs of both nodes** — typically in a round-robin fashion.
4. Incoming traffic is distributed among these nodes, which then forward requests to registered **targets** in the same VPC.

---

## 🧩 **Key Properties of ALB Nodes**

| Property                              | Description                                                  |
| ------------------------------------- | ------------------------------------------------------------ |
| **Created Automatically**             | You don’t manage them manually — AWS handles scaling and HA. |
| **One per AZ**                        | Each AZ (subnet) you associate gets one node.                |
| **Elastic Network Interfaces (ENIs)** | Each node has one or more ENIs in your subnet.               |
| **DNS-based Load Balancing**          | The ALB DNS name resolves to the IPs of its nodes.           |
| **Dynamic Scaling**                   | AWS can add/remove nodes for capacity or maintenance.        |

---

## 🌍 **Example Visualization**

```
Internet
   │
   ▼
 ┌──────────────────────────────┐
 │    DNS: my-alb-xxxx.elb.amazonaws.com
 │     resolves to: 3.90.1.2, 54.160.2.3
 └──────────────────────────────┘
   │               │
   ▼               ▼
[ ALB Node A ]   [ ALB Node B ]
us-east-1a       us-east-1b
(public subnets)
   │               │
   ▼               ▼
Private targets (EC2/ECS tasks)
in private subnets
```

---

## 🔐 **Important Notes**

* You **cannot SSH** or directly interact with ALB nodes — they are **managed AWS infrastructure**.
* They **do not appear as EC2 instances** — only as **ENIs** in your subnets (visible in the VPC console under *Network Interfaces*).
* If you disable an AZ from your ALB, AWS removes the corresponding node.

---

## 🧱 **Analogy**

Think of it like this:

> The **ALB** you create is a *logical resource* (a DNS + configuration).
>
> The **ALB nodes** are the *physical instances* of that load balancer that actually do the routing and health checks inside each subnet.
