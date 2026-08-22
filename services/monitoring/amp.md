# Amazon Managed Service for Prometheus (AMP)

Amazon Managed Service for Prometheus is a **serverless**, Prometheus-compatible monitoring service for container metrics that makes it easier to securely monitor container environments at scale.

- Serverless. No servers to provision or manage
- Automatically scales up/down with your workloads
- Fully compatible with the CNCF Prometheus open-source project
- **Monitor containers on EC2, ECS, and EKS (on EC2 and Fargate)**

<img width="525" height="226" alt="image" src="https://github.com/user-attachments/assets/624b56e2-7603-45f6-ab21-ad76fed4049d" />

# AWS Managed Grafana (AMG)

- **Fully managed** — AWS handles provisioning, scaling, and maintenance of Grafana servers
- Supports querying, correlating, and visualizing metrics, logs, and traces from multiple sources
- Developed in collaboration with Grafana Labs
- Integrates with AWS IAM Identity Center for SSO

# Fully managed vs serverless

Amazon Managed Grafana (AMG) is described by AWS as a "fully managed" service, which means:

What AWS handles for you
- ✅ Provisioning and setup of Grafana servers
- ✅ Automatic scaling of compute and database infrastructure
- ✅ Automated version updates and security patching
- ✅ High availability and automatic recovery
- ✅ Encryption and security
- ✅ No hardware to build, package, or deploy

AMG is not serverless because:

| Characteristic     | Serverless                 | AMG (Fully Managed)                                          |
| ------------------ | -------------------------- | ------------------------------------------------------------ |
| **Billing model**  | Pay per invocation/request | Pay per workspace (hourly/monthly)                           |
| **Infrastructure** | No concept of a server     | Runs on managed Grafana server instances (called workspaces) |
| **Idle cost**      | Zero cost when not in use  | Workspace incurs cost even when idle                         |
| **Scaling**        | Scales to zero             | Scales up/down but doesn't scale to zero                     |
