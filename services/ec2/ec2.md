- EC2 are VMs
- EC2 Hosts - physical servers where EC2 run
  - EC2 Host AZ resilent
  - EC2 instance is NOT AZ resilient
- EC2 Storage
  - Instance (local) store (ephemeral)
    - **Block** storage devices
    - **NOT all EC2 support it**
    - Storage physically **attached to the host** where your EC2 instance runs
    - Data is lost when:
      - instance **stops or terminates**
        - Stopping instnce frees space on host, so the next time we run istance it has to be run on another host
      - host hardware fails
  - (Remote) storage
    - [EBS](https://github.com/vikchupak/AWS/blob/main/services/ebs/ebs.md)
      - mounted
    - S3
      - S3 is NOT mounted like a hard drive. EC2 accesses S3 via API calls (HTTP/HTTPS).
    - EFS
      - mounted
  - Data network
    - This is not storage. It is the network for EC2 data transfer
      - Instance → EBS traffic
      - Instance → S3 traffic
      - Instance → Instance traffic
- **Remote Storage are AZ resilent and `non-cross-AZ shareable`**

# Amazon Machine Images (AMI)

**An AMI defines**
- **Operating System**
- Preinstalled software
- Configuration
- Root volume snapshot

**AMI List**
- Amazon Linux
- macOS
- Ubuntu Server
- Red Hat Linux
- SUSE Linux Server
- Microsoft Windows Server
  - **Not Windows 10 / Windows 11**
- Debian

# Instance Status Checks

<img width="1241" height="627" alt="image" src="https://github.com/user-attachments/assets/c7a5ec34-6401-4b36-a62d-376d65737442" />

- System status
- Instance status

# Instance metadata

The following accessible from inside any instance and provides all the instance metadata

```bash
http://169.254.169.254/latest/meta-data
```

# Instance Roles vs Instance Profile

- An Instance Profile is a container for an IAM Role that can be attached to an EC2 instance
- One EC2 instance → One profile → One role

# Enhanced EC2 networking

- Single Root I/O Virtualization (**SR-IOV**) enables **Enhanced Networking** on EC2 instances
- SR-IOV is a hardware virtualization technology that allows a single physical network interface card (NIC) to present itself as multiple virtual network interfaces directly to virtual machines
- Amazon EC2 provides enhanced networking capabilities through the **Elastic Network Adapter (ENA)**
- An **Elastic Fabric Adapter (EFA)** is simply an Elastic Network Adapter (ENA) with added capabilities. It provides all of the functionality of an ENA, with additional OS-bypass functionality. OS-bypass is an access model that allows HPC and machine learning applications to communicate directly with the network interface hardware to provide low-latency, reliable transport functionality.
  - The OS-bypass capabilities of EFAs are not supported on Windows instances. If you attach an EFA to a Windows instance, the instance functions as an Elastic Network Adapter without the added EFA capabilities.
- Enabled by default in most instance types
- No additional charge for using enhanced networking

Instead of routing traffic through the hypervisor’s virtual network stack, SR-IOV allows the instance to:

* Access the NIC more directly
* Achieve **lower latency**
* Get **higher packets per second**
* Improve **throughput and consistency**

<img width="514" height="278" alt="image" src="https://github.com/user-attachments/assets/14312250-8ee6-4344-9158-d55986e8182a" />

# EBS-Optimized EC2

- **EBS-optimized** means your EC2 instance has **dedicated network bandwidth for Amazon EBS traffic**, separate from normal internet/VPC traffic.
- Enabled by default in most instance types

This prevents disk I/O from competing with your app’s network traffic → resulting in:

* ✅ More consistent disk performance
* ✅ Higher IOPS & throughput
* ✅ Lower latency spikes
