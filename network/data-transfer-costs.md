# Data Transfer Costs

Data transferred between the following is free
- Amazon EC2
- Amazon RDS
- Amazon Redshift
- Amazon ElastiCache instances
- Elastic Network Interfaces

| **Scope** | **Cost** | **Notes** |
|---|---:|---|
| **Same AZ** | ✅ **FREE** | Almost always free |
| **Same Region, Different AZ** | 💰 **~$0.01/GB each way** | Applies in both directions |
| **Different Region** | 💰💰 **Higher cost** | Varies by region pair |
| **Out to Internet (Egress)** | 💰💰💰 **Most expensive** | Charged per GB out |
