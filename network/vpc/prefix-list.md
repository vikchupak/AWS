# Prefix list

There are two types of prefix lists:
- Customer-managed prefix lists
  - Sets of IP address ranges that you define and manage. You can share your prefix list with other AWS accounts, enabling those accounts to reference the prefix list in their own resources.
- AWS-managed prefix lists
  - Sets of IP address ranges for AWS services. You cannot create, modify, share, or delete an AWS-managed prefix list.

A prefix list is a set of one or more CIDR blocks. You can use prefix lists to make it easier to configure and maintain your security groups and route tables. You can create a prefix list from the IP addresses that you frequently use, and reference them as a set in security group rules and routes instead of referencing them individually. You can also use managed prefix lists with other AWS accounts using Resource Access Manager (RAM).
