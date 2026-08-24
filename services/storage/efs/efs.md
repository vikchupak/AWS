# Amazon Elastic File System (EFS)

- **Remote (backend)** File System
  - For Linux
  - Has a dns name & IP
  - EC2 mounts(connects) to it using the dns name
  - Needs installing additional packages/utils on EC2 to connect to EFS
  - Uses Network File System (NFS) - a network protocol (how computers share files over the network)
    - Do not confuse with NTFS / ext4 / exFAT → file systems (how data is stored on a disk like SSD)
- Independent from EC2 instance lifecycle

---

- You launch an encrypted Amazon EFS **volume**
- Serverless
  - There are severs, but they are hidden and you do not have to manage them.
- Set-and-forget
- Massive parallel shared access to thousands of Amazon EC2 instances
- Capacity autoscales

# EFS mount target

An EFS mount target is essentially an Elastic Network Interface (ENI) that Amazon creates in each subnet you enable for EFS

Each mount target:
- Lives in your VPC
- Belongs to one subnet
- Gets one private IP address (automatically assigned unless you specify)
- Acts as the entry point to EFS in that Availability Zone
- Is managed fully by AWS (you cannot SSH into it, stop it, modify OS, etc.)
- **Shared between many EC2s**

## How EC2 connects to EFS

When you mount:
```bash
sudo mount -t nfs4 fs-12345678.efs.eu-central-1.amazonaws.com:/ /mnt/efs
```

DNS resolves to the mount target IP in your AZ.

So EC2 talking to EFS looks like:
```bash
EC2 instance → mount target ENI → EFS backend
```

<img width="1196" height="573" alt="image" src="https://github.com/user-attachments/assets/4c1a3770-c65a-4cf4-bc53-01544cc2b81b" />

## EFS + AWS Transfer Family

- [Transfer Family](https://github.com/vikchupak/AWS/blob/main/hybrid-enviroments/hybrid-env/transfer-family.md)
* **AWS EFS + AWS Transfer Family** provides a **serverless file transfer solution**.
* Supports **high performance and scalability** without managing traditional file-transfer servers.
* Provides **secure file storage and transfer**:
  * **Encryption at rest** and **in transit**
  * **Network access controls**
  * **IAM-based user permissions**
* Transfer Family provides **managed SFTP/FTP access** to files stored in EFS.
* User access can be controlled through **IAM roles, home directories, and scope-down policies**.
* **No server management** is required.
