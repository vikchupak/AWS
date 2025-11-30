Below is a **clear, structured overview of major Amazon database services**, their purpose, and **parallels to familiar open-source / commercial DBs** like

- PostgreSQL
- MongoDB
- Redis
- Cassandra
- etc.

## ✅ 1) **Amazon RDS (Relational Database Service)**

Supports **PostgreSQL, MySQL, MariaDB, Oracle, SQL Server** engines

### Parallels

| AWS            | Parallel   |
| -------------- | ---------- |
| RDS PostgreSQL | PostgreSQL |
| RDS MySQL      | MySQL      |
| RDS Oracle     | Oracle     |
| RDS SQL Server | SQL Server |

📌 You use native engines – AWS just manages them.

---

## ✅ 2) **Amazon Aurora**

Aurora is a **custom AWS-BUILT database engine under the hood**, but it exposes **MySQL/Postgres/DSQL-compatible** on the surface. Faster & more scalable.

### Parallels

| AWS               | Parallel              |
| ----------------- | --------------------- |
| Aurora MySQL      | MySQL-compatible      |
| Aurora PostgreSQL | PostgreSQL-compatible |
| Aurora DSQL       | Google Spanner / CockroachDB |

Think: **PostgreSQL/MySQL → redesigned for cloud performance**

---

## ✅ 3) **DynamoDB**

**Serverless** NoSQL key–value database.

### Parallels

| AWS      | Parallel                                      |
| -------- | --------------------------------------------- |
| DynamoDB | Cassandra (in concepts), but unique |

> If you need massive scale + low latency → DynamoDB

---

## ✅ 4) **Amazon ElastiCache**

**In-memory** cache service.

Supports: Redis, Memcached

### Parallels

| AWS                       | Parallel  |
| ------------------------- | --------- |
| ElastiCache for Redis     | Redis     |
| ElastiCache for Memcached | Memcached |

> Use when you need caching, not durable storage.

---

## ✅ 5) **Amazon MemoryDB**

Valkey/Redis-compatible **durable**, in-memory database.

### Parallels

| AWS      | Parallel                     |
| -------- | ---------------------------- |
| MemoryDB | Redis / Valkey (**but durable**) |

> Compared to ElastiCache:
> ElastiCache → cache
> MemoryDB → real primary DB

---

## ✅ 6) **Amazon Neptune**

Fully managed **graph database**.

✔ Supports: Property graph + RDF
✔ Used for graph traversal, relationships

### Parallels

| AWS     | Parallel                         |
| ------- | -------------------------------- |
| Neptune | Neo4j / Amazon RDF triple stores |

> Use for social graphs, knowledge graphs, fraud detection.

---

## ✅ 7) **Amazon DocumentDB**

MongoDB-compatible document DB.

**BUT NOT MongoDB!**
Only API-compatible; underlying storage is Aurora-style.

✔ JSON docs
✔ Mongo-style driver support

### Parallels

| AWS        | Parallel |
| ---------- | -------- |
| DocumentDB | MongoDB  |

> For Mongo-like workloads, but without MongoDB engine.

---

## ✅ 8) **Amazon Keyspaces (managed Cassandra)**

Managed **Apache Cassandra–compatible** database.

✔ Column-family
✔ Horizontal scaling

### Parallels

| AWS       | Parallel  |
| --------- | --------- |
| Keyspaces | Cassandra |

> If you used Cassandra and want managed version → Keyspaces.

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

## ✅ 10) **Amazon Oracle Database@AWS**

Fully managed Oracle database (on RDS or hosted Exadata-like environment).

✔ Oracle compatibility
✔ Good for legacy Oracle apps

### Parallels

| AWS           | Parallel |
| ------------- | -------- |
| Oracle DB@AWS | Oracle   |
| RDS Oracle    | Oracle   |

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
