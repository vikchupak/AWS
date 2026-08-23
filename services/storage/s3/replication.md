# S3 Standard (Built-in replication) vs S3 Replication (CRR/SRR)

- Cross-Region Replication (CRR)
- Same-Region Replication (SRR)

---

| Feature | S3 Standard (Built-in) | S3 Replication (CRR/SRR) |
| :--- | :--- | :--- |
| **Goal** | **Durability** and **High Availability** within a single Region. | **Disaster Recovery**, **Compliance**, or **Latency Reduction** across different buckets/Regions/Accounts. |
| **Automation** | **Automatic** and transparently managed by AWS. | Must be **manually configured** with a rule, IAM role, and destination bucket. |
| **Destination**| Multiple **Availability Zones** within **one** AWS Region. | A separate, user-specified S3 **Bucket** (either in the same Region or a different one). |

- You cannot directly see or access the built-in replicas of your S3 objects
  - The replication of data across multiple Availability Zones (AZs) is an automatic, internal function of the Amazon S3 service for durability and is entirely managed by AWS.

| Feature | S3 Standard (Built-in Redundancy) | S3 Replication (CRR/SRR) |
| :--- | :--- | :--- |
| **Copies Visible?** | **No.** Copies are hidden within the AWS internal infrastructure. | **Yes.** The replica is a fully visible, distinct object in a separate, user-created destination bucket. |
| **Purpose** | **Durability** within one Region. | **Disaster Recovery** or **Latency Reduction** across different Regions/Buckets. |
| **Configuration** | **Automatic** when you use the S3 Standard class. | **Manual** (requires a rule, destination bucket, and IAM role). |
