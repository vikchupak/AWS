## Amazon FSx

- [Doc](https://aws.amazon.com/fsx/)
- File System as a Service in cloud
- When you need a FS, NOT Object Storage (S3) or Block Storage (EBS)
- Mount FS to EC2, containers, on-prem via VPN or DX

---

- Use EFS for Linux
- Use FSx for Windows

<img width="844" height="459" alt="image" src="https://github.com/user-attachments/assets/3b54d028-f3c8-4080-aff4-459d744f5b38" />

### Amazon FSx for Windows File Server

- [Doc](https://aws.amazon.com/fsx/windows/)
- Fully managed shared storage built on Windows Server
- Managed **native** Windows file servers/shares (NTFS)
- Designed for integration with Windows environments
- Provide all native Windows FS features like VSS, Data de-duplication, backups, encryption at rest and forced encryption in transit
- Accessible over SMB protocol
- Integrates with AD Service or Self-Managed AD
- Single or Multi-AZ within a VPC
- On-demand and Scheduled Backups

### Amazon FSx for Lustre

**About Lustre in general**
  - Developed by Cluster File Systems, Inc. (CFS)
  - Designed for High Performance Computing (HPC)
  - ONLY for Linux
  - Supports POSIX permissions

---

**Amazon FSx for Lustre**
- [Doc](https://aws.amazon.com/fsx/lustre/)
- Fully managed shared storage built on the world’s most popular high-performance file system
- Managed **native** Lustre FS
- Accessible over VPN or DX
- Deployment types
  - Scratch
    - Highly optimized for performance
    - No Resilience, HA or Replication
    - Use for Short term usage
  - Persistent
    - Self-healing and HA (in one AZ)
    - Use for Long term usage
- Architecture
  - Uses S3 Bucket as a repository
  - Data is lazy loaded to the Luster when needed

### Amazon FSx for NetApp ONTAP

- Fully managed shared storage built on NetApp’s popular ONTAP file system

### Amazon FSx for OpenZFS

- Fully managed shared storage built on the popular OpenZFS file system
