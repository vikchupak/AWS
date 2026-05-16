# Basic policies

- Resource policy
  - Attached to a resource
  - Has **Principal** & Resource
    - Still has Resource field because the resource can have multiple sub-resources
    - **Who can perform what actions on this resource**
      - "Who can access me"
- Identity-based policy
  - Attached to AMI user/role
  - No Principal, but has Resource
    - No Principal because identity is already the principal
  - **What actions this identity can perform on which resources**
    - "What can I access"
- Trust policy (Resource policy subtype)
  - Attached to a role only
  - Has **Principal**, but no Resource
    - No Resource because the role is alredy the resource
  - Who can assume this role
    - "Who can become me"

# Specific 

- kms key policy
  - Resource policy
  - Who can perform what actions on this kms key
 
# Roles

- A role is an identity
- All Roles contain Identity-based policies, not Resource policies
- On a resource, you define a resource policy that allows **the ROLE(identity as Principal)** desired actions
  <img width="2166" height="918" alt="image" src="https://github.com/user-attachments/assets/484b6523-86ad-4608-b30c-6c47b31a03c3" />
- A role has two different policy types
  - Identity-based policies
  - **A Trust policy (always)**

---

- Lambda function
  - Assumes `Lambda Execution Role`
- EC2 instance
  - Assumes `EC2 Instance Role`
  - EC2 -> Instance Profile -> Role -> Policies
- ECS task
  - Assumes `Task Role`
