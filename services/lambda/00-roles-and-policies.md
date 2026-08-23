# Execution role & policies

- **Execution role** -> the IAM role Lambda assumes when it runs
  - The role contains **Identity-based policies**
  - Has **Trust policy** -> who can assume the role
  ```txt
  Lambda
     │
     │ assumes
     ▼
  Execution Role
     │
     ├── Trust policy
     │      └── "Lambda can assume me"
     │
     └── Identity-based policies
            └── "Lambda can access S3, DynamoDB, etc."
  ```
- **Resource-based policy** -> Who/what can invoke Lambda
  ```txt
  Principal
     │
     │ allowed to invoke
     ▼
  Lambda Function
     │
     └── Resource-based policy
            └── "This principal can invoke me"
  ```
