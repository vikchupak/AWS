# AWS course program

1. Introduction
2. AWS Accounts
   - Create (root user) accounts + enable MFA
     - General and Production accounts (email.address.1 and email.address.2)
   - Create an IAM (admin) user + enable MFA
   - IAM Access Keys for the IAM (admin) user & configure AWS CLI
4. AWS Fundamentals
5. IAM, ACCOUNTS AND AWS ORGANISATIONS
   - [Service-linked roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create-service-linked-role.html) & PassRole
     - Service-linked roles
        - Roles predefined by the service and include all the permissions that the service requires to call other AWS services on your behalf
        - A role is linked directly to an AWS service
     - PassRole action
       - A role is linked (assigned) to a service
       - The service has to assume the role to get required permissions
       - You has a policy with PassRole action which says you authorized to pass the role to the service when calling it
       - Better mental model
         - IAM Role = a badge with permissions
         - Trust policy = who is allowed to wear that badge
         - AssumeRole = putting the badge on
         - PassRole = pointing at a badge and saying “that service may wear this one”
   - AWS Organizations
     - Create an organization
     - Add accounts to the organization
     - Configure switching between accounts (Switch Role) within the organization
     - Service Control Policies (SCP)
7. S3
8. VPC BASICS
9. EC2 BASICS
10. CONTAINERS & ECS
11. ADVANCED EC2
12. Route 53 - Global DNS
13. RDS
14. NETWORK STORAGE & DATA LIFECYCLE
    - [Amazon Elastic File System (Amazon EFS)](https://aws.amazon.com/efs/)
    - [AWS Backup](https://aws.amazon.com/backup/)
15. HA & SCALING
    - Elastic Load Balancers (ELB)
    - Launch Templates (LT) & Auto Scaling Groups (ASG)
    - Gateway Load Balancer (GWLB) - "Scalable Firewall"
16. SERVERLESS AND APPLICATION SERVICES
    - [AWS Lambda](https://aws.amazon.com/lambda/)
    - [AWS Step Functions](https://aws.amazon.com/step-functions/)
    - [Amazon Simple Notification Service (Amazon SNS)](https://aws.amazon.com/sns/)
    - [Amazon Simple Queue Service (Amazon SQS)](https://aws.amazon.com/sqs/)
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
      - Connect VPC to on-promises over Public Internet
    - [AWS Direct Connect (DX)](https://aws.amazon.com/directconnect/)
      - Connect VPC to on-promises over Physical cables (VPN Encryption can be configured)
    - [AWS Transit Gateway (TGW)](https://aws.amazon.com/transit-gateway/)
      - Connect VPCs to VPCs
      - Connect VPCs to on-promises using Site-to-Site VPN or DX (VPN Encryption can be configured)
    - [AWS Storage Gateway](https://aws.amazon.com/storagegateway/)
      - [Volume Gateway](https://aws.amazon.com/storagegateway/volume/)
        - Let on-premises applications use block storage (disk volumes) while the data is stored in Amazon S3
           - Stored volumes
             - Primary data is stored on Storage Gateway VM on-prem locally
           - Cached volumes
             - Primary data is stored on AWS S3
      - Tape Gateway or Virtual Tape Library (VTL)
        - Let on-premises backup software store data on virtual tape library backed by Amazon S3
          - Primary data is stored on AWS S3
      - [Amazon S3 File Gateway](https://aws.amazon.com/storagegateway/file/s3/)
        - Let on-premises applications use file storage while the files are stored in Amazon S3
          - Primary data is stored on AWS S3
   - [AWS Snowball](https://aws.amazon.com/snowball/)
     - Migrate data offline
     - Products
        - Snowball
        - Snowball edge
        - Snowmobile
   - [AWS DataSync](https://aws.amazon.com/datasync/)
     - Migrate data online
   - [AWS Directory Service](https://aws.amazon.com/directoryservice/)
     - Manage identities and access, ensuring the right people have access to the right resources in a corporate IT network
     - Modes
        - Simple AD
        - AWS Managed Microsoft AD
        - AD Connector
   - [Amazon FSx](https://aws.amazon.com/fsx/)
     - File System as a Service
     - Services
       - Amazon FSx for Windows File Server
       - Amazon FSx for Lustre
   - [AWS Transfer Family](https://aws.amazon.com/aws-transfer-family/)
     - Transfer data TO or FROM S3, EFS using non-native AWS protocols
21. SECURITY, DEPLOYMENT & OPERATIONS
   - [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
   - [AWS Systems Manager (SSM)](https://aws.amazon.com/systems-manager/)
     - [Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
   - Application Layer (L7) Firewall
     - Have visibility of the data inside a L7 connection and the layers below L3, L4, L5
       - Keeps all L3, L4, L5 Firewall features
       - Layer 7 is where HTTP, SMTP, DNS protocols "live"
       - Can decrypt HTTPS to analyze HTTP content
       - L3, L4 Firewalls are stateless. L5, L7 Firewalls are stateful
     - [AWS Web Application Firewall (AWS WAF)](https://aws.amazon.com/waf/)
   - [AWS Shield](https://aws.amazon.com/shield/)
     - Protects against DDoS attacks
   - [AWS CloudHSM](https://aws.amazon.com/cloudhsm/)
     - Securely generate, store, and use cryptographic keys inside dedicated, tamper-resistant hardware while running in the AWS Cloud
   - [AWS Config](https://aws.amazon.com/config/)
     - Record resource configuration changes (history) over time to S3
     - Detects and reports non-compliant changes againt resorce Config Rules using Lambda
       - But it does NOT block non-compliant changes
   - [Amazon Macie](https://aws.amazon.com/macie/)
     - Discovers, classifies, and protects sensitive data stored in **Amazon S3**
       - Identify sensitive data (like PII, financial data, credentials) in S3 buckets and alert you if it’s exposed or improperly secured
   - [Amazon Inspector](https://aws.amazon.com/inspector/)
     - Scans workloads running on AWS (such as EC2 instances, container images in ECR, and Lambda functions) for software vulnerabilities and unintended network exposure
   - [Amazon Guardduty](https://aws.amazon.com/guardduty/)
     - Managed threat detection service. Continuously monitor AWS environments for malicious activity, suspicious behavior, and potential security threats. Analyzes multiple data sources such as
       - VPC Flow Logs
       - CloudTrail events
       - DNS logs
       - S3 data events
     - It does not block traffic (it detects and reports, does not prevent)
22. Infrastructure as Code (CloudFormation)
23. NOSQL Databases & DynamoDB
24. Machine Learning
25. Other Services & Features
