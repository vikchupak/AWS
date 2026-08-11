# AWS Trusted Advisor

- AWS Trusted Advisor is an AWS service that analyzes your AWS environment and recommends improvements
- Think of it as an AWS best-practices advisor that looks at your account

| Category                 | What it looks for                                    |
| ------------------------ | ---------------------------------------------------- |
| 💰 **Cost Optimization** | Unused/underutilized resources and potential savings |
| 🔒 **Security**          | Security groups, IAM, MFA, exposed resources, etc.   |
| ⚡ **Performance**        | Configurations that may hurt performance             |
| 🛡️ **Fault Tolerance**  | Single points of failure and lack of redundancy      |
| **Service Limits**       | Resources approaching AWS service quotas             |

- It scans your env/account and can use ClaudWatch metrics
- Trusted Advisor automatically performs its checks periodically and updates recommendations, so you generally don't need to manually start a scan every time
    - You can also manually refresh the checks to get updated results
- AWS Trusted Advisor is mainly a **rules/checks-based** recommendation service, not an AI service
