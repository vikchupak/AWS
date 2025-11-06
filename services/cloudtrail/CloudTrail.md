# CloudTrail

- CloudTrail logs - actions that affect aws account
  - Management Events (Enabled by default)
  - Data Events
  - Insights Events
- Region resilent
- By default, logs is stored to `CloudTrail Event History`
- Logs can be stored to s3 and CloudWatch
- Trail can be `one-region` or `all-regions`
- **GLOBAL SERVICE EVENTS (IAM, CLOUDFRONT, STS) ARE STORED IN `US-EAST-1` REGION**
  - They produce GLOBAL SERVICE EVENTS
    - We need to enable them in Trail (Enabled by default)
- `Stop logging` stops sending logs to s3 and CloudWatch, but not to `CloudTrail Event History`

# Organizational Trail

- Enable CloudTrail in an `organization management account` to collect all organization accounts logs
  - Define s3 or/and CloudWatch as destination
