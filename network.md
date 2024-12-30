- VPC - virtual network because no real routers and switchers are used, like EC2 virtual servers
- Private/public subnets
- Regions
- AZs
- NAT(Network Address Translation) Gateway. Is **deployed in a public subnet**, and it communicates with instances in private subnets through the public subnet's routing.
  -  You have resources in a **private subnet** that:
     - Need **only outbound** internet access (e.g., downloading software updates, accessing external APIs).
     - Should remain inaccessible from the internet.
- Internet Gateway.
  - You have resources in a **public subnet** that need direct access to and from the internet.
- Route tables
   - Main Route Table
   - Custom Route Table
   - Subnet Association
      - A route table can be associated with one or more subnets.
      - A subnet cannot be associated with multiple route tables.
    - Target vs Destination as exaple of `ip route`(Linux)/`route print`(Windows)
      - Destination (Network destination in Linux/Windows). **Actual adress we want to reach - final point**.
      - Target (Gateway in Linux/Windows). **Closest/next hop to reach the destination - intermediate point**
- NACL (Network Access Control List) is a security feature in AWS that **acts as a firewall** to control traffic (both inbound and outbound) at the subnet level.
     
- https://github.com/VIK2395/Network/blob/main/NetmaskVsSubnetMask.md
- https://github.com/VIK2395/DevOps/blob/main/Linux/Network/VPN/index.md

### **Internet Gateway (IGW) vs NAT Gateway (NGW)**

| **Feature**                | **Internet Gateway (IGW)**                                         | **NAT Gateway (NGW)**                                              |
|----------------------------|--------------------------------------------------------------------|--------------------------------------------------------------------|
| **Purpose**                | Allows **direct internet access** for resources in a **public subnet**. | Allows resources in a **private subnet** to access the internet for outbound traffic, without exposing them to inbound traffic. |
| **Inbound Traffic**         | Supports inbound traffic (e.g., public users accessing a web server in the subnet). | Does **not** support inbound traffic from the internet to private subnet resources. |
| **Outbound Traffic**        | Allows outbound traffic directly to the internet.                | Handles outbound traffic from private subnet resources, translating private IPs to public IPs. |
| **Association**             | Attached to the **VPC** directly.                               | Deployed in a **public subnet** but used by **private subnets** via routing. |
| **Use Case**                | For **public subnets** (e.g., hosting web servers, APIs, etc.).   | For **private subnets** (e.g., private EC2 instances downloading updates or accessing external APIs). |
| **Public IPs**              | Resources require a **public IP** or **Elastic IP** to use the IGW. | Resources use their **private IP**, and the NAT Gateway translates it to the NAT Gateway's **public IP**. |
| **Directionality**          | Bidirectional (inbound and outbound traffic).                   | Unidirectional (outbound traffic only).                           |
| **Security**                | Requires careful security group and NACL configuration to protect public-facing resources. | Provides a secure way to access the internet while keeping resources inaccessible from the internet. |
| **Managed by AWS?**         | Fully managed by AWS.                                           | Fully managed by AWS.                                             |
| **Redundancy**              | Highly available across the VPC.                                | Highly available within a single **Availability Zone (AZ)**. To make it fault-tolerant, deploy one NAT Gateway per AZ. |
| **Performance**             | Supports unlimited bandwidth.                                   | Scales automatically to handle traffic but has a cost per GB processed. |
| **Pricing**                 | No additional cost; you only pay for the resources using the IGW. | Charged per hour of use and per GB of data processed. |

---

### **How They Work Together in a VPC**

#### Example:
1. **Public Subnet**:
   - Contains resources like web servers.
   - Subnet is associated with a **route table** that directs `0.0.0.0/0` traffic to the **Internet Gateway**.

2. **Private Subnet**:
   - Contains backend resources like databases or internal servers.
   - Subnet is associated with a **route table** that directs `0.0.0.0/0` traffic to the **NAT Gateway**, which is deployed in a public subnet.
   - The NAT Gateway then uses the Internet Gateway for external communication.
