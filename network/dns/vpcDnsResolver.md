# AWS VPC DNS resolver

- the `.2` address in every AWS VPC subnet is the AmazonProvidedDNS (VPC DNS Resolver), and it is tightly integrated with Amazon Route 53.
  - It uses Route 53 Resolver service internally
  - It is a managed DNS resolver powered by Route 53
  - It resolves:
    - Public domains (google.com)
    - Private Hosted Zones associated with the VPC

## What does the VPC resolver at `.2` do?

It acts as a **recursive resolver for instances inside the VPC**, and it can resolve:

### 1️⃣ Public DNS

```
api.google.com → public IP
```

### 2️⃣ Private Hosted Zones

```
db.internal.mycompany.local → 10.0.5.23
```

### 3️⃣ AWS internal names

```
ip-10-0-1-15.ec2.internal
```

## How EC2 uses it

By default, EC2 instances get this DNS server from DHCP:

```bash
cat /etc/resolv.conf

nameserver 10.0.0.2
```

So the flow is:

```
EC2 instance
   ↓
10.0.0.2 (VPC DNS Resolver / Route53 Resolver)
   ↓
Route53 public or private hosted zone
   ↓
Answer
```

## Important behaviors

| Feature                                  | .2 VPC DNS Resolver      |
| ---------------------------------------- | ------------------------ |
| Recursive resolver                       | ✅ Yes                    |
| Authoritative for private zones          | ✅ Yes                    |
| Works with Route 53 Private Hosted Zones | ✅ Yes                    |
| Works with Public Hosted Zones           | ✅ Yes (via internet DNS) |
