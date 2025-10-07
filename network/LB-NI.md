## LB gets Network interface/public IP in each public subnet?

List all public IPs and what uses them
```bash
aws ec2 describe-network-interfaces \
--query "NetworkInterfaces[?Association.PublicIp!=null].[NetworkInterfaceId,Association.PublicIp,Attachment.InstanceId,Description]" \
--output table
```

✅ Exactly!

Let’s go step by step so you see *precisely* how AWS Load Balancers (like your **Application Load Balancer**) handle **ENIs** and **IPs** in **public subnets**:

## ⚙️ 1. ALB architecture in short

When you create an **Application Load Balancer (ALB)**, you must specify **at least two subnets** in **different Availability Zones (AZs)**.
Each subnet you pick must be:

* **public** (has route to Internet Gateway), and
* **in a different AZ** for redundancy.

## 🧩 2. What AWS creates behind the scenes

For each of those subnets, AWS automatically creates:

* **1 Elastic Network Interface (ENI)**
* **1 Public IPv4 address** (allocated from AWS pool — not from your Elastic IPs unless you attach manually)

So if you have your ALB spanning **3 subnets**, you will have **3 ENIs and 3 public IPs** associated with that ALB.

---

## 💡 3. Why multiple IPs?

Because:

* Each AZ gets its own **Load Balancer node** for **high availability**.
* DNS (e.g. `production-raise-your-iq-1777637495.us-east-1.elb.amazonaws.com`) resolves to **all of those IPs**.
* If one AZ fails, Route 53 / AWS ELB automatically stops routing to that IP.

---

## 🧭 4. Summary

| Concept          | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| **ENIs per ALB** | One per subnet (and AZ)                                         |
| **IP type**      | Public IPv4 (auto-assigned, unless you use Elastic IPs via NLB) |
| **Why multiple** | Redundancy and load balancing across AZs                        |
| **Location**     | Always in the subnets you attach when creating ALB              |
