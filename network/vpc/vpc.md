# VPC Router

- Every VPC has a (virtual) **VPC Router** (invisible)
  - Not user-visible. You can’t SSH or inspect the router — only define routes.
  - It is Highly available, it runs in all VPC's AZs
  - The router has a network interface in every subnet in your VPC
  - By default it routes traffic between subnets
  - Controlled by "route tables". Each subnet has one route table
  - "Interprets" your route table
 
  ---
  
- VPC has Main route table - subnet default
  - Traffic is forwarded to its destination via target
    - destination - final point
    - target - intermediate point
      - `local` - destination inside VPC
- Internet Gateway is HA

```
Instance → Subnet → (Subnet’s Route Table) → VPC Router → Target (IGW, NAT, TGW, etc.)
```

# Reserved IPs in subnets

In **each AWS VPC subnet**, **five IP addresses** are **reserved by AWS** and **cannot be used** by you.

### 🔢 Breakdown of reserved IPs

For any subnet — whether it’s small (/28) or large (/16) — AWS automatically reserves:

| IP       | Purpose                   | Example (for subnet 10.0.0.0/24) |
| -------- | ------------------------- | -------------------------------- |
| **.0**   | Network address           | 10.0.0.0                         |
| **.1**   | VPC router                | 10.0.0.1                         |
| **.2**   | Reserved for AWS DNS      | 10.0.0.2                         |
| **.3**   | Reserved for future use   | 10.0.0.3                         |
| **.255** | Network broadcast address | 10.0.0.255                       |

> 🔸 So you can use: `10.0.0.4` → `10.0.0.254` → **251 usable IPs**

### 🧠 Notes

* The same 5 reserved IPs apply to **both public and private** subnets.
* Even if you assign a **custom DNS IP**, AWS still reserves `+2` for DNS (though unused).
* You can’t modify or reclaim these reserved IPs.

---

- The 5 reserved IP addresses in every subnet are not assigned to any network interface — they are reserved internally by AWS, so they won’t appear in the output of `aws ec2 describe-network-interfaces`.
- They simply exist conceptually within the subnet’s CIDR block but are not represented as ENIs or any AWS resource.

# VPC Flow Logs

- [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html)
  - Monitor traffic going to and from **Elastic network interfaces** in your VPC
  - VPC Flow logs can be added at a VPC, Subnet or Elastic network Interface level
    - VPC level
      - Virtual monitors are attached to all ENI in the VPC
    - Subnet level
      - Virtual monitors are attached to all ENI in the subnet
    - Elastic network Interface level
      - Virtual monitors are attached directly to specific ENIs
  - Flow Logs DON'T capture packet contents, but packet's metadata
    - To be more precise it captures Flow Log Records 
  - Flow Logs can be stored on S3, CloudWatch Logs, or Amazon Data Firehose
  - Flow Logs is NOT realtime
