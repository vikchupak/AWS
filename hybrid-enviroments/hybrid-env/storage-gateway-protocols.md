## Protocols

| **Gateway Type**     | **Protocol** | **Storage Type** | **Backend**                        | **OS**      |
| -------------------- | ------------ | ---------------- | ---------------------------------- | ------------------- |
| **S3 File Gateway**  | NFS + SMB    | File             | Amazon S3                          | **Linux / Windows** |
| **FSx File Gateway** | SMB only     | File             | Amazon FSx for Windows File Server | **Windows**         |
| **Volume Gateway**   | iSCSI        | Block            | S3 (EBS snapshots)                 | **Linux / Windows** |
| **Tape Gateway**     | iSCSI (VTL)  | Virtual Tape     | S3 + Glacier                       | **Linux / Windows** |

**NFS/SMB are file-storage protocols, while iSCSI is a block-storage protocol**
