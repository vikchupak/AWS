## AWS Transfer Family

Transfer data TO or FROM S3, EFS using non-native AWS protocols
- File Transfer Protocol (FTP)
- File Transfer Protocol Secure (FTPS)
- SSH File Transfer Protocol (SFTP)
- Applicability Statement 2 (AS2)

It is about ability to upload/download using different protocols rather than migration.

- Amazon EFS is well-known for its **high IOPS performance**, making it good for applications that require quick and simultaneous read/write operations.

<img width="1920" height="977" alt="image" src="https://github.com/user-attachments/assets/799289cc-283d-4708-9b69-69ab053a101a" />

### Service-Managed Users (Built-in)

AWS Transfer Family has a **built-in user management system** where you can:

| **Capability**                    | **Detail**                                                        |
| --------------------------------- | ----------------------------------------------------------------- |
| **Create users**                  | Add SFTP users directly in the Transfer Family console            |
| **SSH public key authentication** | Assign SSH public keys per user for authentication                |
| **Home directory**                | Set a specific home directory in S3 or EFS per user               |
| **Logical home directories**      | Map a user to a specific folder path while hiding the real path   |
| **IAM role per user**             | Assign an IAM role to each user, controlling what they can access |
| **Scope-down policy**             | Further restrict the user's IAM role permissions per session      |

#### How Permissions Work Per User

Each user in Transfer Family gets:

```text
SFTP User
    ├── SSH Public Key → authentication
    ├── Home Directory → mapped to EFS path or S3 prefix
    ├── IAM Role → defines what S3/EFS actions are allowed
    └── Scope-down Policy (optional) → further restricts the IAM role
```

**Example:**

* `alice` can only read/write to `/home/alice/` on EFS.
* `bob` has read-only access to `/shared/reports/`.
* Access is controlled through **IAM roles, home directory mappings, and optional scope-down policies**.
