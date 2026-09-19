# AWS Trusted Advisor

- AWS Trusted Advisor is an AWS service that analyzes your AWS environment and recommends improvements
- Think of it as an AWS best-practices advisor that looks at your account
- AWS Trusted Advisor is available/enabled by default for AWS accounts
  - The number of checks and features available depends on your AWS Support plan:
      - Basic / Developer: limited set of core checks
      - Business / Enterprise: full set of Trusted Advisor checks and additional features
- Trusted Advisor **periodically** checks your AWS environment and provides recommendations for cost optimization, performance, security, fault tolerance, service limits, and operational excellence.
  - So you generally don't need to manually start a scan every time
  - You can also manually refresh the checks to get updated results
  - AWS Trusted Advisor provides a real-time recommendations. Real-time recommendations = recommendations based on your current AWS environment, rather than old/static information. Don't interpret "real-time" as second-by-second monitoring.
- It scans your env/account and can use ClaudWatch metrics
- **AWS Trusted Advisor is mainly a **rules/checks-based** recommendation service, not an AI service**

| Category                 | What it looks for                                    |
| ------------------------ | ---------------------------------------------------- |
| 💰 **Cost Optimization** | Unused/underutilized resources and potential savings |
| 🔒 **Security**          | Identify security settings that may make your AWS solution less secure   |
| ⚡ **Performance**        | Recommendations that can help to improve the speed and responsiveness of your applications             |
| 🛡️ **Fault Tolerance**  | Improving the resiliency of your AWS system by highlighting redundancy gaps, current service limits, and over-utilized resources      |
| 📏 **Service Limits**    | Resources approaching AWS service quotas (typically at 80% of the limit) |

**IMPORTANT**: AWS Trusted Advisor's **cost optimization** checks for **underutilized** resources doesn’t provide recommendations for resources that are overutilized. Use Trusted Advisor's PERFORMANCE category to identify overutilized resources instead.
