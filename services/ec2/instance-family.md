# Instance family (category)

Instance Family and Category are essentially the same thing.

- Instance Family	- AWS documentation term
- Instance Category - Informal term

```txt
Instance Family
      └── Instance Type
                └── Instance Size
```

| **Term** | **What it is** | **Example** |
|---|---|---|
| **Instance Family** | The **broad category/group** | General Purpose, Compute Optimized, Memory Optimized |
| **Instance Type** | The **specific model** within a family | `m5`, `c5`, `r5`, `i3`, `hpc6a` |
| **Instance Size** | The **size** of that specific type | `large`, `xlarge`, `2xlarge` |

```txt
m5.xlarge
│ │  └── Size
│ └──── Generation
└────── Family
```
- m = Family (General Purpose)
- 5 = Generation (5th generation)
- xlarge = Size

---

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
