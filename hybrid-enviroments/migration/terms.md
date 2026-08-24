# Migration strategies

- Lift-and-shift (Rehost)
  - Move workloads to AWS with NO changes
  - Example: migrate an existing VM to EC2 using AWS MGN
- Lift-and-reshape (Replatform)
  - Make a few optimizations without changing the core architecture
  - Example: move a database from self-managed MySQL to Amazon RDS
- Drop-and-shop (Repurchase)
  - Replace existing app with a cloud-native SaaS product
  - Example: On-premises CRM → Salesforce
- Rebuild-for-cloud (Refactor / Re-architect)
  - Redesign and rewrite the application to be fully cloud-native
  - Example: Monolithic app → Microservices + Lambda, Oracle DB → Amazon DynamoDB or Aurora, On-premises app → Containers on ECS/EKS
