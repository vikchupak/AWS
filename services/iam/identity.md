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
