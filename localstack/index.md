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
aws s3 cp file.txt s3://test-bucket/ --profile localstack
```

List S3 bucket files
```bash
aws s3 ls s3://test-bucket --profile localstack
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
