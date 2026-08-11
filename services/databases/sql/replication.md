### Amazon RDS (Standard Relational Database Service)

Most standard RDS engines support **cross-region** read replicas, but they rely on native logical/transaction-log 
replication. Because all standard RDS engines use database-level engine replication (like binlogs for MySQL), they suffer from higher replica lag across regions when handling intensive or highly dynamic write workloads.

### Amazon Aurora

Amazon Aurora handles **cross-region** replication via two entirely distinct methods: Cross-Region Read Replicas (native engine replication) and Aurora Global Databases (storage-level replication).

- **Aurora MySQL-Compatible**: Supports both native Cross-Region Replicas (which use binlogs) and Aurora Global Databases (which use high-performance storage-level replication).
- **Aurora PostgreSQL-Compatible**: Does NOT support standard Cross-Region Replicas using the native engine replication. Instead, for cross-region replication with Aurora PostgreSQL, you must use Aurora Global Databases.

<img width="1652" height="708" alt="image" src="https://github.com/user-attachments/assets/2f11dc77-9e3d-45a0-aa84-a8042c7794d2" />

### How Replication Degrades Read Performance (The Trade-offs)

While replicas give you more places to send read queries, the act of replicating data can actively slow those queries down depending on the architecture.

**A. Resource Contention (The Standard RDS Bottleneck)**

In standard RDS (MySQL, PostgreSQL, SQL Server), the replica is an independent, fully functioning database instance.

- **The Problem**: When the Primary sends database logs (like binlogs) to the replica, the replica's database engine has to parse and execute those changes to update its local storage.

- **The Impact on Reads**: If your primary database is executing massive write workloads, the replica's CPU, memory, and I/O will be heavily consumed just trying to apply those writes. If a user executes a heavy read query at the same time, it has to fight the replication process for hardware resources, resulting in notable query slowdowns.

**B. Replication Lag (Data Stale/Inconsistency)**

Replication lag is the delay between a write happening on the Primary and it appearing on the Replica.

- **The Impact on Reads**: If your replication lag is high (e.g., 5 seconds), a user might update their profile on your website (Primary), hit refresh, and read from the replica—only to see their old data. To fix this, developers often have to write complex routing logic to force "critical reads" back to the Primary, which reduces the performance benefits of having a replica in the first place.
