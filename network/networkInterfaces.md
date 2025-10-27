# ENI - Elastic Network Interface

*`The following subnets contain one or more network interfaces, and cannot be deleted until those network interfaces have been deleted.`*

---

# 📡 What is a **Network Interface** in AWS?

**In AWS**, a **Network Interface** = **Elastic Network Interface (ENI)**.

It's basically a **virtual network card** (like a NIC (Network Interface Card) on a physical machine).

✅ Every **EC2 instance**, **Load Balancer**, **NAT Gateway**, **ECS service**, etc. — when connected to a VPC — gets **at least one** network interface.

---

# 🔥 Key facts about Network Interfaces (ENIs)

- It has a **private IP address** from the **Subnet** it's attached to.
- Optionally, it can have a **public IP address**.
- It connects resources (like EC2) to your VPC network.
- **One subnet = many ENIs can exist**.
- You can manually create **independent ENIs** too (not attached to any EC2).

---

# 🚧 Why you can't delete the Subnet

If a **subnet still has active ENIs**, AWS **protects** you:
- Because otherwise, those network interfaces would be "hanging in the air" — no subnet, no IP routing.

**Error you are seeing:**
> The following subnets contain one or more network interfaces, and cannot be deleted until those network interfaces have been deleted.

Means:
- There are ENIs **still alive** in the subnet.
- Usually attached to:
  - EC2 instances
  - Load balancers
  - NAT Gateways
  - ECS services
  - EFS mount targets
  - VPC endpoints

---

# 🛠 How to fix this

✅ **Find and delete** the resources that own those ENIs first.

Steps:

1. Go to **EC2 Dashboard → Network Interfaces**  
2. Filter by the **Subnet ID**.
3. See **who owns** each ENI (column: *Attachment* or *Description*).
4. **Delete** or **terminate** the resources using the subnet (EC2 instance, Load Balancer, etc).
5. After no ENIs remain → **delete the subnet**.

---

# 🧠 Bonus: Real examples of things that create ENIs

| Service | ENI Created? | Notes |
|:--------|:------------:|:------|
| EC2 | ✅ | 1 or more per instance |
| Load Balancer (ALB/NLB) | ✅ | ENIs in each subnet where ALB/NLB lives |
| NAT Gateway | ✅ | Creates its own ENI |
| RDS/Aurora | ✅ | Database instances |
| VPC Endpoint | ✅ | Interface endpoint = ENI |
| EFS Mount Target | ✅ | One per AZ |

---
  
# 🎯 Super quick visual

```
[ Subnet ] 
    └── ENI 1 --> EC2 Instance
    └── ENI 2 --> Load Balancer
    └── ENI 3 --> NAT Gateway
```

---

# ⚡ TL;DR

- ENI = virtual network card inside subnet.
- Subnets can't be deleted if ENIs exist.
- Find + remove attached resources first → then delete subnet.
 
