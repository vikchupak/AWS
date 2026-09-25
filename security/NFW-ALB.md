```txt
Internet
   │
   ▼
Internet Gateway
   │
   ▼
┌──────────────────────────────┐
│ Firewall subnet              │
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
│ Private app subnet           │
│                              │
│ EC2 Auto Scaling Group       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Private DB subnet            │
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
