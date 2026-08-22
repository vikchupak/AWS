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
    - S3
    - EFS
  - Data network
    - This is not storage. It is the network for EC2 data transfer
      - Instance → EBS traffic
      - Instance → S3 traffic
      - Instance → Instance traffic
- **Remote Storage are AZ resilent and `non-cross-AZ shareable`**

# Instance types

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

<img width="976" height="834" alt="image" src="https://github.com/user-attachments/assets/fd3f6cc9-615b-45b4-888b-d37f16610b93" />

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

# Instance States (Lifecycle)

- [Instance States Doc](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_InstanceState.html)
- [Instance State Billing](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html#instance-billing-by-state)

| State             | Description                                             | Compute billed |
| ----------------- | ------------------------------------------------------- | -------------- |
| **pending**       | Instance is launching; resources are being provisioned. | ❌ No          |
| **running**       | Instance is fully launched and ready to accept traffic. | ✅ Yes         |
| **stopping**      | Stop request issued; instance is shutting down.         | ❌ No          |
| **stopped**       | Instance is stopped; EBS volumes persist, no CPU usage. | ❌ No          |
| **shutting-down** | Terminate request issued; instance is being deleted.    | ❌ No          |
| **terminated**    | Instance is permanently deleted; cannot be restarted.   | ❌ No          |

### Hibernate instances

- **Purpose**
  - Hibernate lets you "stop(pause)" the instance, **save its in-memory state (RAM) to EBS**, and later restart it exactly where it left off
  - When instance hibernates → **RAM is saved to EBS**. **EBS root (OS)** + Additional EBS volumes **are not affected**. Instance (local) store volume data is always lost
  - Useful for stateful applications, long-running processes, or dev/test environments where you want to save state without paying for compute while stopped
- **Hibernate prerequisites**
  - Instance must use an EBS root volume (instance-store cannot hibernate)
  - Hibernate requires encryption on the root EBS volume
  - Supported instance types. Most modern instance types support Hibernate
  - Max RAM hibernation supported is ~150 GB
  - OS support. Must be supported Amazon Linux, Ubuntu, Windows, etc.
  - **You cannot enable Hibernate after the instance is running—it must be selected at launch**
- **Enable Hibernate**
  - EC2 → Launch Instance
  - Configure Instance Details -> Advanced Details → Instance Interruption Behavior
  - Choose Hibernate
- **Billing**
  - Pay only for EBS storage, not compute while stopped/hibernated
- **Hibernate only possible when stopping an instance. When terminatin an instance, no Hibernate really possible**
- Stopping an instance means
  - The virtual machine (VM) is shut down on the host
  - RAM and Instance (local) store volumes are lost
  - Instance metadata (instance ID, private IP in VPC, tags, etc.) is preserved
  - **The root EBS volume (OS) and additional EBS volumes remain intact**
    - The root EBS volume (OS) remain, so it will be reatached to new instance and OS will boot from it. So your system comes back with:
      - same files
      - same installed software
      - same configuration
  - Instance can be restarted later
- Terminating an instance means
  - Delete/destroy everything exept additional EBS volumes

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
