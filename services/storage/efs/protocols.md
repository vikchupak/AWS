# Protocols

| AWS service                     | Main protocol | Typical use                                                               |
| ------------------------------- | ------------- | ------------------------------------------------------------------------- |
| **Amazon EFS**                  | **NFS**       | Linux workloads; shared file storage                                      |
| **FSx for NetApp ONTAP**        | **NFS + SMB** | Mixed Linux/Windows; enterprise file storage                              |
| **FSx for OpenZFS**             | **NFS**       | High-performance Linux/Unix workloads; workloads needing OpenZFS features |
| **FSx for Windows File Server** | **SMB**       | Windows workloads; Active Directory integration                           |
| **FSx for Lustre**              | **Lustre**    | HPC, ML, big data, media processing; very high throughput/IOPS            |

- [Read](https://github.com/vikchupak/AWS/blob/main/services/storage/efs-vs-fsx.md)
