# MIGRATION

## Move data(storage) to S3/EFS/FSx/EBS

### Snowball family

Move large amount of data IN and OUT of AWS **offline**

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

### AWS DataSync

Move large amount of data IN and OUT of AWS **online**

- [Doc](https://aws.amazon.com/datasync/)
- 10Gibs
- Cost is per 1GB for data moved
- Encryption in-transit (TLS)
- Architecture
  - Run DataSync Agent on-prem
  - Use NFS or SMB protocol to connect to on-prem storage
  - On-prem DataSync Agent connects to DataSync Endpoint in AWS
  - Connection. Storage (on-prem) -> NFS or SMB protocol -> DataSync Agent (on-prem) -> TLS -> DataSync Endpoint (AWS) -> EFS, FSx, or S3 (AWS)
-  You can configure DataSync to make an initial copy of your entire dataset and **schedule subsequent incremental transfers of changing data toward Amazon S3**
-  AWS DataSync is primarily used to migrate existing data to Amazon S3
-  Enabling S3 Object Lock prevents your existing and future records from being deleted or overwritten

## Move servers(virtual machines + hard drive + OS + applications) to EC2s

### AWS Application Migration Service (AWS MGN)

AWS Application Migration Service (AWS MGN) is the primary migration service recommended for lift-and-shift migrations to AWS. AWS encourages customers who are currently using AWS Elastic Disaster Recovery to switch to AWS MGN for future migrations. AWS MGN enables organizations to move applications to AWS without having to make any changes to the applications, their architecture, or the migrated servers.

It minimizes time-intensive, error-prone manual processes by automatically converting your source servers from physical, virtual machines, and cloud infrastructure to run natively on AWS.

The service simplifies your migration by enabling you to use the same automated process for a wide range of applications. By launching non-disruptive tests before migrating, you can be confident that your most critical applications such as SAP, Oracle, and SQL Server, will work seamlessly on AWS.

#### AWS Replication Agent

Implementation begins by installing the AWS Replication Agent on your source servers. When you launch Test or Cutover instances, AWS Application Migration Service automatically converts your source servers to boot and runs natively on AWS.
