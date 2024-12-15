In AWS, **scopes** refer to the different levels at which resources and services operate. These scopes define how resources and services are managed and accessed across the platform. The main scopes in AWS are:

### 1. **Global Scope**
- Services or resources that are not region-specific and operate across all AWS regions.
- Examples:
  - **IAM**: Users, groups, roles, and policies are global.
  - **Route 53**: DNS services operate globally.
  - **CloudFront**: Content delivery operates globally.
  - **WAF**: AWS Web Application Firewall rules are global.
  - **Organizations**: AWS Organizations and accounts operate globally.

### 2. **Regional Scope**
- Services or resources that are tied to specific AWS regions.
- Examples:
  - **EC2 (Elastic Compute Cloud)**: Instances, snapshots, and AMIs are region-specific.
  - **S3 (Simple Storage Service)**: Buckets are region-specific (though data can be accessed globally).
  - **RDS (Relational Database Service)**: Databases exist in specific regions.
  - **Lambda Functions**: Deployed in specific regions.
  - **VPC (Virtual Private Cloud)**: Networks and subnets are region-specific.

### 3. **Availability Zone (AZ) Scope**
- Resources tied to a specific availability zone within a region.
- Examples:
  - **EC2 Instances**: Launched in specific AZs.
  - **EBS Volumes**: Exist in the same AZ as the EC2 instance they are attached to.
  - **Subnets**: Defined at the availability zone level within a VPC.

### 4. **Account Scope**
- Resources that are specific to an AWS account but can operate globally or regionally, depending on the service.
- Examples:
  - **Billing and Cost Management**: Tied to the AWS account.
  - **Quotas (Service Limits)**: Set at the account level but can vary by region.

### 5. **Resource Scope**
- Specific to individual resources, regardless of region or account.
- Examples:
  - **S3 Bucket Policies**: Scoped to individual buckets.
  - **Tags**: Metadata applied to resources for management purposes.
  - **IAM Policies**: Scoped to individual users, roles, or groups.

### Practical Examples:
- **IAM Policies**: Can restrict access to a specific scope, like a particular region or a resource within an account.
- **CloudFormation**: Stacks are scoped to a region but can deploy resources with different scopes (e.g., global S3 buckets or regional EC2 instances).

AWS allows you to combine these scopes through resource policies, service configurations, and IAM conditions to achieve fine-grained access control and design.
