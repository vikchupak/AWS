# Public-private subnet

- Source IP - network communication originator's IP
- Destination IP - Actual adress we want to reach - final point
- Target IP - Closest/next hop to reach the destination - intermediate point

## Public vs Private subnet

### **1. Public Subnet**

**Definition:**
A subnet that **can directly communicate with the internet**.

**Characteristics:**

* Has a **route to an Internet Gateway (IGW)** in its route table.
* Resources (EC2 instances, ALBs, etc.) can have **public IP addresses**.
* Typically used for:

  * Web servers
  * Load balancers
  * Bastion hosts

**Example Route Table:**

| Destination | Target                 |
| ----------- | ---------------------- |
| 0.0.0.0/0   | Internet Gateway (IGW) |
| 10.0.0.0/16 | local                  |

### **2. Private Subnet**

**Definition:**
A subnet **cannot directly communicate with the internet**.

**Characteristics:**

* No direct route to the Internet Gateway.
* Instances usually **only have private IPs**.
* Internet access (if needed) goes through a **NAT Gateway or NAT Instance** in a public subnet.
* Typically used for:

  * Databases (RDS, MongoDB, etc.)
  * Application servers
  * Backend services

**Example Route Table:**

| Destination | Target                       |
| ----------- | ---------------------------- |
| 0.0.0.0/0   | NAT Gateway in public subnet |
| 10.0.0.0/16 | local                        |

---

### **Key Difference**

| Feature         | Public Subnet    | Private Subnet        |
| --------------- | ---------------- | --------------------- |
| Internet Access | Direct via IGW   | Indirect via NAT      |
| Public IPs      | Usually yes      | Usually no            |
| Use Case        | Frontend servers | Backend services, DBs |

---

💡 **Tip:**
The **route table** (IGW vs NAT) defines whether a subnet is public or private.

## Route tables

- Each subnet must be associated with **one and only one** route table.
- One route table → can serve many subnets
- Subnets cannot have more than one route table
- You can change subnet → route table association anytime
- All subnets are assotiated to main route table by default
- Route tables are always created inside a VPC
- Each route table belongs to one and only one VPC
  - Route tables cannot span multiple VPCs. Each table exists entirely within a single VPC
- A VPC can have multiple route tables, but each subnet in that VPC must be associated with exactly one route table

## Public and private route tables

- A route table is commonly called public if it has a route to an Internet Gateway
- A route table is commonly called private if it does not have a direct route to an IGW

| Subnet             | Common description      | Default route             |
| ------------------ | ----------------------- | ------------------------- |
| Public subnet      | **Public route table**  | `0.0.0.0/0 → IGW`         |
| Private app subnet | **Private route table** | `0.0.0.0/0 → NAT Gateway` |
| Private DB subnet  | **Private route table** | No Internet route         |

## Route table inbound and outbound traffic

- Route tables have no explicit inbound/outbound sections
- Routes determine where packets go based on destination

```txt
Destination     Target
10.0.0.0/16  → local
0.0.0.0/0    → IGW
```

- 10.0.0.0/16 - VPC range

Meaning: Traffic destined for any IP inside the VPC's 10.0.0.0/16 range stays inside the VPC
