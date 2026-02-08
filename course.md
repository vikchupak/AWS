# AWS course program

1. Introduction
2. AWS Accounts
   - Create (root user) accounts + enable MFA
     - "General" account (email.address.1)
     - "Production" account (email.address.2) - Optional
   - Create an IAM (admin) users + enable MFA
   - IAM Access Keys & configure AWS CLI
4. AWS Fundamentals
5. IAM, ACCOUNTS AND AWS ORGANISATIONS
   - [Service-linked roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create-service-linked-role.html) & PassRole
     - A service-linked role is linked directly to an AWS service
     - Service-linked roles are predefined by the service and include all the permissions that the service requires to call other AWS services on your behalf
     - PassRole
       - A role is assigned(linked) to the service
       - The service has to assume the role to get required access/permissions
       - You has PassRole policy which says you allow the service to really assume the role when you calling the service
       - Better mental model
         - IAM Role = a badge with permissions
         - Trust policy = who is allowed to wear that badge
         - AssumeRole = putting the badge on
         - PassRole = pointing at a badge and saying “that service may wear this one”
   - AWS Organizations
     - Create an organization using the "General" account
       - This will "convert" the account to a management (master) account
       - Invite "Production" account to the organization
       - Configure `Switch Role` (uses assume role api under the hood). In the "Production" account, assign `OrganizationAccountAccessRole` to it
         - This allows "General" account to switch to "Production" account
     - Service Control Policies (SCP)
7. S3
8. VPC BASICS
9. EC2 BASICS
10. CONTAINERS & ECS
11. ADVANCED EC2
12. Route 53 - Global DNS
13. RDS
14. NETWORK STORAGE & DATA LIFECYCLE
    - [Amazon Elastic File System (EFS)](https://aws.amazon.com/efs/)
    - [AWS Backup](https://aws.amazon.com/backup/)
15. HA & SCALING
    - Elastic Load Balancers (ELB)
    - Launch Templates (LT) & Auto Scaling Groups (ASG)
    - Gateway Load Balancer (GWLB) - "Scalable Firewall"
16. SERVERLESS AND APPLICATION SERVICES
    - Lambda
    - [AWS Step Functions](https://aws.amazon.com/step-functions/)
    - SNS
    - SQS
    - [Amazon MQ](https://aws.amazon.com/amazon-mq/)
    - [Amazon EventBridge](https://aws.amazon.com/eventbridge/) & Amazon CloudWatch Events
    - [Amazon API Gateway](https://aws.amazon.com/api-gateway/)
    - [Amazon Cognito](https://aws.amazon.com/cognito/)
    - Kinesis
        - [Amazon Kinesis](https://aws.amazon.com/kinesis/)
        - [Amazon Data Firehose](https://aws.amazon.com/firehose/)
        - [Amazon Kinesis Data Analytics for SQL](https://aws.amazon.com/kinesis/data-analytics-for-sql/)
        - [Amazon Kinesis Video Streams](https://aws.amazon.com/kinesis/video-streams/)
17. GLOBAL CONTENT DELIVERY AND OPTIMIZATION
    - [Amazon CloudFront](https://aws.amazon.com/cloudfront/)
      - Distributions
      - Cache invalidation
      - ACM for custom domains
      - Private distributions & behaviours
      - Restrict access to origins
      - Lambda@edge
18. ADVANCED VPC
    - Egress-Only Internet Gateway (EIGW). For "IPv6" only
    - VPC Endpoints
      - VPC Gateway Endpoints
        - Provide direct private access to public S3 and DynamoDB services from VPC (public and private) subnets. Free
      - VPC Interface Endpoints
        - Provide direct private access to public AWS services from VPC (public and private) subnets. Has price
    - VPC Peering
      - Direct encrypted network link between two VPCs
20. HYBRID ENVIRONMENTS AND MIGRATION
    - [AWS Site-to-Site VPN](https://aws.amazon.com/vpn/site-to-site-vpn/)
      - Connect VPC to On-promises over Public Internet
    - [AWS Direct Connect (DX)](https://aws.amazon.com/directconnect/)
      - Connect VPC to On-promises over Physical cables (VPN Encryption can be configured)
    - [AWS Transit Gateway (TGW)](https://aws.amazon.com/transit-gateway/)
      - Connect VPCs to VPCs
      - Connect VPCs to On-promises using Site-to-Site VPN or DX (VPN Encryption can be configured)
    - [AWS Storage Gateway](https://aws.amazon.com/storagegateway/)
      - [Volume Gateway](https://aws.amazon.com/storagegateway/volume/)
        - Stored volumes
        - Cached volumes
      - Tape Gateway or Virtual Tape Library (VTL)
        - Emulate a physical tape library on-premises so legacy backup software can store backups in AWS S3 and Glacier
      - [Amazon S3 File Gateway](https://aws.amazon.com/storagegateway/file/s3/)
21. SECURITY, DEPLOYMENT & OPERATIONS
22. Infrastructure as Code (CloudFormation)
23. NOSQL Databases & DynamoDB
24. Machine Learning
25. Other Services & Features
