Below is a **clear, structured overview of major Amazon database services**, their purpose, and **parallels to familiar open-source / commercial DBs** like

- PostgreSQL
- MongoDB
- Redis
- Cassandra
- etc.

## ✅ 1) **Amazon RDS (Relational Database Service)** (SQL DB)

- **Provisioned**
- Supports **PostgreSQL, MySQL, MariaDB, Oracle, SQL Server** engines

### Parallels

| AWS            | Parallel   |
| -------------- | ---------- |
| RDS PostgreSQL | PostgreSQL |
| RDS MySQL      | MySQL      |
| RDS MariaDB    | MariaDB    |
| RDS Oracle     | Oracle     |
| RDS SQL Server | SQL Server |

📌 You use native engines – AWS just manages them.

---

## ✅ 2) **Amazon Aurora** (SQL DB). Part of the Amazon RDS family

- Has **both provisioned and serverless solutions**
- Aurora is a **custom AWS-BUILT database engine under the hood**, but it exposes **MySQL/Postgres/DSQL-compatible** on the surface. Faster & more scalable.

### Parallels

| AWS               | Parallel              |
| ----------------- | --------------------- |
| Aurora MySQL      | MySQL-compatible      |
| Aurora PostgreSQL | PostgreSQL-compatible |
| Aurora DSQL       | Google Spanner / CockroachDB |
| Aurora serverless v2 | MySQL & PostgreSQL-compatible |

Think: **PostgreSQL/MySQL → redesigned for cloud performance**

---

## ✅ 3) **Amazon DocumentDB**

- Has **both provisioned and serverless solutions**
- MongoDB-compatible document DB
- **BUT NOT MongoDB!**
  - Only API-compatible; underlying storage is Aurora-style

✔ JSON docs
✔ Mongo-style driver support

### Parallels

| AWS        | Parallel |
| ---------- | -------- |
| DocumentDB | MongoDB  |

> For Mongo-like workloads, but without MongoDB engine.

---

## ✅ 4) **Amazon DynamoDB**

- **Serverless**
- NoSQL key–value & document database

### Parallels

| AWS      | Parallel                                      |
| -------- | --------------------------------------------- |
| DynamoDB | Cassandra (in concepts), but unique |

> If you need massive scale + low latency → DynamoDB

---

## ✅ 5) **Amazon Keyspaces (managed Apache Cassandra)**

- **Serverless**
- Managed **Apache Cassandra–compatible** database.
- While it feels like Cassandra to a developer, it is built on a different underlying architecture than a traditional Cassandra cluster.

✔ Column-family
✔ Horizontal scaling

### Parallels

| AWS       | Parallel  |
| --------- | --------- |
| Keyspaces | Cassandra |

> If you used Cassandra and want managed version → Keyspaces.

---

## ✅ 6) **Amazon ElastiCache**

- Has **both provisioned and serverless solutions**
- **In-memory** cache service.
- Supports Redis, Memcached engines

### Parallels

| AWS                       | Parallel  |
| ------------------------- | --------- |
| ElastiCache for Redis     | Redis     |
| ElastiCache for Memcached | Memcached |

> Use when you need caching, not durable storage.

---

## ✅ 7) **Amazon MemoryDB**

- **Provisioned**
- Key-Value/Redis-compatible **durable/persistent**, in-memory database.

### Parallels

| AWS      | Parallel                     |
| -------- | ---------------------------- |
| MemoryDB | Redis / Key-Value (**but durable/persistent**) |

> Compared to ElastiCache:
> ElastiCache → cache
> MemoryDB → real primary DB

---

## ✅ 8) **Amazon Neptune**

Fully managed **graph database**.

✔ Supports: Property graph + RDF
✔ Used for graph traversal, relationships

### Parallels

| AWS     | Parallel                         |
| ------- | -------------------------------- |
| Neptune | Neo4j / Amazon RDF triple stores |

> Use for social graphs, knowledge graphs, fraud detection.

---

## ✅ 9) **Amazon Timestream**

Time-series database.

✔ Optimized for metrics
✔ Compression
✔ Queries by time window

### Parallels

| AWS        | Parallel               |
| ---------- | ---------------------- |
| Timestream | InfluxDB / TimescaleDB |

Use for:

* Metrics
* IoT
* Performance analytics

---

## ✅ 10) **Amazon Oracle Database@AWS (NOT part of RDS)**

Fully managed Oracle database. It is a new partnership between AWS and Oracle where Oracle runs its own database services inside AWS data centers.

- Oracle compatibility
- Good for legacy Oracle apps

### Parallels

| AWS           | Parallel |
| ------------- | -------- |
| Oracle DB@AWS | Oracle   |

> Mainly for enterprises locked into Oracle.

---

# ✅ Summary Table

| Service           | Type            | Best Parallel                    |
| ----------------- | --------------- | -------------------------------- |
| **RDS**           | Relational      | Postgres/MySQL/Oracle/SQL Server |
| **Aurora**        | Relational      | Postgres/MySQL (faster cloud)    |
| **Aurora DSQL**   | Distributed SQL | Spanner / CockroachDB            |
| **DynamoDB**      | NoSQL KV+Doc    | MongoDB / Cassandra-like         |
| **ElastiCache**   | Cache           | Redis / Memcached                |
| **MemoryDB**      | Durable Redis   | Redis/Valkey                     |
| **Neptune**       | Graph           | Neo4j                            |
| **DocumentDB**    | Document        | MongoDB                          |
| **Keyspaces**     | Column-family   | Cassandra                        |
| **Timestream**    | Time-series     | Timescale / InfluxDB             |
| **Oracle DB@AWS** | Relational      | Oracle                           |

---

# ✅ When to choose which?

| Use Case                       | Best                  |
| ------------------------------ | --------------------- |
| Traditional SQL app            | RDS / Aurora          |
| High-performance DB with SQL   | Aurora                |
| Global strongly consistent SQL | Aurora DSQL           |
| NoSQL with high scale          | DynamoDB              |
| Cache layer                    | ElastiCache           |
| Redis-like primary database    | MemoryDB              |
| Document store                 | DocumentDB / DynamoDB |
| Graph traversal                | Neptune               |
| Time-series metrics            | Timestream            |
| Cassandra workloads            | Keyspaces             |
| Oracle workloads               | Oracle@AWS            |

---

# 🔥 Quick Decision Tree

✅ Need relational?
→ Aurora > RDS

✅ Need NoSQL?
→ DynamoDB

✅ Need caching?
→ ElastiCache

✅ Need persistent Redis-like DB?
→ MemoryDB

✅ Need Mongo-like document DB?
→ DocumentDB or DynamoDB

✅ Need graph?
→ Neptune

✅ Need time series?
→ Timestream

✅ Cassandra workloads?
→ Keyspaces

✅ Oracle app?
→ Oracle DB@AWS
