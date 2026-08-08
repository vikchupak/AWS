# CloudTrail

- CloudTrail logs - actions that affect aws account
  - Management Events (Enabled by default)
    - Provide visibility into management operations that are performed on resources in your AWS account. These are also known as control plane operations. Management events can also include non-API events that occur in your account.
  - Data Events
    - Provide visibility into the resource operations performed on or within a resource. These are also known as data plane operations. It allows granular control of data event logging with advanced event selectors. You can currently log data events on different resource types such as Amazon S3 object-level API activity (e.g. GetObject, DeleteObject, and PutObject API operations), AWS Lambda function execution activity (the Invoke API), DynamoDB Item actions, and many more.
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
