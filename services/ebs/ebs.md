# EBS volume types

Here are the **AWS EBS (Elastic Block Store) volume types** with clear, practical differences:

---

IOPS - Input / Output Operations Per Second

---

## 🚀 SSD-backed volumes (for IOPS-intensive workloads)

### 🔹 gp3 – General Purpose SSD (recommended)

* Latest default and most flexible
* **Baseline:** 3,000 IOPS & 125 MB/s included
* Scale independently up to:

  * 16,000 IOPS
  * 1,000 MB/s throughput
* Lower cost than gp2 with better performance control
  ✅ Best for most workloads (apps, databases, boot volumes)

### 🔹 gp2 – General Purpose SSD (legacy)

* Performance tied to size
* 3 IOPS per GB (burst up to 16,000)
* Being phased out in favor of gp3
  ⚠️ Use only if you must support older setups

### 🔹 io1 / io2 – Provisioned IOPS SSD

* For mission-critical, latency-sensitive workloads
* Predictable high IOPS
* io2 offers:

  * Higher durability (99.999%)
  * Up to 64,000 IOPS
  * Multi-Attach support
    ✅ For large databases (Oracle, SAP HANA, big OLTP)

---

## 🐢 HDD-backed volumes (for throughput-heavy workloads)

### 🔸 st1 – Throughput Optimized HDD

* Designed for large, sequential workloads
* Max throughput: 500 MB/s
* Not for boot volumes
  ✅ Ideal for big data, log processing, streaming

### 🔸 sc1 – Cold HDD

* Lowest cost
* For infrequently accessed data
* Max throughput: 250 MB/s
  ✅ Archives, rarely accessed data

---

## ✅ Quick selection guide

| Use Case             | Recommended                  |
| -------------------- | ---------------------------- |
| OS / Boot volume     | gp3                          |
| Web servers          | gp3                          |
| Databases            | io2 (or gp3 with tuned IOPS) |
| Big data / analytics | st1                          |
| Cold storage         | sc1                          |
| High performance DB  | io2                          |

---

## 🔧 Practical advice

* Prefer **gp3** unless you have a specific reason not to.
* Use **io2** when you need guaranteed high IOPS with low latency.
* Avoid gp2 in new setups.
* HDD types cannot be used as root volumes.
