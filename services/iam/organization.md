# AWS Organizations

- **Management(master) account** - account used to create an organization
- Management account can invite to or create new accounts in an organization
  - These accounts are called **Member Accounts**
- Management account is used for **consolidated billing**
- Organization Unit (OU) can be used to structure your accounts
- SCP (Service Control Policies) are ussed to restrict permissions
  - Allow List vs Deny List permissions architecture
    - Deny List: Dy default `allow all`, and explicitly deny when needed
    - Allow List: Dy default `deny all`, and explicitly allow when needed
  - Only matching in-account IAM policies and SCP policies are applied in result
- Restricting `aws account` with SCP (Service Control Policies) restricts `aws account root user`. This is the only way to restrict `account root user`
- Child SCP can't bypass parent SCP. So if any parent SCP denies an action, nothing below it can allow it.
- **SCP `restricts access for identities who operate inside` aws account. These identities are `assumed` when switching accounts. `Roles are identities`**.

### Role as identity



### ORG Structure & SCP

<img width="1450" height="732" alt="image" src="https://github.com/user-attachments/assets/d853f7ab-cad5-4e9e-8cb2-d561fc63ae7d" />

<img width="1450" height="732" alt="image" src="https://github.com/user-attachments/assets/5933f0ac-0b57-4415-b959-dbea4370b811" />
