# Execution role & policies

For **ECS**, there are actually **two different IAM roles** you should know: **Task execution role** and **Task role**.

### Task execution role

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

This is the one that's most similar to the **Lambda execution role**.

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

ECS itself doesn't have a resource-based policy equivalent to Lambda's **"who can invoke this ECS task"** model.

```text
Principal
     │
     │
     ▼
ECS Service / Task
     │
     └── ❌ No resource-based policy
```

Instead, access to ECS APIs such as `ecs:RunTask`, `ecs:UpdateService`, etc. is generally controlled through **identity-based IAM policies** attached to the calling user's/role's identity.

### The important distinction

```text
Lambda:
Lambda → Execution Role → "What Lambda can do"


ECS:
ECS infrastructure → Task Execution Role
                  → "What ECS needs to run the container"

Application in container → Task Role
                         → "What my application can do"
```

**For your notes, the most important one is:**

> **ECS Task Role ≈ Lambda Execution Role** — both give the application/workload permissions to access AWS services.
