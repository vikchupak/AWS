Identity and Access Management (IAM)

- IAM resources are Global

IAM resources
- IAM Users
  - An IAM user cannot directly "have" an IAM role, but an IAM user can assume a role if granted permission.
  - We can assign policies to the user directly or via groups
- IAM User groups (Add users to groups to grant permission via policies)
  - Policies assigned to a group apply to all users in that group
  - IAM Roles CANNOT be assigned to a group
- IAM Policies [like permissions]
- IAM Roles
  - **We CANNOT assign policies[permissions] to ASW services directly as for common users. To grant persissions to a service, we assign a Role with policies to the service.**
  - We can assign policies to roles
  - In general, we want a role for each service
- IAM Identity providers
