# Core

- AWS Lambda is a **service**
- A concrete Lambda function is a **resource**, not a service
  - Lambda function = resource you deploy
- Identity - entity that can be **authenticated and authorized** to make AWS API calls
- Principal - An entity performing the action. An entity that is allowed or denied to access a resource in a **resource-based policy**
  - [Official doc](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html)
  - Lsit of principals
    - AWS account and root user
    - IAM users
    - IAM roles
    - Role sessions
    - Federated user principals
    - AWS services
  - All identities are principals. But some principals are not identities (e.g., AWS services)
- Policy types
  - [Official doc](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html)
  - **Indentity-based** policy
    - Attached to identities
    - Set what this identity can access
    - No **Principal** field → because the policy is already attached to the principal
      ```json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::my-bucket/*"
          }
        ]
      }
      ```
  - **Resource-based** policy
    - Attached to resources
    - Set who can access this resource
    - Has **Principal** field
      ```json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Principal": {
              "AWS": "arn:aws:iam::123456789012:role/AppRole"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::my-bucket/*"
          }
        ]
      }
      ```

---

- arn:aws:**iam**::123456789012:**role**/AppRole - IAM role ARN - a role definition
- arn:aws:**sts**::123456789012:**assumed-role**/AppRole/Session - An STS role session ARN - an actual identity that makes API calls

### ✅ CloudTrail Difference

Example event:

```
userIdentity.arn = arn:aws:sts::123456789012:assumed-role/AppRole/AliceSession
```

You will almost never see:

```
arn:aws:iam::123456789012:role/AppRole
```

as the calling principal.

Because the **role definition never calls anything**.
Only **assumed-role session** calls services.

---

