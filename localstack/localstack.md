# Installation (LocalStack Desktop + Docker-Compose)

- [LocalStack Desktop](https://docs.localstack.cloud/aws/getting-started/installation/#localstack-desktop)
- [Docker-Compose](https://docs.localstack.cloud/aws/getting-started/installation/#docker-compose)

# AWS CLI + LocalStack AWS CLI

- [AWS CLI](https://docs.localstack.cloud/aws/integrations/aws-native-tools/aws-cli/#aws-cli)
- [LocalStack AWS CLI (awslocal)](https://docs.localstack.cloud/aws/integrations/aws-native-tools/aws-cli/#localstack-aws-cli-awslocal)

```bash
cat ~/.aws/config

# [profile localstack]
# region=us-east-1
# output=json
# endpoint_url = http://localhost:4566
```

```bash
cat ~/.aws/credentials

# [localstack]
# aws_access_key_id=test
# aws_secret_access_key=test
```

### Examples

Create S3 bucket
```bash
aws s3 mb s3://test-bucket --profile localstack
```

List S3 buckets
```bash
aws s3 ls --profile localstack 
```

Upload a file
```bash
aws s3 cp file.png s3://test-bucket/ --profile localstack
```

List S3 bucket objects
```bash
aws s3 ls s3://test-bucket --profile localstack
```

View the file
```bash
http://localhost:4566/test-bucket/file.png
https://localhost.localstack.cloud:4566/test-bucket/file.png
# Or use LocalStack Desktop or Web App > navigate S3/test-bucket/file.png
```

## Switch profile for a session

```bash
export AWS_PROFILE=localstack
```

List S3 buckets
```bash
aws s3 ls
```

## Use a shell alias to use the profile

```bash
alias awslocal="aws --profile localstack"
```

List S3 buckets
```bash
awslocal s3 ls
```

# S3 SDK config

```javascript
this.s3Client = new S3Client({
  // region may be any dummy data for localstack, but still REQUIRED
  region: configService.get<string>('S3_REGION'),
  endpoint: configService.get<string>('LOCALSTACK_ENDPOINT'),
  forcePathStyle: true,
  credentials: {
    accessKeyId: 'test', // always 'test' for localstack
    secretAccessKey: 'test', // always 'test' for localstack
  },
});
```
