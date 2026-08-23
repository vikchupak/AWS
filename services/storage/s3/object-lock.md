# S3 Object Lock

- Apply lock on objects
  - Locked objects cannot be deleted or updated for fixed amount of time or indefinitely
  - Uses write-once-read-many (WORM) model
- Require S3 object versioning enabled
  - **Actually object versions are locked, not whole objects**
  - **Only an object version is locked, we can add new object versions on the top without problems**
- Lock applies to individual objects
  - We can configure default bucket object lock settings
- Object lock can be enabled only on new buckets
  - If need to enable on existing buckets, support request needed
  - **UPDATE**: Previously, Object Lock could only be enabled at the time of bucket creation, but now, Amazon S3 allows you to enable S3 Object Lock for existing buckets with just a few clicks
- 2 ways to lock objects
  - **Retention Period**
    - An object version cannot be deleted or modified until a defined date
    - You specify
      - **Retention expiration date**
        - Days & Years
      - **Retention Mode**
        - **Compliance Mode**
          - Nobody can bypass it, not even the root account
          - Cannot reduce or remove retention
        - **Governance Mode**
          - Users with special permission can bypass it `s3:BypassGovernanceRetention` & `x-amz-bypass-governance-retention:true`
            - Can
              - Delete the object version before retention expires
              - Shorten the retention period
              - Remove retention entirely
            - Cannot
              - modify the content of that version
              - overwrite that version
              - change the data in-place
  - **Legal Hold**
    - Apply lock explicitly (ON/OFF). The object version is protected indefinitely until someone explicitly removes the hold
    - Require permission `s3:PutObjectLegalHold` to add or remove lock
  - **Note: Both ways can be applied to an object version at the same time**

# Amazon Glacier Vault Lock (Vault Lock = Object Lock)

- Old model (legacy)
  - Glacier vaults + Amazon S3 Glacier Vault Lock
- Modern model (current standard)
  - Amazon S3 buckets + storage classes
 
| Old (Glacier vaults) | New (S3-based)     |
| -------------------- | ------------------ |
| Vault                | S3 bucket          |
| Archive              | S3 object          |
| Vault Lock           | S3 Object Lock     |
| Lifecycle (manual)   | S3 Lifecycle rules |
| Retrieval jobs       | Restore object API |

Glacier vaults key points:
- Applies to Glacier vaults (older model, not S3 buckets)
- Locks access policy, not individual files
- Once locked → permanent (WORM-style compliance)
- Used for regulatory requirements (SEC, FINRA, etc.)

S3-based key points:
- Works on S3 buckets (with versioning enabled)
- Locks specific object versions
- Supports:
  - Retention period (e.g. 1 year)
  - Legal hold (indefinite)
- Two modes:
- Governance → can be overridden with permissions
- Compliance → cannot be overridden (even by root)
