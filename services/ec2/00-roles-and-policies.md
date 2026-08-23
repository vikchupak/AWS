# Instance profile

- EC2 assumes **IAM role** via **Instance profile**
  - IAM role has **Trust policy** -> who can assume the role
  ```txt
  EC2
   ↓
  Instance Profile
   ↓
  IAM Role
   ├── Trust policy
   │     └── "EC2 can assume me"
   │
   └── Identity-based policies
         └── "EC2 can access S3, etc."
  ```
- EC2 instances do not support **resource-based IAM policies**
  - Access to EC2 is mainly controlled through identity-based policies -> Who/what can access EC2
  ```txt
  IAM User / Role
       ↓
  Identity-based policy
       ↓
  EC2 API
       ↓
  EC2 instance
  ```
