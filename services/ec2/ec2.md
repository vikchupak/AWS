- EC2 are VMs
- EC2 Hosts - physical servers where EC2 run
  - EC2 Host AZ resilent
  - EC2 instance is NOT AZ resilient
- EC2 Storage
  - Instance (local) store (ephemeral)
    - **Block** storage devices
    - **NOT all EC2 support it**
    - Storage physically **attached to the host** where your EC2 instance runs
    - Data is lost when:
      - instance **stops or terminates**
        - Stopping instnce frees space on host, so the next time we run istance it has to be run on another host
      - host hardware fails
  - (Remote) storage
    - [EBS](https://github.com/vikchupak/AWS/blob/main/services/ebs/ebs.md)
    - S3
    - EFS
  - Data network
    - This is not storage. It is the network for EC2 data transfer
      - Instance → EBS traffic
      - Instance → S3 traffic
      - Instance → Instance traffic
- **Remote Storage are AZ resilent and `non-cross-AZ shareable`**

# Instance types

- General purpose
- Compute optimized
- Memory optimized
- Accelerated computing
- Storage optimized
- High-performance computing (HPC) optimized

# Instance States (Lifecycle)

- [Instance States Doc](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_InstanceState.html)

| State             | Description                                             |
| ----------------- | ------------------------------------------------------- |
| **pending**       | Instance is launching; resources are being provisioned. |
| **running**       | Instance is fully launched and ready to accept traffic. |
| **stopping**      | Stop request issued; instance is shutting down.         |
| **stopped**       | Instance is stopped; EBS volumes persist, no CPU usage. |
| **shutting-down** | Terminate request issued; instance is being deleted.    |
| **terminated**    | Instance is permanently deleted; cannot be restarted.   |

### Hibernate instances

- **Purpose**
  - Hibernate lets you "stop(pause)" the instance, save its in-memory state (RAM) to EBS, and later restart it exactly where it left off
  - When instance hibernates → RAM + EBS root (OS) are saved. Additional EBS volumes are not affected. Instance (local) store volume data is always lost
  - Useful for stateful applications, long-running processes, or dev/test environments where you want to save state without paying for compute while stopped
- **Hibernate prerequisites**
  - Instance must use an EBS root volume (instance-store cannot hibernate)
  - Hibernate requires encryption on the root EBS volume
  - Supported instance types. Most modern instance types support Hibernate
  - Max RAM hibernation supported is ~150 GB
  - OS support. Must be supported Amazon Linux, Ubuntu, Windows, etc.
  - **You cannot enable Hibernate after the instance is running—it must be selected at launch**
- **Enable Hibernate**
  - EC2 → Launch Instance
  - Configure Instance Details -> Advanced Details → Instance Interruption Behavior
  - Choose Hibernate
- **Billing**
  - Pay only for EBS storage, not compute while stopped/hibernated
- **Hibernate only possible when stopping an instance. When terminatin an instance, no Hibernate really possible**
- Stopping an instance means
  - The virtual machine (VM) is shut down on the host
  - RAM and Instance (local) store volumes are lost
  - Instance metadata (instance ID, private IP in VPC, tags, etc.) is preserved
  - The root EBS volume (OS) and additional EBS volumes remain intact
  - Instance can be restarted later
- Terminating an instance means
  - Delete/destroy everything exept additional EBS volumes

# Purchase options

[prices doc](https://aws.amazon.com/ec2/pricing/)

---

Instance compute capacity
- CPU
- RAM
- Storage
- Network speed

---

- On-demand instances
  - Pay a fixed price by hour(seconds precision) for an instance running
- Spot instances
  - Pay the same as On-demand instances, but hourly price is significantly less than On-demand
- Reserved instances
  - Pay for a specific instance type and quantity
  - Commit on 1 or 3 years
  - 3 payment ways
    - No upfront. Pay reduces per/s fee (the most expensive of 3)
    - All upfront. No per/s fee- (cheapest of 3)
    - Partial upfront. Mix of No upfront & All upfront (middle of 3)
- Dedicated Hosts
  - Pay for hosts, not instances
  - On-demand or reserved
- Dedicated Instances
  - Pay additional/extra fee for no other customers instances to use the same host as you. Pay for instances.

---

- Scheduled **reserved** Instances (Legacy)
- On-demand (EC2) capacity **reservation**
  - EC2 capacity is finite in each AZ
    - Each Availability Zone has a limited number of physical servers for each instance type
    - If an AZ is busy (e.g., high On-Demand usage), you may get: `InsufficientCapacityError`
  - Guarantees EC2 capacity in a specific instance type + AZ
  - No 1 or 3 years commitment
  - Pay for reservation as if you run on-demand instances
    - Price the same as on-demand instances
    - Reserved capacity is billed at the On-Demand rate, **whether used or not**
    - When an instance runs in reserved capacity, you pay exactly as if it were a normal On-Demand instance. (Summary bill is not doubled)

---

- (EC2 Instance) Savings Plans

# Instance Status Checks

<img width="1241" height="627" alt="image" src="https://github.com/user-attachments/assets/c7a5ec34-6401-4b36-a62d-376d65737442" />

- System status
- Instance status

# Instance metadata

The following accessible from inside any instance and provides all the instance metadata

```bash
http://169.254.169.254/latest/meta-data
```

# Instance Roles vs Instance Profile

- An Instance Profile is a container for an IAM Role that can be attached to an EC2 instance
- One EC2 instance → One profile → One role

# EC2 Placement Groups

**Placement groups** control *how* EC2 instances are physically placed on AWS hardware to influence performance, latency, and fault tolerance.

### 1. Cluster Placement Group

📌 **Goal:** Maximum performance

* Instances are placed close together in the same rack / hardware cluster
* Extremely low latency, high bandwidth (up to 100 Gbps)
* Best for HPC, big data, ML jobs

✅ Pros:

* Fastest network communication

❌ Cons:

* If the rack fails → all instances fail (low fault tolerance)
* Usually only one Availability Zone

**Use when:** performance > availability

<img width="1233" height="611" alt="image" src="https://github.com/user-attachments/assets/ea8c77c9-62f3-425d-96b9-5815ec202ecd" />

### 2. Spread Placement Group

📌 **Goal:** Maximum fault tolerance

* Instances are spread across distinct hardware
* Each instance placed on separate racks
* Reduces correlated failures

Limits:

* Up to **7 instances per AZ** per spread group

✅ Pros:

* Highest availability

❌ Cons:

* Not optimized for speed

**Use when:** critical instances must not fail together

<img width="1212" height="602" alt="image" src="https://github.com/user-attachments/assets/ea97b6bf-b74b-41df-bd78-067fd32fbe78" />

### 3. Partition Placement Group

📌 **Goal:** Balance performance & resilience

* Instances divided into partitions
* Each partition has its own rack set
* Failure affects only one partition

Used by:

* Hadoop, Kafka, HDFS, Cassandra

✅ Pros:

* Controlled blast radius

❌ Cons:

* Slightly more complex

**Use when:** large distributed systems

<img width="1246" height="643" alt="image" src="https://github.com/user-attachments/assets/a01f6406-8a22-43ea-9f5e-8e02752f8aa3" />

## Quick Comparison

| Type      | Performance  | Fault Tolerance | Typical Use              |
| --------- | ------------ | --------------- | ------------------------ |
| Cluster   | 🚀 Very High | ❌ Low           | HPC, ML, Big Data        |
| Spread    | ⚡ Normal     | ✅ Very High     | Critical standalone apps |
| Partition | ⚡ High       | ✅ High          | Distributed storage      |

# Enhanced EC2 networking

- Single Root I/O Virtualization (**SR-IOV**) enables **Enhanced Networking** on EC2 instances
- SR-IOV is a hardware virtualization technology that allows a single physical network interface card (NIC) to present itself as multiple virtual network interfaces directly to virtual machines
- Enabled by default in most instance types

Instead of routing traffic through the hypervisor’s virtual network stack, SR-IOV allows the instance to:

* Access the NIC more directly
* Achieve **lower latency**
* Get **higher packets per second**
* Improve **throughput and consistency**

<img width="514" height="278" alt="image" src="https://github.com/user-attachments/assets/14312250-8ee6-4344-9158-d55986e8182a" />

# EBS-Optimized EC2

- **EBS-optimized** means your EC2 instance has **dedicated network bandwidth for Amazon EBS traffic**, separate from normal internet/VPC traffic.
- Enabled by default in most instance types

This prevents disk I/O from competing with your app’s network traffic → resulting in:

* ✅ More consistent disk performance
* ✅ Higher IOPS & throughput
* ✅ Lower latency spikes
