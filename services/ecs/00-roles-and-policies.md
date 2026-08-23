# Execution role & policies

For **ECS**, there are actually **two different IAM roles** you should know: **Task execution role** and **Task role**.

### Task execution role

What ECS task can do with containers / What ECS needs to run the container.

* **Task execution role** → IAM role used by the **ECS agent/Fargate infrastructure** to perform actions needed to start/run the container
* The role has **identity-based policies**
* Has a **trust policy** → allows ECS tasks to assume the role

```text
ECS / Fargate
     │
     │ assumes
     ▼
Task Execution Role
     │
     ├── Trust policy
     │      └── "ECS tasks can assume me"
     │
     └── Identity-based policies
            └── "Pull image from ECR,
                 write logs to CloudWatch, etc."
```

### Task role

What containers can do / What my application can do.

* **Task role** → IAM role whose credentials are made available **inside the container**
* Your application uses this role to access AWS services
* Has **identity-based policies**
* Has a **trust policy**

```text
ECS Container
     │
     │ assumes
     ▼
Task Role
     │
     ├── Trust policy
     │      └── "ECS tasks can assume me"
     │
     └── Identity-based policies
            └── "Application can access
                 S3, DynamoDB, SQS, etc."
```

### Resource-based policy

ECS doesn't have a resource-based policy.

Access to ECS APIs such as `ecs:RunTask`, `ecs:UpdateService`, etc. is generally controlled through **identity-based IAM policies** attached to the calling user's/role's identity.

```txt
Principal
   │
   │ has permission
   ▼
Identity-based policy
   │
   │ ecs:RunTask
   │ ecs:UpdateService
   ▼
ECS API
```
