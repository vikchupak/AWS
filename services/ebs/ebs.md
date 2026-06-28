# EBS volume types

IOPS - Input / Output Operations Per Second

---

## `General Purpose`. SSD-backed volumes

- IOPS depends on Size
- Provides a balance of price and performance. We recommend these volumes for most workloads
- Can be attached to only ONE instance at a time

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

## `Provisioned IOPS SSD`. io1 / io2

- IOPS independent of Size.
- Provides high performance for mission-critical, low-latency, or high-throughput workloads.

---

* For mission-critical, latency-sensitive workloads
* Predictable high IOPS
* io2 offers:

  * Higher durability (99.999%)
  * Up to 64,000 IOPS
  * Multi-Attach support
    ✅ For large databases (Oracle, SAP HANA, big OLTP)

---

## 🆚 io1 vs io2 – Provisioned IOPS SSD

| Feature             | io1                  | io2                               |
| ------------------- | -------------------- | --------------------------------- |
| Status              | Older generation     | Newer generation ✅                |
| Max IOPS            | 64,000               | **256,000** ✅                     |
| Max throughput      | 1,000 MB/s           | **4,000 MB/s** ✅                  |
| Durability          | 99.8% (0.2% failure) | **99.999%** ✅                     |
| IOPS per GB ratio   | 50:1                 | **1,000:1** ✅                     |
| Multi-Attach        | Yes                  | Yes                               |
| Latency consistency | Good                 | **Better & more stable** ✅        |
| Price per IOPS      | Higher               | **Lower** ✅                       |
| Recommended         | Legacy setups        | **Production high-performance** ✅ |

---

## Key differences explained

### 🔹 io2 is superior in every technical way

* Much higher IOPS scalability
* Consistent performance under load
* 5x better durability
* Cheaper per IOPS

### 🔹 io1 is only used when:

* You run legacy systems
* Existing environments haven't migrated
* Cost controls already locked

---

## 🐢 `HDD-based` volumes (for throughput-heavy workloads)

A magnetic volume is a volume physically backed by traditional, spinning magnetic hard disk drives (HDDs) rather than solid-state drives (SSDs)

### 🔸 Magnetic - Standard (Legacy)

- This is the old generation. It is slow (100 IOPS), small (max 1 TiB), and uses old architectural baselines. It is rarely used today because gp3 or sc1 completely outclass it in value.

### 🔸 st1 – Standard `Throughput-optimized` HDD

- st1 stands for **S**tandard **T**hroughput, gen 1
- Teclically magnetic
- **A low-cost HDD designed for `frequently accessed`, throughput-intensive workloads**
- Designed for large, **sequential** workloads
- Max throughput: 500 MB/s
- Not for boot volumes
  ✅ Ideal for big data, log processing, streaming

### 🔸 sc1 – Standard Cold HDD

- sc1 stands for **S**tandard **C**old, gen 1
- Teclically magnetic
- **The lowest-cost HDD design for `less frequently accessed` workloads.**
- Lowest cost
- For **infrequently** accessed data
- Max throughput: 250 MB/s
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
