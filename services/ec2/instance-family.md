# Instance family (category) & type

> Instance Family and Category are essentially the same thing.
> - Instance Family	- AWS documentation term
> - Instance Category - Informal term

### Instance family

An Instance Family refers to a group of instances designed for a specific workload type or optimized for a particular resource (e.g., CPU, Memory, or Storage). It usually includes:
- family prefix
- generation number
- optional capability flags

Examples: m5, c6g, r7a, t4g

```txt
c  6  g  
|  |  └── Capabilities (g = AWS Graviton CPU)
|  └──── Generation (6th Gen)
└────── Family Prefix (c = Compute Optimized)
```

### Instance type

An Instance Type is the complete identifier for a specific server specification. It combines the Instance Family with a specific Size (vCPU count, RAM capacity, network bandwidth).

Examples: m5.xlarge, c6g.2xlarge, t4g.micro

```txt
c6g  .  2xlarge
 |         └──── Instance Size (8 vCPUs, 16 GiB RAM)
 └────────────── Instance Family
```

### Families list

- [Doc](https://aws.amazon.com/ec2/instance-types/)
- General purpose
- Compute optimized
  - Optimized CPU
- Memory optimized
  - Optimized RAM
- Accelerated computing
  - Optimized GPU
- Storage optimized
  - Optimized **local store**
  - I3 / I3en
    - Optimized For High random IOPS, high throughput
    - Storage Type Local NVMe SSD
    - Best Used For NoSQL databases (Cassandra, MongoDB), transactional databases
  - D3 / D3en
    - Optimized For High sequential write, massive capacity
    - Storage Type Local HDD
    - Best Used For Massively parallel processing (MPP), data warehousing, log processing
- High-performance computing (HPC) optimized
  - Compute-Optimized instances on steroids
  - Instances are combined in clusters working together as a single supercomputer
  - Optimized For Massively parallel workloads, ultra-high inter-instance network throughput, and high memory bandwidth per core
    - Optimized CPU & Memory Bandwidth: They use top-tier processors and have massive memory bandwidth per core so the CPU is never waiting around for data
    - Ultra-Fast Cluster Communication (EFA): They come with native support for Elastic Fabric Adapter (EFA)

<img width="700" alt="image" src="https://github.com/user-attachments/assets/fd3f6cc9-615b-45b4-888b-d37f16610b93" />
