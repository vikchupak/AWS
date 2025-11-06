# Service-linked role (SLR)

- [Official doc](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create-service-linked-role.html)

## ✅ **What is a Service-Linked Role?**

A **service-linked role (SLR)** is a special IAM role that is:
- ✅ Created **for an AWS service**
- ✅ Managed **by the service itself**
- ✅ Has a **predefined permissions policy + trust policy**
- ✅ Used **only by that service**

Example services that use SLRs:

* Amazon ECS
* Amazon RDS
* AWS Organizations
* Amazon Lex
* Amazon Sagemaker

### Key characteristics

| Property             | Service-Linked Role                     |
| -------------------- | --------------------------------------- |
| Who creates it       | AWS (auto or CLI)                       |
| Trust policy         | Fixed — trusts only **one AWS service** |
| Permissions policy   | Predefined by AWS                       |
| Editable?            | Mostly **no**                           |
| Can assume manually? | **No**                                  |
| Scope                | Single AWS service                      |
| Deletion             | Only if **service allows**              |
| Naming               | Fixed prefix: `AWSServiceRoleFor…`      |

Example SLR name:

```
AWSServiceRoleForECS
```

Example trust policy (fixed):

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "ecs.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}
```

# ✅ Key Differences

| Feature                | Service-Linked Role    | Normal IAM Role       |
| ---------------------- | ---------------------- | --------------------- |
| Tied to a service      | ✅ Yes                  | ❌ No                  |
| Created by             | AWS                    | User                  |
| Used by                | Only that service      | Anyone allowed        |
| Predefined permissions | Yes                    | No                    |
| Can edit permissions   | No / Minimal           | Yes                   |
| Can assume manually    | No                     | Yes                   |
| Trust entity           | Only one AWS service   | ANY allowed principal |
| Delete allowed         | Only if service allows | Always                |

---

# ✅ When to Use Which?

### ✅ Use Service-Linked Role when:

* An AWS service automatically needs to manage resources inside your account
* You want correct AWS-managed permissions
* Example:
  * ECS managing ENIs
  * Organizations managing accounts

### ✅ Use a Normal Role when:

* You want to give permissions to
  * EC2
  * Lambda
  * Users
  * Federated users
  * Cross-account users
* You want full customization
