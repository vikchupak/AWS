- VPC endpoint. **Allows DIRECT access to public AWS services from private subnets.** SECURE because it is direct. **1 VPC endpoint - 1 service.**
- NAT Gateway. **Allows access to public AWS services from private subnets via NAT Gateway.** unlimited access.
- Internet Gateway. **Allows access to public from public subnets.**
- AWS Gateway Endpoint. A private connection between your VPC and specific AWS services — without sending traffic over the public internet.
  - Currently, Gateway Endpoints support only two services:
    - Amazon S3
    - Amazon DynamoDB

Example:
- A lambda can be deployed in private subnet and need access to public resources. VPC or NAT Gateway can help.
- A lambda can be deployed in public subnet.

---

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
