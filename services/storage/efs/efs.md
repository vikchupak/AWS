# Amazon Elastic File System (EFS)

- **Remote (backend)** File System
  - For Linux
  - Has a dns name & IP
  - EC2 mounts(connects) to it using the dns name
  - Needs installing additional packages/utils on EC2 to connect to EFS
  - Uses Network File System (NFS) - a network protocol (how computers share files over the network)
    - Do not confuse with NTFS / ext4 / exFAT → file systems (how data is stored on a disk like SSD)
- Independent from EC2 instance lifecycle

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

## Modes

### Performance modes

- General Purpose mode
- Max I/O mode

You choose a file system’s performance mode when you create it, and it cannot be changed. The two performance modes have no additional costs, so your Amazon EFS file system is billed and metered the same, regardless of your performance mode.

### Throughput modes

- Bursting Throughput
- Provisioned Throughput

With Bursting Throughput mode, a file system’s throughput scales as the amount of data stored in the EFS Standard or One Zone storage class grows. File-based workloads are typically spiky, driving high levels of throughput for short periods of time, and low levels of throughput the rest of the time. To accommodate this, Amazon EFS is designed to burst to high throughput levels for periods of time.

Provisioned Throughput mode is available for applications with high throughput to storage (MiB/s per TiB) ratios, or with requirements greater than those allowed by the Bursting Throughput mode. For example, say you’re using Amazon EFS for development tools, web serving, or content management applications where the amount of data in your file system is low relative to throughput demands. Your file system can now get the high levels of throughput your applications require without having to pad your file system.
