# AWS Certificate Manager (ACM)

- [Doc](https://aws.amazon.com/certificate-manager/)
- ACM is supported by
  - **CloudFront**
  - **ELB**
  - Amazon API Gateway
  - Other services
- Is regional
  - Certs can't leave the their region
  - To use an ACM cert with a service, the cert has to be in the same region as the service, like ELB
  - Exeption - CloudFront with S3 origin. **S3** origins can be in different regions
    - CloudFront is global - always in `us-east-1` region
    - The CloudFront distribution "adds" its certs to edge locations in differernt regions
