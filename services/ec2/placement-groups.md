# EC2 Placement Groups

**Placement groups** control *how* EC2 instances are physically placed on AWS hardware to influence performance, latency, and fault tolerance.

### 1. Cluster Placement Group

📌 **Goal:** Maximum performance

* Instances are placed close together in the same rack / hardware cluster
* Extremely low latency, high bandwidth (up to 100 Gbps)
* Best for HPC, big data, ML jobs
* Cluster Placement Group has NO Hard Max Instance Count Limit

✅ Pros:

* Fastest network communication

❌ Cons:

* If the rack fails → all instances fail (low fault tolerance)
* Usually only one Availability Zone

**Use when:** performance > availability

<img width="1233" height="611" alt="image" src="https://github.com/user-attachments/assets/ea8c77c9-62f3-425d-96b9-5815ec202ecd" />

Restrictions for Cluster Placement Groups

- Single AZ only — All instances must be in the same Availability Zone. You cannot span multiple AZs
- Same instance family recommended — AWS recommends using the same instance type for best performance
- Cannot be merged — You can't combine two placement groups
- One placement group per instance — An instance can only belong to one placement group at a time
- No Dedicated Hosts — You cannot launch Dedicated Hosts in a placement group
- Capacity risk — The more instances you pack together, the higher the chance of getting an `InsufficientInstanceCapacity` error, **since all instances need to be on the same physical networking backbone**

---

According to AWS documentation: "If you receive a capacity error when launching an instance in a placement group that already has running instances, stop and start ALL of the instances in the placement group, and try to add/launch new instance again." Restarting the instances **MAY** migrate them to **hardware that has capacity for all the requested instances**. 

```txt
1. STOP    → Stop ALL existing instances in the placement group
      ↓
2. START   → Start ALL those existing instances again (they migrate to new hardware)
      ↓
3. LAUNCH(add)  → Launch(add) the NEW instance into the placement group
```

But this is rely on luck! There could still not be enough capacity room.

Best Practices to Avoid Capacity Errors:
- Launch all instances in a single request — AWS is more likely to find capacity for all at once than one by one
- Use On-Demand Capacity Reservations — Actually reserves the hardware for you
- Use the same instance type for all instances in the group

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
