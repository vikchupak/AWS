In AWS, **“identities”** are entities that can be **authenticated and authorized to make AWS API calls**.

There are **three primary identity types** in IAM:

# ✅ **1) IAM Users**

A *human-like* identity with:

* Long-term credentials (password, access keys)
* Belongs to one AWS account

Used for:
* Legacy human access
* Programmatic access (not recommended today)

- ✅ Can be assigned to groups
- ✅ Can have direct policies
- ⚠️ Should be minimal; use roles/SSO instead

# ✅ **2) IAM Roles**

A role is an identity that:

* Has **no long-term credentials**
* Is **assumed via STS**
* Has a **trust policy** that defines who can assume it

Used for:

* AWS services (Lambda, EC2)
* Human access via SSO
* Cross-account access
* Temporary permissions

Types by usage:

* **Service roles (assumed by AWS services)**
* **User/administrator roles (assumed by humans/SSO)**
* **Cross-account roles**
* **Federation roles**

Example of a cross-account assumed role as an identity
<img width="1280" height="678" alt="image" src="https://github.com/user-attachments/assets/c319aeb8-6ff2-4174-8cbf-2fd5497c2b61" />

# ✅ **3) Federated Identities**

Users authenticated elsewhere and mapped to a role via STS.

Examples:

* AWS IAM Identity Center (SSO)
* Google/AzureAD/Okta
* SAML 2.0, OIDC
* Web identity federation (Cognito)

They do **not** exist inside IAM as users; they assume roles when needed.

# Is a role an idedntity?

✅ **Yes. An IAM Role is an identity in AWS.**

But it is a **special kind of identity**. **Roles CANNOT be logged into**

### ✅ What makes a role an identity?

An **identity** is something that:
- Can have permissions
- Can make AWS API requests
- Can be logged/audited in CloudTrail

An IAM **role** satisfies all of these.

**`When assumed, it becomes an identity` like:**

```
arn:aws:sts::<account-id>:assumed-role/RoleName/SessionName
```

AWS sees this as the acting principal → identity.

### ✅ Identity types in AWS

| Identity type      | Persistent credentials? | Requires AssumeRole? |
| ------------------ | ----------------------- | -------------------- |
| IAM User           | ✅                       | ❌                    |
| IAM Role           | ❌                       | ✅                    |
| Federated identity | ❌                       | ✅                    |

IAM Role is an identity but:

* It has **no long-term credentials**
* It must be **assumed via STS** to act

### ✅ Difference from IAM User

| Feature                   | IAM User | IAM Role |
| ------------------------- | -------- | -------- |
| Long-term credentials     | ✅        | ❌        |
| Meant for humans          | ✅        | ❌        |
| Meant for apps/services   | ❌        | ✅        |
| Needs STS AssumeRole      | ❌        | ✅        |
| Trusted principals list   | ❌        | ✅        |
| One principal per session | ✅        | ✅        |

- Roles are **identity + permissions** without an owner.
- Users are **identity + credentials** tied to a person/system.

