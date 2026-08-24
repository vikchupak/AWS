# AWS Firewall Manager

AWS Firewall Manager is a centralized security management service that lets you configure and enforce firewall rules and security policies across multiple AWS accounts and resources in your organization — all from a single place.

```txt
Without Firewall Manager:
    Account 1 → configure WAF rules manually
    Account 2 → configure WAF rules manually
    Account 3 → configure WAF rules manually
    → Inconsistent, error-prone, time-consuming 😕

With Firewall Manager:
    Central Admin Account → define rules ONCE
    → Automatically applied to ALL accounts ✅
```

### Firewall Manager acts as the central controller for all these services:

| **Service**                        | **What It Protects**                      |
| ---------------------------------- | ----------------------------------------- |
| **AWS WAF**                        | Web application attacks (SQLi, XSS, etc.) |
| **AWS Shield Advanced**            | DDoS attack protection                    |
| **VPC Security Groups**            | Instance-level network traffic            |
| **VPC Network ACLs**               | Subnet-level network traffic              |
| **AWS Network Firewall**           | VPC-level deep packet inspection          |
| **Route 53 Resolver DNS Firewall** | DNS-level threat protection               |
| **Palo Alto Networks Cloud NGFW**  | Third-party firewall (via Marketplace)    |
| **Fortigate CNF**                  | Third-party firewall (via Marketplace)    |
