
# AWS Secrets Manager vs AWS Systems Manager (SSM) Parameter Store

- [SSM Parameter Store](https://github.com/vikchupak/AWS/blob/main/services/ssm/ssmParameterStore.md)

### Main differences
- Systems Manager Parameter Store
  - Hierarchical storage
  - No secrets Auto-Rotation
  - Free
  - One Region/Account
- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
  - Non hierarchical storage
  - Secrets Auto-Rotation
  - Paid
  - Cross Region/Account

# AWS Shield

Protects against DDoS attacks

- [AWS Shield](https://aws.amazon.com/shield/)
- 2 plans
  - Standard
    - Free
    - Automatic/enabled by default
    - Against common Network (L3) or Transport (L4) attacks
    - Protects
      - Route 53
      - CloudFront
      - Global Accelerator
  - Advanced
    - Paid
      - $3000 per month
    - Protects
      - Route 53
      - CloudFront
      - Global Accelerator
      - EIPs
      - ELBs
    - Must to be enabled/configured
    - Supports integration with WAF to protect L7
    - Provides real time visibility of DDoS events/attacks
    - Health-based detection (uses Route 53 health checks)

# AWS CloudHSM

- [AWS CloudHSM](https://aws.amazon.com/cloudhsm/)
- Get a **dedicated** HSM hardware inside your VPC. AWS provides the hardware, but they have zero access to your keys
  - Unlike in KMS where HSMs are shared between different clients (the same HSM can store materials keys of different customers)
- Cost. High (~$1.45+/hr per HSM)
- Scaling. Manual (Add/remove HSMs to cluster)
- Special configuration and software needed to interact with your HSMs

# AWS Config

- [AWS Config](https://aws.amazon.com/config/)
- Record resource configuration changes (history) over time to S3
- Detects and reports non-compliant changes against resorce **Config Rules** using Lambda
  - But it does NOT block non-compliant changes

# Amazon Macie

- [Amazon Macie](https://aws.amazon.com/macie/)
- Discovers, classifies, and protects sensitive data stored in **Amazon S3**
  - Identify sensitive data (like PII, financial data, credentials) in S3 buckets and alert you if it’s exposed or improperly secured
- **Data Identifiers** as "rules" to analyze data
  - 2 types
    - Managed Data Identifiers
      - Built-in
      - Mantained by AWS
      - Uses ML/patterns
    - Custom Data Identifiers
      - Proprietary
      - Regex based
- **Findings** are found issues
  - 2 types
    - **Policy** Findings
    - **Sensitive data** findings
