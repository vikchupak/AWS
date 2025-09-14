In AWS, **IAM policies** are used to define permissions for users, groups, and roles. Policies are **JSON documents** that specify which actions are allowed or denied for specific AWS resources.

---

- **A policy is a set of permissions**
- **There are also trust policies - they are attached to roles and define who can assume the roles**

---

### Steps to Create a Policy in AWS

#### 1. **Using the AWS Management Console**
   1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/) and open the **IAM** (Identity and Access Management) service.
   2. In the navigation pane, select **Policies**.
   3. Click **Create Policy**.
   4. Use either the **Visual Editor** or **JSON Editor** to define the policy:
      - **Visual Editor**: Select services, actions, and resources step-by-step.
      - **JSON Editor**: Paste or write the JSON code for the policy directly.
   5. Review the permissions and **Add tags** if needed.
   6. Click **Review policy**, then give it a name and description.
   7. Click **Create policy**.

#### 2. **Using the AWS CLI**
   You can also create policies using the AWS Command Line Interface (CLI). Here’s an example of creating a policy:

   ```bash
   aws iam create-policy \
     --policy-name MyPolicyName \
     --policy-document '{
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": "s3:ListBucket",
           "Resource": "arn:aws:s3:::example-bucket"
         }
       ]
     }'
   ```
  Or
   ```bash
   aws iam create-policy \
     --policy-name MyPolicyName \
     --policy-document file://MyPolicyName.json
   ```

#### 3. **Using AWS SDKs**
   AWS SDKs (e.g., Python’s Boto3, Java SDK) can also be used to create policies programmatically. Here’s an example in **Python** using **Boto3**:

   ```python
   import boto3

   iam = boto3.client('iam')

   policy = {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Effect": "Allow",
               "Action": "s3:ListBucket",
               "Resource": "arn:aws:s3:::example-bucket"
           }
       ]
   }

   response = iam.create_policy(
       PolicyName='MyPolicyName',
       PolicyDocument=json.dumps(policy)
   )

   print(response)
   ```

### Example Policy JSON Document

Here’s an example of a policy document that grants permissions to list objects in a specific S3 bucket:

```json
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Action": [
            "s3:ListBucket"
         ],
         "Resource": [
            "arn:aws:s3:::example-bucket"
         ]
      }
   ]
}
```

- **Version**: Defines the version of the policy language; use `2012-10-17` for the latest.
- **Statement**: Contains one or more statements, each defining permissions.
  - **Effect**: Can be either `"Allow"` or `"Deny"`.
  - **Action**: Specifies which actions are allowed or denied (e.g., `s3:ListBucket`).
  - **Resource**: Specifies the AWS resource(s) to which the policy applies.

### Attaching the Policy

Once the policy is created, you can attach it to a **user, group, or role** in IAM. This enables the principal (user, group, or role) to have the permissions defined by the policy.
