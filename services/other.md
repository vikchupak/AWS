- Amazon S3 (Simple Storage Service)
- Amazon RDS (Relational Database Service)
- Amazon DynamoDB
- Amazon EFS (Elastic File System)
- Amazon EC2 (Elastic Compute Cloud) [**Virtual servers in the cloud**]
  - AMI (Amazon Machine Image) - template that contains the software configuration (OS and applications)
    
    ![image](https://github.com/user-attachments/assets/e86ed1ee-1950-4091-b979-e1a9c2a3f6a8)
    
- Amazon EBS (Elastic Block Store)
  - A scalable, high-performance block storage service **designed for use with Amazon EC2 instances**.
  - Attached to EC2 via **EBS volumes**.
  - Data on EBS volumes is persistent, even when the associated EC2 instance is stopped or terminated.
  - When an EC2 instance is created, **by default, an Amazon EBS volume is attached as the root volume** (this is the storage device where the operating system is installed).
    - Typically of the General Purpose SSD (gp3) type.
    - The root volume is automatically mounted to / (the root directory) of the EC2 instance, **meaning it holds the OS** and other essential files.
    - This EBS volume persists even if the EC2 instance is stopped or started again. **However, if the EC2 instance is terminated, the root volume is by default also deleted, unless specified otherwise.**
    - If you create **snapshots** of this root volume, the snapshot can be used to restore or launch new EC2 instances from the same volume configuration.
- Amazon VPC (Virtual Private Cloud) [**Virtual network in the cloud**]
- AWS CloudFormation
  - Allows you to model, provision, and manage AWS resources in a declarative, **infrastructure-as-code** approach. With CloudFormation, you define the infrastructure and configuration you need using a **template written in JSON or YAML**.
  - VPC template
    - https://docs.aws.amazon.com/codebuild/latest/userguide/cloudformation-vpc-template.html
