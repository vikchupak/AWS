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

# Purchase options

[prices doc](https://aws.amazon.com/ec2/pricing/)

---

- On-demand instances
- Spot instances
- Reserved instances
  - Pay for a specific instance type and quantity
  - Commit on 1 or 3 years
  - 3 payment ways
    - No upfront. Pay reduces per/s fee (the most expensive of 3)
    - All upfront. No per/s fee- (cheapest of 3)
    - Partial upfront. Mix of No upfront & All upfront (middle of 3)
- Dedicated Hosts
  - Pay for hosts
- Dedicated Instances
  - Pay additional/extra fee for no other customers instances to use the same host as you. Pay for instances.

---

- Scheduled **reserved** Instances
- **Reserved** compute capacity
  - EC2 capacity is finite in each AZ
    - Each Availability Zone has a limited number of physical servers for each instance type
    - If an AZ is busy (e.g., high On-Demand usage), you may get: `InsufficientCapacityError`
  - Reserve hardware capacity for your instances
  - No 1 or 3 years commitment

---

- Compute Savings Plans
- EC2 Instance Savings Plans

# Instance Status Checks

<img width="1241" height="627" alt="image" src="https://github.com/user-attachments/assets/c7a5ec34-6401-4b36-a62d-376d65737442" />

- System status
- Instance status
