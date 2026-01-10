# AWS Systems Manager (SSM) Parameter Store

- In Console UI: Systems Manager > Application tools > Parameter Store

---

AWS Systems Manager (SSM) **Parameter Store** is a secure, hierarchical storage service for configuration data and secrets management. It’s essentially a centralized "source of truth" for your application's environment variables, license keys, and database strings.

## Core Features

* **Hierarchical Storage:** You can organize parameters using paths, such as `/prod/database/password` or `/dev/api/endpoint`. This allows for easy access control and mass fetching.
* **Encryption:** It integrates with **AWS KMS** (Key Management Service) to automatically encrypt sensitive data (SecureString).
* **Version Control:** Every time you update a parameter, it saves the previous value. You can view history or roll back if a deployment goes wrong.
* **Free Tier (Standard):** Unlike many AWS services, the "Standard" parameters are free to store, making it a go-to for configuration management.

## Parameter Types

There are three main types of data you can store:

1. **String:** Plain text (e.g., an AMI ID or a setting like `max_connections: 100`).
2. **StringList:** A comma-separated list of values (e.g., `us-east-1, us-west-2`).
3. **SecureString:** Encrypted text. Use this for passwords, API keys, or certificates.

## Parameter Store vs Secrets Manager

| Feature | SSM Parameter Store | Secrets Manager |
| --- | --- | --- |
| **Best For** | App config, environment variables, feature flags & secrets | Highly sensitive secrets: database credentials, API keys, OAuth tokens. |
| **Cost** | **Free** (Standard parameters). | **$0.40** per secret per month. |
| **Auto-Rotation** | No (requires custom Lambda/code). | **Yes** (Native for RDS, Redshift, etc.). |
| **Max Size** | 4KB (Standard) or 8KB (Advanced). | **64KB**. |
| **Cross-Account** | Difficult (requires IAM complexity). | **Native support** via resource policies. |
| **Replication** | Single Region only. | **Multi-Region replication** supported. |
| **Complexity** | Simple, easy to use | Robust, enterprise features |

Choosing between AWS Secrets Manager and Parameter Store usually comes down to two factors: **Cost** and **Rotation requirements**.

While both services can store encrypted "SecureString" data, they serve different primary roles.

---

## Best Practices

* **Use Paths:** Always use a naming convention like `/{environment}/{app_name}/{variable}`. This makes it easy to set IAM policies that give a developer access to `/dev/*` but not `/prod/*`.
* **Standard vs. Advanced:** "Standard" allows up to 10,000 parameters (4KB size). "Advanced" allows up to 100,000 parameters (8KB size) but carries a monthly cost.
* **Tagging:** Tag your parameters to track costs or ownership across different teams.
