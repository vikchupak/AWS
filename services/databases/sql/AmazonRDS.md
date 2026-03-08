# Amazon RDS

- Primary. Writes/reads
- Standby. **No reads and no write instance**. Synchronous sync between Primary and Standby. Automatic Failover.
  - It is active and running, but not reachable/visible for users
- Replica. Reads only. Async sync between Primary and Replica

---

- **Amazon RDS (Single AZ)**
  - **Default**
  - **Fully managed by AWS database**
  - **Engines**
    - **Native PostgreSQL** [(Amazon RDS for PostgreSQL)](https://aws.amazon.com/rds/postgresql/)
    - **Native MySQL** [(Amazon RDS for MySQL)](https://www.amazonaws.cn/en/rds/mysql/)
    - **Native MariaDB** [(Amazon RDS for MariaDB)](https://aws.amazon.com/rds/mariadb/)
    - **Native Oracle** [(Amazon RDS for Oracle)](https://aws.amazon.com/rds/oracle/)
    - **Native Microsoft SQL Server** [(Amazon RDS for SQL Server)](https://aws.amazon.com/rds/sqlserver/)
  - One instanse
- **Amazon RDS Multi AZ**
  - 1 Standby instance in another AZ, but it is not reachable
  - For HA - stay available with minimal downtime in case of failover due to **Automatic Failover**
    - The canonical name record (CNAME) is switched from the primary to standby instance
    - Standby is promoted/switched from passive(standby) to active(primary) mode (about 60-120 sec)
  - Synchronous replication
- **Amazon RDS Multi-AZ Cluster**
  - Uses 1 primary + 2 replicas only
  - For Read Scalability + High Availability (HA) due to **AUTOMATIC Failover**
  - Uses
    - Cluster endpoint - points to primary instance
    - Reader endpoint - points to replicas
    - Instance endpoints - points to instances
  - Shared storage
  - AUTOMATIC Failover is faster than in **RDS - Multi AZ** because of shared storage
  - Each instance in different AZ
  - Supported MySQL, PostgreSQL only
  - Synchronous replication
  - Aurora like, but Aurora still better in all parameters. Aurora allows up to 15 replicas
- **Amazon RDS Read Replicas (RR)**
  - Adds up to 5 replicas for primary instance
  - For Read Scalability
  - Uses
    - Instance endpoint - points to specific replicas
    - No Reader endpoint
    - No Writer endpoint. Primary instance has an instance endpoint
  - Asynchronous replication
  - MANUAL FALOVER
  - Exists for both - Classic RDS and Aurora
  - Possible 3
    - Classic RDS - RR
      - 1 primary + async replicas
      - No Standby
    - Multi-AZ RDS + Read Replicas
      - 1 primary + **1 Standby** + async replicas
    - Multi-AZ Cluster RDS + Read Replicas
- **Amazon RDS Custom**
  - Designed for workloads that need **full OS-level and database-level customization**
    - So it is NOT fully managed by AWS database
  - **Supported engines**
    - **Oracle**
    - **Microsoft SQL Server**
- **Amazon Aurora (Provisioned)**. Or another name **Amazon Aurora (Provisioned) Cluster**
  - **Default**
  - **Any Aurora DB is always a cluster**
  - **Engines**
    - **Custom AWS-built PostgreSQL-compatible** [(Amazon Aurora PostgreSQL)](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.AuroraPostgreSQL.html)
    - **Custom AWS-built MySQL-compatible** [(Amazon Aurora MySQL)](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.AuroraMySQL.html)
  - Operates within **a single AWS Region**, **(Standard/Regional)**
  - Uses (all cluster type use these)
    - Cluster endpoint - points to primary instance
    - Reader endpoint - points to replicas
    - Instance endpoints - points to instances
  - 1 single-primary instance for writes + (up to 15) replica instances for reads
  - Uses shared cluster volume
  - Feels like synchronous replication, but the mechanism is different
- **Amazon Aurora DSQL**
  - Serverless distributed SQL database
  - **Engine**
    - **Custom AWS-built PostgreSQL-compatible** [(Amazon Aurora DSQL)](https://aws.amazon.com/rds/aurora/dsql/)
  - Aurora DSQL is closer in concept to Amazon DynamoDB (serverless scaling) than to traditional Amazon Aurora clusters
- **Amazon Aurora Global Database**
  - Provisioned
  - Only **one primary instance** in **a Primary Region** for **writes**
  - Up to 5 **Secondary Regions**
    - Each region has **up to 15 replicas for reads**
  - Replication inside Primary region is the same as in Aurora (Provisioned)
  - Replication between Primary and secondary regions is async
  - Add read replicas between (up to 5) regions
- **Amazon Aurora Multi-master**
  - DEPRICATED
  - Provisioned
  - Add 2 primary(write) nodes
- **Amazon Aurora serverless v2**
  - **Engines**
    - **MySQL**
    - **PostgreSQL**
  - Scales automatically
  - No need in managing instances by customer
  - Uses Aurora Capacity Units (ACU)
  - Uses (all cluster type use these)
    - Cluster endpoint - points to primary ACU instance
    - Reader endpoint - points to ACU replicas
    - Instance endpoints - points to specific ACU
      - Usually you don’t need it because the cluster and reader endpoints abstract scaling
      - Aurora Serverless v2 can automatically scale ACUs up/down, so instance endpoints may change dynamically
- **Amazon RDS proxy**
  - Proxy for RDS connection pool
  - Works with RDS and Aurora

# Aurora (Provisioned) vs Aurora Serverless v2 vs Aurora DSQL

| Feature            | Aurora (Provisioned) | Aurora Serverless v2 | Aurora DSQL |
| ------------------ | --------------- | -------------------- | ----------- |
| Instances          | ✅ yes           | ⚠️ abstracted        | ❌ none      |
| Capacity selection | ✅ instance type | ⚠️ ACU range         | ❌ none      |
| Fully serverless   | ❌               | ⚠️ partially         | ✅           |
| Distributed SQL    | ❌               | ❌                    | ✅           |
