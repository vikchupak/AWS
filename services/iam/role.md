# IAM Role

The following can be attached to an IAM role

- Trust policy (who can assume role)
- Permissions policy (role permissions)

---

- **You can only actively assume one role at a time**
- **No multiple roles' permissions merging possible**

---

- secure token service (sts) grants `temporary security credentials` to identity/service that assumed role.

## Example

**Lambda → AssumeRole → S3**

A Lambda function assumes an IAM Role that allows it to read from S3.

### **IAM Role: `LambdaS3Reader`

### 1) ✅ Trust policy → allows Lambda to assume this role.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

---

### 2) ✅ Permissions policy → defines permissions what the role can do.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ]
    }
  ]
}
```

---

### 3) ✅ Assign the role to lambda (ONLY ONE Role possible)

```bash
aws lambda create-function \
  --function-name MyFunction \
  --role arn:aws:iam::<account-id>:role/LambdaS3Reader
```

### 4) ✅ Lambda assumes the role

When Lambda runs, AWS automatically performs:

```
sts:AssumeRole → LambdaS3Reader
```

Lambda gets **temporary credentials**:

* AccessKeyId
* SecretAccessKey
* SessionToken
* Expiration timestamp

Lambda uses these credentials to call S3

# Role overrides other permissions

*If I have direct or group permissions and assume a role with its permissions, are all permissions merged?*

✅ **No — they are *not* merged.**

When you assume a role, your **original identity’s permissions disappear**.
You get **ONLY the permissions of the assumed role** (plus optional session policies if applied).

## ✅ Example

You (IAM user) have:

```
Allow: s3:GetObject
```

AssumedRole has:

```
Allow: dynamodb:Query
```

➡️ After AssumeRole:

✅ You can do `dynamodb:Query`
❌ You CANNOT do `s3:GetObject` anymore

Because your original permissions **do not carry over**.

---

### ✅ Why?

Because `sts:AssumeRole` issues new temporary credentials belonging ONLY to the role.

That identity becomes:

```
arn:aws:sts::<acct>:assumed-role/RoleB/SessionName
```

The original user/role no longer matters.

### ✅ If you need combined permissions

You must:
- ✅ Add the missing permissions to the assumed role
OR
- ✅ Create a new role containing the union of all required permissions

That is the recommended AWS practice.

---

### ✅ Final answer

> **When you assume a role, ONLY that role’s permissions apply.**
> Your original permissions do **not merge** with the assumed role.

# Is a role an idedntity?

✅ **Yes. An IAM Role is an identity in AWS.**

But it is a **special kind of identity**. **Roles CANNOT be logged into**

### ✅ What makes a role an identity?

An **identity** is something that:
- Can have permissions
- Can make AWS API requests
- Can be logged/audited in CloudTrail

An IAM **role** satisfies all of these.

When assumed, it becomes an identity like:

```
arn:aws:sts::<account-id>:assumed-role/RoleName/SessionName
```

AWS sees this as the acting principal → identity.

### ✅ Identity types in AWS

| Identity type      | Persistent credentials? | Requires AssumeRole? |
| ------------------ | ----------------------- | -------------------- |
| IAM User           | ✅                       | ❌                    |
| IAM Role           | ❌                       | ✅                    |
| Federated identity | ❌                       | ✅                    |

IAM Role is an identity but:

* It has **no long-term credentials**
* It must be **assumed via STS** to act

### ✅ Difference from IAM User

| Feature                   | IAM User | IAM Role |
| ------------------------- | -------- | -------- |
| Long-term credentials     | ✅        | ❌        |
| Meant for humans          | ✅        | ❌        |
| Meant for apps/services   | ❌        | ✅        |
| Needs STS AssumeRole      | ❌        | ✅        |
| Trusted principals list   | ❌        | ✅        |
| One principal per session | ✅        | ✅        |

- Roles are **identity + permissions** without an owner.
- Users are **identity + credentials** tied to a person/system.
