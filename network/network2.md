- VPC endpoint. **Allows DIRECT access to public AWS services from private subnets.** SECURE because it is direct. **1 VPC endpoint - 1 service.**
- NAT Gateway. **Allows access to public AWS services from private subnets.** unlimited access.

Example:
- A lambda can be deployed in private subnet and need access to public resources. VPC or NAT Gateway can help.
- A lambda can be deployed in public subnet.

---
