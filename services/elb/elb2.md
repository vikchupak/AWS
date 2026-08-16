# ALB IPs changes (but dns name remains)

### 1. What Causes ALB IP Addresses to Change?

* **Auto Scaling:** As HTTP/HTTPS traffic spikes, AWS automatically provisions additional load balancer nodes in the background—assigning new public IP addresses to the ALB. When traffic drops, nodes (and their IPs) are removed.
* **Node Maintenance & Healing:** If an underlying AWS instance running a load balancer node fails or requires routine maintenance, AWS replaces the Elastic Network Interface (ENI), assigning a brand-new IP address.
* **Zone Adjustments:** Adding or removing Availability Zones (AZs) dynamically adds or removes associated public IPs.

### 2. Why DNS Handles This (and Why Firewalls Struggle)

By default, AWS expects you to route traffic to an ALB via its **DNS name** (e.g., `my-alb-1234.elb.amazonaws.com`), *never* by raw IP.

* AWS sets a very short **60-second TTL (Time-To-Live)** on the ALB’s DNS record.
* When an IP changes, AWS updates the DNS record immediately so normal web clients pick up the new IPs within a minute.

# NLB IPs do not change

### NLB Scaling (Hyperplane-Based)

When you create an NLB in an Availability Zone, AWS creates **one static Elastic Network Interface (ENI)** attached to your VPC. That single ENI holds the permanent static IP address (or Elastic IP).

Instead of launching *new* load balancer nodes with new IPs when traffic spikes, AWS routes the incoming traffic through **Hyperplane**—a massive, multi-tenant network fabric built on AWS's internal routers and hardware.

```text
CLIENT TRAFFIC
      |
      v  (Attacks 1 Static IP per AZ)
+-------------------------------------------------------------+
|               AWS Hyperplane Network Fabric                 |
|  • Shared cluster of ultra-fast packet handlers             |
|  • Scales capacity transparently WITHOUT adding new IPs     |
+-------------------------------------------------------------+
      |
      v  (Routes directly to your backend)
[ EC2 / ECS Tasks / Target Groups ]
```

## Why the NLB IP Never Changes

1. **Decoupled Scaling:** The scaling happens at the **network engine layer (Hyperplane)**, far below the IP address layer. Hyperplane scales its capacity across thousands of background workers internally without ever changing the entry-point IP address.
2. **True Anycast/VIP Design:** The IP address assigned to an NLB acts as a virtual IP (VIP). AWS's internal network routers simply direct packets arriving at that IP to whatever Hyperplane capacity is needed to process the throughput.
3. **Elastic IP Binding:** Because the frontend endpoint is just an ENI, AWS allows you to attach a standard **Elastic IP (EIP)**. Since an Elastic IP belongs to your AWS account until you delete it, the IP remains static for the entire lifespan of the NLB.

**Summary**: An NLB can scale from 0 to **millions of requests per second instantly**—all behind the exact same static IP address per Availability Zone.
