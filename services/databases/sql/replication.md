### Amazon RDS (Standard Relational Database Service)

Most standard RDS engines support **cross-region** read replicas, but they rely on native logical/transaction-log 
replication. Because all standard RDS engines use database-level engine replication (like binlogs for MySQL), they suffer from higher replica lag across regions when handling intensive or highly dynamic write workloads.

### Amazon Aurora

Amazon Aurora handles cross-region replication via two entirely distinct methods: Cross-Region Read Replicas (native engine replication) and Aurora Global Databases (storage-level replication).

- Aurora MySQL-Compatible: Supports both native Cross-Region Replicas (which use binlogs) and Aurora Global Databases (which use high-performance storage-level replication).
- Aurora PostgreSQL-Compatible: Does NOT support standard Cross-Region Replicas using the native engine replication. Instead, for cross-region replication with Aurora PostgreSQL, you must use Aurora Global Databases.

<img width="1652" height="708" alt="image" src="https://github.com/user-attachments/assets/2f11dc77-9e3d-45a0-aa84-a8042c7794d2" />
