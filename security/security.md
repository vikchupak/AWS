
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
- Get a **dedicated** hardware inside your VPC. AWS provides the hardware, but they have zero access to your keys
  - Unlike in KMS where HSMs are shared between different clients (the same HSM can store materials keys of different customers)
- Cost. High (~$1.45+/hr per HSM)
- Scaling. Manual (Add/remove HSMs to cluster)
- Special configuration and software needed to interact with your HSM
