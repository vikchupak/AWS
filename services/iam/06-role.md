- Only one role is **attached/assigned** to a **resouce**
- Many different roles are **assumed** by an IAM **identity**, one role at a time
  - See what [identities](https://github.com/vikchupak/AWS/blob/main/services/iam/identity.md) are

---

**Short answer:**
- ✅ *Yes* for the first one.
- ✅ *Yes* for the second one (with a nuance — an IAM user **can** assume multiple roles, but only **one at a time per session**).


# ✅ Statement 1

> **Only one role is attached/assigned to a service.**

✅ **Correct**

An AWS service instance (Lambda function, EC2 instance, ECS task, etc.) can have **only one IAM role attached at a time**.

Examples:

| Service         | Role               |
| --------------- | ------------------ |
| Lambda function | Execution role (1) |
| EC2 instance    | Instance role (1)  |
| ECS task        | Task role (1)      |

If the service needs *more* permissions, that single role must contain all necessary permissions — via inline or managed policies.

📌 **You CANNOT attach multiple roles to a single service instance.**

> ✅ Correct

# ✅ Statement 2

> **Different roles are assumed by IAM user.**

✅ **Correct — with nuance**

An IAM user is an identity.
A user can assume **many roles**, but **not simultaneously in one session**.

✅ They can assume role A → finish → assume role B
❌ They cannot have A + B active at once

If they need access to both, they must:

* Switch between roles manually, or
* Use STS and maintain multiple sessions independently (e.g., multiple terminals)

> ✅ Correct → A user can assume many roles, just **not multiple at once per session**

# Example

✅ A Lambda function has:

```
Role: LambdaExecutionRole
```

✅ A developer can assume:

```
Role: AdminSupportRole
Role: AuditRole
Role: DevOpsRole
```

(But only one in a session)
