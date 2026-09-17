# AWS Security Hub

**AWS Security Hub** is a cloud security posture management (CSPM) and threat detection aggregator service that gives you a **centralized view of your security alerts and compliance status across multiple AWS accounts and regions**.

Instead of checking individual security services separately, Security Hub automatically ingests, normalizes, and correlates findings into a single dashboard.

---

**Key Capabilities**

* **Findings Aggregation & Normalization:** Ingests alerts from native AWS services (GuardDuty, Inspector, Macie, IAM Access Analyzer, Firewall Manager) and third-party partner tools. It converts all alerts into the standard **AWS Security Finding Format (ASFF)** or **OCSF**, making findings easy to query and process uniformly.
* **Automated Security & Compliance Checks:** Continuously evaluates your AWS resource configurations against security standards and industry frameworks (such as *AWS Foundational Security Best Practices*, *CIS AWS Foundations Benchmark*, and *PCI DSS*).
* **Cross-Account & Cross-Region Centralization:** Integrates with **AWS Organizations** to aggregate security findings across hundreds of accounts and multiple regions into a single primary administration account.
* **Automated Response & Remediation:** Uses **Amazon EventBridge** to trigger automated workflows. For example, a high-severity finding can trigger an AWS Lambda function to isolate a compromised EC2 instance, revoke dynamic IAM keys, or route an incident ticket to Jira/Slack.

---

**Core Architecture & Flow**

| Component | Role |
| --- | --- |
| **Data Sources** | AWS Security Services (GuardDuty, Macie, Inspector) + Partner Security Tools. |
| **Evaluation Engine** | Evaluates resource states using **AWS Config** rules to flag drift or posture violations. |
| **Insights** | Groupings of related findings (e.g., "S3 buckets with public read access" or "EC2 instances with critical vulnerabilities"). |
| **Custom Actions** | Manual or automated triggers that emit findings to EventBridge for remediation pipelines. |

> **Prerequisite Note:** AWS Security Hub relies heavily on **AWS Config** to analyze resource configurations and run automated security controls. AWS Config must be enabled in the account and region where Security Hub operates.
