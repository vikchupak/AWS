# AWS Elastic Beanstalk (EB)

beanstalk - бобове стебло. bean - біб, stalk - стебло.

- Amazon’s Platform as a Service (PaaS)
- It allows developers to deploy, scale, and manage web applications and worker services **without having to manually provision or configure the underlying infrastructure (like servers, load balancers, network rules, or auto-scaling groups)**.
- Unlike fully managed serverless runtime options (like AWS Lambda) or third-party PaaS offerings that abstract the infrastructure entirely away from you:
  - No direct PaaS lock-in: Beanstalk provisions actual AWS resources directly inside your AWS account.
  - Full visibility and access: You retain complete root access (SSH/SSM) to the underlying EC2 instances and can modify the CloudFormation templates or .ebextensions configuration files whenever custom configurations are needed.
  - Cost model: You do not pay for Elastic Beanstalk itself; you only pay for the underlying AWS resources (EC2, ALB, S3) it provisions.

---

Supports:
- Native Managed Platforms (No Docker Required)
  - If you upload source code or build artifacts (like a .zip file or .jar), Beanstalk provisions a managed runtime environment on Amazon Linux or Windows Server.
  - Under the hood, it sets up the language runtime, web server (e.g., Nginx, Apache, IIS), and reverse proxies automatically.
  -   - Managed platforms include:
        - Node.js
        - Python
        - Java
        - Go
        - PHP
        - Ruby
        - .NET Core on Linux & .NET on Windows Server
- Docker Platforms
  - Single-Container Docker: You provide a Dockerfile or specify an image from Docker Hub / Amazon ECR.
  - Multi-Container Docker: Configured via a Dockerrun.aws.json file (running on Amazon ECS under the hood) to orchestrate multiple containers on a single EC2 instance.

# Logs

- Application files are stored in S3
- The server log files can also optionally be stored in S3 or in CloudWatch Logs
