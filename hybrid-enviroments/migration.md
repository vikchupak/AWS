# Migration

### Snowball family (offline)

Move large amount of data IN and OUT of AWS

- **Snowball (legacy)**
  - Physical storage units
  - Data encrypted using KMS
  - Storage ONLY
  - 50TB or 80TB 1 unit/device capacity
  - 10TB - 10PB data range transfer is economically reasonable to use snowball over internet
- **Snowball edge**
  - Physical storage units
  - Data encrypted using KMS
  - BOTH Storage and Compute
  - Larger Storage capacity and transfer speed than in Snowball
  - Types
    - Storage-Optimized
      - 80TB, 24vCPU, 32Gib RAM
    - Storage-Optimized with EC2
      - The same as Storage-Optimized, but with 1TB SSD
    - Compute-Optimized
      - 100TB+7.68 NVME, 52vCPU, 208Gib RAM
    - Compute-Optimized with GPU
      - The same as Compute-Optimized, but with a GPU
- **Snowmobile**
  - Literally a truck
  - When more than 10PB data to transfer
