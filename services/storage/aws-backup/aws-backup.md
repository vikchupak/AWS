# AWS Backup

Centrally manage and automate backups.

# Snapshot vs Backup

- Snapshot = a point-in-time copy created by a specific AWS service.
- Backup = a recovery copy managed/protected as part of a backup strategy.

# AWS Backup Vault Lock

**Vault Lock** makes backups **immutable** — they cannot be deleted or modified before their retention period expires.

It has **2 modes**:

| Mode           | Can unlock/remove?                 |
| -------------- | ---------------------------------- |
| **Governance** | ✅ Authorized admin can remove it   |
| **Compliance** | ❌ Cannot remove after grace period |

### Grace period

In **Compliance mode**, the **grace period** is a temporary window where you can still change/remove the lock.

```text
Enable Lock
    ↓
Grace period (3–36 days)
    ↓
Permanent / immutable
    ↓
Cannot remove, even by root
```

**Governance = reversible**
**Compliance = irreversible after grace period**
