# Internet-facing ALB

Internet-facing ALB require public subnets, even when target is in private subnets.

**Why?**
- ALB needs to receive traffic from the Internet → placed in public subnets
- Targets don't need to be publicly accessible → can be in private subnets
- The ALB communicates with targets using their private IP addresses

**IMPORTANT**: an internet-facing ALB **must be associated with at least two public subnets in different AZs** for high availability.

# Internal ALB

Internal ALB require private subnet.
