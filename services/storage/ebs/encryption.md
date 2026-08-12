# Encryption

<img width="3012" height="2220" alt="image" src="https://github.com/user-attachments/assets/c8d0acf2-955a-4b1c-a9d0-3f70a18b68e0" />

Encryption by default has no effect on existing EBS volumes or snapshots. The following are important considerations in EBS encryption:
- Encryption by default is a **Region-specific** setting. If you enable it for a Region, you cannot disable it for individual volumes or snapshots in that Region.
- When you enable encryption by default, you can launch an instance only if the instance type supports EBS encryption.
- Amazon EBS does not support asymmetric KMS keys.

You cannot change the KMS keys that is associated with an existing snapshot or encrypted volume. However, you can associate a different KMS keys during a snapshot copy operation so that the resulting copied snapshot is encrypted by the new KMS keys.

Amazon EBS encrypts the resulting new volume or snapshot using your default key for EBS encryption. Even if you have not enabled encryption by default, you can enable encryption when you create an individual volume or snapshot. Whether you enable encryption by default or in individual creation operations, you can override the default key for EBS encryption and use symmetric encryption KMS keys.
