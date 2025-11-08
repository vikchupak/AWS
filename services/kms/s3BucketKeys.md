# S3 Bucket Keys

- [Official doc](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html)
- By default, puting an object to a s3 bucket involves making an API call for AWS KMS to generate a new DEK.
  - API calls to AWS KMS are paid
  - KMS can't hadle huge load (like 10,000 or 50,000 requests/sec) which causes throttling
  - To bypass this, `S3 Bucket Keys` are used

---

- S3 Bucket Keys.
  - KMS generates a time-limited Bucket Key used to generate DEKs on **S3 side**
  - This has to be enabled on a bucket
  - CloudTrail KMS events now show the bucket, not the object
  - Works with replication enabled
