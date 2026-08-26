# AWS Trusted Advisor

- AWS Trusted Advisor is an AWS service that analyzes your AWS environment and recommends improvements
- Think of it as an AWS best-practices advisor that looks at your account

| Category                 | What it looks for                                    |
| ------------------------ | ---------------------------------------------------- |
| 💰 **Cost Optimization** | Unused/underutilized resources and potential savings |
| 🔒 **Security**          | Identify security settings that may make your AWS solution less secure   |
| ⚡ **Performance**        | Recommendations that can help to improve the speed and responsiveness of your applications             |
| 🛡️ **Fault Tolerance**  | Improving the resiliency of your AWS system by highlighting redundancy gaps, current service limits, and over-utilized resources      |
| 📏 **Service Limits**    | Resources approaching AWS service quotas (typically at 80% of the limit) |

- It scans your env/account and can use ClaudWatch metrics
- Trusted Advisor automatically performs its checks periodically and updates recommendations, so you generally don't need to manually start a scan every time
    - You can also manually refresh the checks to get updated results
- **AWS Trusted Advisor is mainly a **rules/checks-based** recommendation service, not an AI service**

**IMPORTANT**: AWS Trusted Advisor's **cost optimization** checks for **underutilized** resources doesn’t provide recommendations for resources that are overutilized. Use Trusted Advisor's PERFORMANCE category — not Cost Optimization — to identify overutilized resources.
