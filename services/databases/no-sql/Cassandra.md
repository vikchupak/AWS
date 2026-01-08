# Cassandra

- https://www.youtube.com/watch?v=TD3-INhm60Q (key concepts)

---

- Wide-column data store/model
- **Schemaful**. We define columns at table level
- Doesn't support storing documents (nested JSONs) for efficient search

<img width="763" height="575" alt="image" src="https://github.com/user-attachments/assets/b01eb742-d023-457f-9edc-0a112694205c" />

<img width="590" height="481" alt="image" src="https://github.com/user-attachments/assets/49c62bbd-4b16-4935-a103-1b7251496e40" />

# Amazon DynamoDB vs. Amazon Keyspaces (for Apache Cassandra)

Here’s a clear comparison of **Amazon DynamoDB vs. Amazon Keyspaces (for Apache Cassandra)** — when to use which, strengths, limits, and costs.

---

# ✅ **High-level summary**

| Feature                  | **DynamoDB**                           | **Amazon Keyspaces (Cassandra)**   |
| ------------------------ | -------------------------------------- | ---------------------------------- |
| Type                     | AWS-native NoSQL                       | Managed Apache Cassandra           |
| API                      | DynamoDB API                           | Cassandra CQL                      |
| Data model               | Key–value + document                   | Wide-column                        |
| Partition key changeable | No                                     | No                                 |
| Schema                   | Flexible                               | Requires schema (CQL tables)       |
| Secondary indexes        | GSI, LSI                               | Secondary indexes limited          |
| Transactions             | ✅ Yes                                  | ❌ No                               |
| Multi-region             | ✅ Global Tables                        | ✅ Via Cassandra features (limited) |
| Capacity mode            | On-demand + provisioned                | On-demand + provisioned            |
| Pricing                  | RCU/WCU per table                      | Read/Write per table               |
| Migration                | Uses DynamoDB API only                 | Compatible with Cassandra drivers  |
| Best for                 | Pure AWS, serverless, JSON, high scale | Cassandra workloads / CQL apps     |

**Rule of thumb:**

> If you’re building *new on AWS → DynamoDB*
> If you’re migrating existing *Cassandra workloads → Keyspaces*

---

# ✅ **Conceptual model differences**

## **DynamoDB**

* Key–value store with document support
* No schema enforcement
* Each item can have different attributes
* Nested JSON allowed

✅ Flexible
✅ JSON friendly
❌ Must use DynamoDB API/SDK

---

## **Keyspaces (for Cassandra)**

* Wide-column store
* Uses CQL (SQL-like)
* Schema required (fixed columns)
* No native JSON nesting (must serialize JSON manually)

✅ CQL = easy for SQL-style developers
✅ Cassandra client compatibility
❌ Rigid schema compared to DynamoDB document flexibility

---

# ✅ **Performance & scaling**

| Aspect             | DynamoDB               | Keyspaces                             |
| ------------------ | ---------------------- | ------------------------------------- |
| Scaling            | Fully automatic        | Fully automatic                       |
| Latency            | Single-digit ms        | Single-digit ms                       |
| Hot partitions     | Possible               | Possible                              |
| Global replication | DynamoDB Global Tables | Only via Cassandra, not fully managed |
| TTL support        | ✅ Yes                  | ✅ Yes                                 |

---

# ✅ **Indexes**

| Type              | DynamoDB                  | Keyspaces                      |
| ----------------- | ------------------------- | ------------------------------ |
| Primary key       | PK (+ optional sort key)  | Partition key + clustering key |
| Secondary Indexes | GSI + LSI                 | Limited secondary indexes      |
| Query flexibility | Limited, but OK with GSIs | Better structure via CQL       |

Keyspaces indexing is more restrictive → must model carefully.

---

# ✅ **Transactions**

| Feature           | DynamoDB | Keyspaces |
| ----------------- | -------- | --------- |
| ACID transactions | ✅ Yes    | ❌ No      |

If you need cross-item transactions → DynamoDB only.

---

# ✅ **Integrations**

| Integration     | DynamoDB | Keyspaces |
| --------------- | -------- | --------- |
| Streams         | ✅ Yes    | ❌ No      |
| Lambda triggers | ✅ Yes    | ❌ No      |
| DAX cache       | ✅ Yes    | ❌ No      |

DynamoDB integrates more deeply with other AWS services.

---

# ✅ **Query Language**

| DynamoDB             | Keyspaces      |
| -------------------- | -------------- |
| API / Document style | CQL / SQL-like |
| Example:             |                |

```js
getItem(...)
query(...)
```

vs

```cql
SELECT * FROM users WHERE id='1';
```

If you prefer query language → Keyspaces feels more familiar.

---

# ✅ Pricing comparison

Both use RCU/WCU.

| Cost         | DynamoDB      | Keyspaces               |
| ------------ | ------------- | ----------------------- |
| Storage      | Cheaper       | Slightly more expensive |
| Reads/Writes | Similar model | Similar model           |
| Auto scaling | Yes           | Yes                     |

Keyspaces often ends up slightly more expensive.

---

# ✅ When to choose **DynamoDB**

✅ Best choice when:

* Fully serverless AWS design
* Need JSON / document storage
* Need DynamoDB Streams
* Need transactions
* Need Global Tables
* You want flexible schema
* New project on AWS

Not ideal if:

* You need CQL
* You want self-managed portability

---

# ✅ When to choose **Keyspaces**

✅ Best when:

* You are migrating an existing Apache Cassandra workload
* You want to continue using CQL
* You already use Cassandra drivers
* Your team understands Cassandra data modeling

Not ideal if:

* You need AWS deep integrations
* Want document storage
* Want transactions

---

# ✅ Data Modeling Example

### DynamoDB:

```json
{
  "pk": "USER#1",
  "sk": "PROFILE",
  "name": "Bob",
  "address": { "city": "Berlin" }
}
```

Flexible JSON attributes, no schema.

---

### Keyspaces (Cassandra):

```cql
CREATE TABLE users (
  id uuid PRIMARY KEY,
  name text,
  city text
);
```

Structured, fixed columns; must serialize nested JSON.

---

# ✅ Migration

| Migration direction   | Difficulty            |
| --------------------- | --------------------- |
| Cassandra → Keyspaces | ✅ Easy                |
| Cassandra → DynamoDB  | Hard (need redesign)  |
| DynamoDB → Keyspaces  | Hard (schema rewrite) |

---

# ✅ Which is newer?

* DynamoDB: 2012
* Keyspaces: Announced 2020

So DynamoDB is more mature & heavily integrated.

---

# ✅ Final recommendation

### If building new on AWS → **DynamoDB**

Most AWS-native, highest flexibility, full integrations, better ecosystem.

### If migrating Cassandra or want CQL → **Keyspaces**

---

# ✅ TL;DR

| Choose        | When                                                                   |
| ------------- | ---------------------------------------------------------------------- |
| **DynamoDB**  | Serverless AWS apps, JSON data, high scale, need transactions + events |
| **Keyspaces** | Keeping Cassandra + CQL compatibility, minimal rewrite                 |

If you tell me your use case (schema, expected queries, workload), I can recommend which one fits better.
