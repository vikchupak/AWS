# CloudFront & S3. Private access to S3

- See [what a private distribution is](https://github.com/vikchupak/AWS/blob/main/services/cloudfront/privateDistributions.md)

1. Restrict direct access to Amazon S3
   - Block all public access
   - Remove any public bucket policies
   - **S3 is closed for direct access**
2. Allow CloudFront via Origin Access Control (OAC)
   - Create an OAC
   - Attach it to your CloudFront distribution
   - Grant that OAC permission in the S3 bucket policy
   - **Only this specific CloudFront distribution is allowed to fetch files from S3**
3. Restrict end users (Signed URLs / Cookies)
   - **Control who can access CloudFront**
     - Use signed URLs or signed cookies for CloudFront
     - **Only your specific client gets access to CloudFront**

### Full flow

- Backend decides which users get access to final S3 objects
  - Your backend checks if a user allowed to access a file
    - If YES → generate signed URL using AWS SDK
    - If NO → reject
- CloudFront only checks URL signature validity
  - If valid -> allow access
  - If invalid -> reject
- CloudFront makes a signed request to S3 (using AWS Signature Version 4 (SigV4))
  - S3 verifyies the request signature against OAC permission in the S3 bucket policy
