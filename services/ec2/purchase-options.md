# Purchase options

[prices doc](https://aws.amazon.com/ec2/pricing/)

---

Instance compute capacity
- CPU
- RAM
- Storage
- Network speed

---

- On-demand instances
  - Pay a fixed price by hour(seconds precision) for an instance running
- Spot instances
  - Pay the same as On-demand instances, but hourly price is significantly less than On-demand
- Reserved instances
  - Pay for a specific instance type and quantity
  - Commit on 1 or 3 years
  - Your instances still run on shared AWS hosts
  - Pay regardless of you use instances
  - 3 payment ways
    - No upfront
      - You pay nothing at the start
      - You pay a discounted hourly rate over time
      - Most expensive overall option
    - All upfront
      - You pay the entire 1- or 3-year cost upfront
      - Then no hourly charge (or very minimal)
      - Cheapest overall option
    - Partial upfront
      - You pay some money upfront
      - Then pay a reduced hourly rate
      - Middle cost option
- Dedicated Hosts
  - Pay for hosts, not instances
  - On-demand or reserved
  - You have full access/control over host
- Dedicated Instances
  - Pay additional/extra fee for no other customers instances to use the same host as you. Pay for instances.
  - On-demand or reserved
  - You have no access/control over host

---

- Scheduled **reserved** Instances (Legacy)
- On-demand (EC2) capacity **reservation**
  - EC2 capacity is finite in each AZ
    - Each Availability Zone has a limited number of physical servers for each instance type
    - If an AZ is busy (e.g., high On-Demand usage), you may get: `InsufficientCapacityError`
  - Guarantees EC2 capacity in a specific instance type + AZ
  - No 1 or 3 years commitment
  - Pay for reservation as if you run on-demand instances
    - Price the same as on-demand instances
    - Reserved capacity is billed at the On-Demand rate, **whether used or not**
    - When an instance runs in reserved capacity, you pay exactly as if it were a normal On-Demand instance. (Summary bill is not doubled)

---

- (EC2 Instance) Savings Plans
