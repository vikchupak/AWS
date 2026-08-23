# Instance profile

- EC2 assumes **IAM role** via **Instance profile**
  ```txt
  EC2 instance
       ↓
  Instance profile
       ↓
  IAM role
       ↓
  Identity-based policies
       ↓
  AWS resources
  ```
  - IAM role has **Trust policy** -> who can assume the role
- EC2 instances do not support **resource-based IAM policies**
  - Access to EC2 is mainly controlled through identity-based policies
  - Who/what can access EC2
  ```txt
  IAM User / Role
       ↓
  Identity-based policy
       ↓
  EC2 API
       ↓
  EC2 instance
  ```
