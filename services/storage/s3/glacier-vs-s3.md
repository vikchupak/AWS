# Amazon Glacier (Standalone Service) vs S3 Glacier Storage Classes (via Amazon S3)

### Amazon Glacier

- This is the original, legacy Amazon Glacier service (vault-based)
- You CANNOT upload archives directly via the AWS Management Console. You must use the AWS CLI, REST API, or AWS SDKs
- Amazon Glacier (standalone) is **no longer accepting new customers**. AWS recommends using the S3 Glacier storage classes instead

### S3 Glacier Storage Classes (via Amazon S3)

- When you upload to an S3 bucket and select a Glacier storage class (e.g., S3 Glacier Flexible Retrieval, S3 Glacier Deep Archive), you **CAN** do this directly via the S3 Management Console. This is because the object is managed through Amazon S3, not the standalone Glacier service.
  <img width="548" height="189" alt="image" src="https://github.com/user-attachments/assets/4060771d-4257-4174-b31d-7ab567709459" />

## Lock diff

- [Lock diff](https://github.com/vikchupak/AWS/blob/main/services/storage/s3/object-lock.md)
