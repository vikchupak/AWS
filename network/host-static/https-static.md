# Host static files in s3 + CloudFront

https > dns system (Route 53 or Godaddy) > CloudFront(+ACM) > S3

---

- `Amazon S3` — to store your static website files
  - `bucket` - permissions:
    - Block (all) public access > **enable**
    - Bucket policy > **make only CloudFront to access the bucket using Origin Access Identity(OAI)**
      ```
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity 123456QWERTY"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::my-bucket/*"
      }
    ```
    - Access Control List (ACL) > **make sure only `Bucket owner (your AWS account)` has access**
- `Amazon CloudFront` — to cache and deliver content globally (CDN)
  - When creating a distribution and choosing an S3 bucket as the origin > select `access using an OAI`
    - Update Bucket policy with OAI
  - Add `domain records` and `custom SSL(ACM) certificate` to CloudFront distribution
- Update your DNS provider (Route 53 or Godaddy) > add CNAME pointing to CloudFront distribution

## OAI and OAC

- Origin Access Identity(OAI) - Virtual IAM user, alike Service Account - **Legacy** - specific to CloudFront only
- Origin Access Control (OAC) - **Modern - Recommended**
  - CloudFront signs requests to S3 using `AWS Signature Version 4 (SigV4) protocol`
  - S3 has a policy that says only requests from that CloudFront disribution are allowed. S3 verifies the req signature.
