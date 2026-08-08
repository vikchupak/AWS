# Rules evaluating

- NACL supports both ALLOW and DENY rules
  - So behavior is “Evaluate rules top-down, first match wins (allow or deny)”
- Security groups support only ALLOW rules
  - So behavior is “Allow what I specify, block everything else automatically”

<img width="1880" height="642" alt="image" src="https://github.com/user-attachments/assets/dc079152-d37a-40bc-924c-dc77586415fc" />

When evaluating the incoming request from the IP 110.238.109.37 to an EC2 instance in the private subnet, the Network ACL (NACL) processes rules sequentially, starting from the lowest rule number. NACLs are stateless, meaning they apply each rule independently and in the order defined, unlike stateful security groups that track connection states. In this case, Rule #100, which allows all traffic, is evaluated before Rule #101, which denies TCP port 4000 traffic from 110.238.109.37. Since the request matches Rule #100, it will be allowed immediately, and Rule #101 will not be evaluated.

The default deny-all rule (*) does not come into play here because the request was already processed by an earlier rule. This behavior aligns with AWS’s NACL best practices, where explicit allow rules should be placed after any specific deny rules to ensure proper traffic management. The allow-all rule in Rule #100 takes precedence as it is evaluated first.

In summary, **NACLs enforce a strict first-match policy**, meaning the request from 110.238.109.37 is allowed due to Rule #100, which demonstrates how explicit allow rules can override more restrictive ones when placed earlier in the rule set. This ensures predictable traffic control, which is critical for securing private subnets within a VPC.

# NACL

- Your VPC automatically comes with a modifiable default network ACL. By default, it allows all inbound and outbound IPv4 traffic and, if applicable, IPv6 traffic.
- You can create a **custom network ACL** and associate it with a subnet. By default, each custom network ACL denies all inbound and outbound traffic until you add rules.
- Each subnet in your VPC must be associated with a network ACL. If you don’t explicitly associate a subnet with a network ACL, the subnet is automatically associated with the default network ACL.
- You can associate a network ACL with multiple subnets; however, a subnet can be associated with only one network ACL at a time. When you associate a network ACL with a subnet, the previous association is removed.
- A network ACL contains a numbered list of rules that we evaluate in order, starting with the lowest numbered rule, to determine whether traffic is allowed in or out of any subnet associated with the network ACL. The highest number that you can use for a rule is 32766. We recommend that you start by creating rules in increments (for example, increments of 10 or 100) so that you can insert new rules where you need to later on.
- A network ACL has separate inbound and outbound rules, and each rule can either allow or deny traffic.
- Network ACLs are stateless; responses to allowed inbound traffic are subject to the rules for outbound traffic (and vice versa).
