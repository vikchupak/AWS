# DLM vs AWS Backup

Both are AWS services for **automating backups**, but they operate at different levels.

### DLM vs AWS Backup

| **Feature** | **Amazon Data Lifecycle Manager (DLM)** | **AWS Backup** |
|---|---|---|
| Main purpose | Automate **EBS snapshot / AMI** lifecycle | Centralized backup management across AWS services |
| Scope | Primarily **EBS** | EBS, RDS, Aurora, DynamoDB, EFS, FSx, S3, etc. |
| Backup type | EBS snapshots, EBS-backed AMIs | Service-specific backups/snapshots |
| Centralized management | ❌ Limited | ✅ |
| Cross-Region backup | ✅ | ✅ |
| Cross-account backup | Limited/use specific mechanisms | ✅ |
| Backup policies | Simple lifecycle policies | More comprehensive backup plans |
| Retention management | ✅ | ✅ |
| Vault | ❌ | ✅ Backup Vault |
| Good for | Simple EBS snapshot automation | Enterprise-wide backup strategy |

### DLM

Think:

> **DLM = EBS snapshot lifecycle manager**

Example:

```text
EBS Volume
    │
    ▼
DLM Policy
    │
    ├── Snapshot every day
    ├── Keep 7 snapshots
    └── Delete older snapshots
```

It's great when the requirement is specifically:

> "Automatically create and delete EBS snapshots."

---

### AWS Backup

Think:

> **AWS Backup = centralized backup service**

```text
             AWS Backup
                 │
       ┌─────────┼──────────┐
       ▼         ▼          ▼
      EBS       RDS        EFS
       │         │          │
       └─────────┼──────────┘
                 ▼
           Backup Vault
```

You create a **Backup Plan**:

```text
Backup Plan
   │
   ├── Schedule: Daily
   ├── Retention: 30 days
   └── Lifecycle: Move to cold storage
```

Then associate resources with the plan.

### 🧠 SAA exam shortcut

If you see:

> **"EBS snapshots" + lifecycle/retention**

→ **DLM**

If you see:

> **"Centralized backup" + multiple AWS services**

→ **AWS Backup**

Especially remember:

```text
DLM
= EBS-focused
= snapshots / AMIs
= simple lifecycle automation


AWS Backup
= many AWS services
= centralized backup
= Backup Plans + Backup Vaults
```

**One-liner:**  
**DLM manages EBS snapshot lifecycles; AWS Backup manages backups across many AWS services.**
