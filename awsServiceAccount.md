- https://github.com/vikchupak/AWS/blob/main/users.md
- https://github.com/vikchupak/AWS/blob/main/services/eks/eks.md

AWS service account:
- IRSA (IAM Role for Service Account). Exists **ONLY** in EKS context. [Official doc](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)
  - IAM Role can be assumed by other AWS services and **k8s service accounts**
- IAM Users for Service Accounts - **NO SUCH THING!**
  - Long-term IAM user creds (AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY) can be used by other services to access AWS resources on behalf of the IAM user. But, it is **NOT SECURE**.
