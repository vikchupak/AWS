- [NFW](https://github.com/vikchupak/AWS/blob/main/security/firewall.md#aws-network-firewall)

```txt
Internet
   │
   ▼
Internet Gateway  (IGW Ingress Routing → Firewall Endpoint)
   │
   ▼
┌──────────────────────────────┐
│ Firewall subnet [PRIVATE]    │
│                              │
│ Network Firewall Endpoint    │  ← Inspect FIRST
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Public subnet                │
│                              │
│ Internet-facing ALB          │  ← Then reach ALB
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Private app subnet [PRIVATE] │
│                              │
│ EC2 Auto Scaling Group       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Private DB subnet  [PRIVATE] │
│                              │
│ Aurora                       │
└──────────────────────────────┘
```

## Subnet Summary

| Subnet Type            | Route Table | Routing                                                |
| ---------------------- | ----------- | ------------------------------------------------------ |
| **Firewall subnet**    | **Private** | Inbound: forward to ALB subnet / Outbound: back to IGW |
| **Public subnet**      | Public      | `0.0.0.0/0 → IGW`                                      |
| **Private app subnet** | Private     | `0.0.0.0/0 → NAT Gateway`                              |
| **Private DB subnet**  | Private     | No outbound internet route                             |

> **Key point:** Even though the firewall subnet sits between the IGW and the public subnet, it has **no direct IGW route of its own**. Traffic is steered through it purely via the **IGW's ingress route table**, which is what makes it private.

## Route tables

### Firewall Subnet (Private)

This subnet has **specific routes** used to steer traffic through the Network Firewall. It does not need a general `0.0.0.0/0 → IGW` route in the usual application-subnet sense.

| Destination                          | Target                    | Purpose                                      |
| ------------------------------------ | ------------------------- | -------------------------------------------- |
| ALB subnet CIDR (e.g. `10.0.1.0/24`) | Network Firewall Endpoint | Forward inspected traffic to the ALB         |
| `0.0.0.0/0`                          | Internet Gateway          | Send return/outbound traffic back to the IGW |

### Public Subnet (ALB)

| Destination              | Target           | Purpose                          |
| ------------------------ | ---------------- | -------------------------------- |
| `10.0.0.0/16` (VPC CIDR) | `local`          | Internal VPC traffic             |
| `0.0.0.0/0`              | Internet Gateway | ALB responds to Internet clients |

### Private App Subnet (EC2)

| Destination              | Target      | Purpose                            |
| ------------------------ | ----------- | ---------------------------------- |
| `10.0.0.0/16` (VPC CIDR) | `local`     | Internal VPC traffic               |
| `0.0.0.0/0`              | NAT Gateway | **Outbound Internet traffic only** |

### Private DB Subnet (Aurora)

| Destination              | Target  | Purpose                          |
| ------------------------ | ------- | -------------------------------- |
| `10.0.0.0/16` (VPC CIDR) | `local` | Only talks to EC2 within the VPC |
