# Instance States (Lifecycle)

- [Instance States Doc](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_InstanceState.html)
- [Instance State Billing](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html#instance-billing-by-state)

| **State** | **Description** | **Compute billed** |
|---|---|---|
| **pending** | Instance is launching; resources are being provisioned. | ❌ No |
| **running** | Instance is active and fully operational. | ✅ Yes |
| **stopping** | Stop request issued; Instance is being stopped. | ❌ No |
| **stopping (hibernate)** | Hibernate request issued; instance is saving RAM state before getting stopped. | ✅ Yes |
| **stopped** | Instance is stopped; EBS volumes persist, no CPU usage. | ❌ No |
| **shutting-down** | Terminate request issued; Instance is in the process of being terminated. | ❌ No |
| **terminated** | Instance is permanently destroyed/deleted; cannot be restarted. | ❌ No |

### From running, what states can be triggered?

| **Action** | **State transition** | **Notes** |
| --- | --- | --- |
| **Stop** the instance | `stopping` → `stopped` | — |
| **Reboot** the instance | `running` → `running` | OS restart; same host |
| **Terminate** the instance | `shutting-down` → `terminated` | Instance is permanently deleted |
| **Hibernate** the instance | `stopping` → `stopped` | RAM state is saved to the EBS root volume |

<img width="1098" height="764" alt="image" src="https://github.com/user-attachments/assets/5a14683d-5c5f-4475-8bde-d1d48af88212" />

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
- **Hibernate only possible when stopping an instance. When terminatining an instance, no Hibernate really possible**
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
