# `iam:PassRole` ("ASSIGN" Role) vs `sts:AssumeRole`

- Identity with `iam:PassRole` doesn't have the role's permissions, but it can assign the role to other services and they will get the role's permissions.

### 1) S3WriteRole

Trust Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        // Lambda service can assume this role
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    },
    {
      "Effect": "Allow",
      "Principal": {
        // IAM user can assume this role
        "AWS": "arn:aws:iam::111122223333:user/DevUser"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Permission Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        // Allow writing to my-bucket
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

### 2) IAM UserWithPassPolicy

User inline policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      // The IAM user can create lambda functions
      "Action": "lambda:CreateFunction",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      // The IAM user can "ASSIGN" S3WriteRole
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::111122223333:role/S3WriteRole"
    }
  ]
}
```

### 3) IAM UserWithAssumePolicy

User inline policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      // The IAM user can create lambda functions
      "Action": "lambda:CreateFunction",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      // The IAM user can ASSUME S3WriteRole
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::111122223333:role/S3WriteRole"
    }
  ]
}
```

### 4) UserWithPassPolicy creates a lambda with S3WriteRole

```bash
aws lambda create-function \
  --function-name MyFunction1 \
  --role arn:aws:iam::111122223333:role/S3WriteRole
```

Succsess: the user is able to assign the role to the lambda.

### 5) UserWithAssumePolicy creates a lambda with S3WriteRole

```bash
aws lambda create-function \
  --function-name MyFunction2 \
  --role arn:aws:iam::111122223333:role/S3WriteRole
```

Failure: the user is NOT able to assign the role to the lambda.

```bash
User is not authorized to perform: iam:PassRole on resource arn:aws:iam::111122223333:role/S3WriteRole
```
