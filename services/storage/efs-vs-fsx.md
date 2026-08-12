# EFS vs FSx

- [EFS](https://github.com/vikchupak/AWS/blob/main/services/storage/efs/efs.md)
- [FSx](https://github.com/vikchupak/AWS/blob/main/hybrid-enviroments/hybridEnviroments.md#amazon-fsx)

When choosing between **Amazon EFS** and **Amazon FSx**, the decision hinges entirely on the **operating system** and the **native protocol** your applications rely on.

While EFS is a native Linux-first file system, Amazon FSx is a family of specialized file systems designed to bring industry-standard storage engines (like Windows SMB, NetApp ONTAP, Lustre, and OpenZFS) directly into AWS.

---

### The Core Difference

* **Amazon EFS:** The go-to choice for **Linux-native workloads**. It uses the Standard NFSv4 protocol and integrates out of the box with Linux instances and AWS container services.
* **Amazon FSx:** A suite of four distinct file systems built to support workloads that require specific file system behavior, extreme performance, or Windows compatibility.

---

### The Amazon FSx Lineup

Because FSx isn't just one service, you select the specific flavor that matches your architecture:

1. **FSx for Windows File Server:** Fully managed native Windows file shares using the **SMB protocol**. It integrates natively with Microsoft Active Directory and supports Windows NTFS features (ACLs, shadow copies).
2. **FSx for NetApp ONTAP:** A fully managed version of NetApp’s popular ONTAP storage operating system. It allows you to lift-and-shift existing on-premises ONTAP environments to AWS while keeping advanced features like inline deduplication, compression, and multi-protocol access (NFS, SMB, iSCSI).
3. **FSx for Lustre:** A high-performance, parallel file system optimized for sub-millisecond latencies and massive throughput (hundreds of GB/s). It is built specifically for **High-Performance Computing (HPC)**, machine learning training, and financial modeling.
4. **FSx for OpenZFS:** Powered by the open-source OpenZFS file system, it provides high-throughput, low-latency storage designed for applications migrating from ZFS or Unix-based servers.

---

### Feature-by-Feature Comparison

| Feature | Amazon EFS | Amazon FSx (General Comparison) |
| --- | --- | --- |
| **Primary Protocol** | NFSv4 (Linux native) | SMB (Windows), NFS, iSCSI, or Lustre protocols |
| **Storage Scaling** | Fully serverless and elastic. Automatically scales capacity up and down with no provisioning. | Provisioned capacity. You define the storage size and throughput upfront (though you can scale it up later). |
| **Performance Profile** | Scales throughput dynamically based on storage volume or provisioned limits. Optimized for standard web/app workloads. | Configurable performance. **FSx for Lustre** offers massively parallel throughput far exceeding EFS capabilities for raw compute tasks. |
| **Cross-OS Support** | Strictly optimized for Linux. (Mounting on Windows is complex and generally not recommended). | **FSx for Windows** delivers native Windows compatibility; **ONTAP** allows simultaneous Windows/Linux access. |
| **Deployment Model** | Spans multiple Availability Zones (AZs) by default for high availability. | Offers both Single-AZ (cost-optimized) and Multi-AZ deployment configurations. |
