# **Relation Between `Root User` and `IAM User` in AWS**  

In AWS, there are two types of users:  

### **1. Root User** (Account Owner)  
- The **root user** is the **email address owner** of the AWS account.  
- It has **full access** to all AWS resources and billing information.  
- Cannot be restricted by IAM policies.  
- AWS **strongly recommends** avoiding daily use of the root account and instead creating IAM users.  

### **2. IAM User** (Created Users with Permissions)
- **An IAM user is an identity with long-term credentials that is used to interact with AWS in an account.**
- An **IAM user** is a user created within AWS IAM (Identity and Access Management).  
- IAM users **do not** have full permissions by default.  
- **The root user can create IAM users and assign permissions through IAM policies**.** 
- IAM users can be given **specific access** (e.g., read-only access to S3, full access to EC2, etc.).  

### **Key Differences**  

| Feature            | Root User | IAM User |
|--------------------|----------|----------|
| Created By        | AWS Account Owner | Root User or IAM Admin |
| Permissions       | Full Access (Cannot Be Restricted) | Customizable with IAM Policies |
| Can Manage Billing? | Yes | Only if granted `billing` permissions |
| Can Be Deleted?  | No | Yes |
| Best Practice?  | Avoid Daily Use | Use IAM Users Instead |

### **Best Practices**  
✔ **Enable MFA (Multi-Factor Authentication) for Root User**  
✔ **Use IAM Users for Daily Work**  
✔ **Never Share Root User Credentials**  
✔ **Use IAM Roles for Temporary Access**  

# Does IAM user have an account ID?

No, an **IAM user does not have a unique AWS account ID**, but it belongs to an AWS account that has an account ID (root user).  

### **Key Points:**  
1. **AWS Account ID**  
   - Every AWS account has a **12-digit account ID** (e.g., `123456789012`).  
   - All IAM users within that account **share the same account ID**.  

2. **IAM User Identifiers**  
   - Each IAM user has a **unique ARN (Amazon Resource Name)**, which includes the account ID.  
   - Example:  
     ```
     arn:aws:iam::123456789012:user/your-iam-username
     ```
   - IAM users do not have their own separate AWS account IDs, but they are linked to the account they belong to.  
