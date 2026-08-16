# Distributed cache

ElastiCache clusters running the Memcached engine supports **Auto Discovery** - the ability for client programs to automatically identify all of the nodes in a cache cluster, and to initiate and maintain connections to all of these nodes.

One distributed cache cluster spans multiple AZs, with one or more cache nodes in each AZ.

<img width="1497" height="711" alt="image" src="https://github.com/user-attachments/assets/0fe91f1b-9a5e-4e60-a0b0-bfef629f8d92" />

```txt
Region
│
├── AZ A
│   ├── EC2 A
│   └── Memcached Node A
│
└── AZ B
    ├── EC2 B
    └── Memcached Node B
```

The cache is logically one cluster, even though its nodes are physically distributed across AZs.

- EC2 A can access Node A or Node B.
- EC2 B can access Node A or Node B.
- The key determines which node stores the value.
- Auto Discovery lets clients discover the cluster's nodes.
- If a cache node fails, ElastiCache can replace it automatically.

Important caveat: Memcached distributes data; it doesn't replicate the same data to every AZ/node. So if Node A fails, data that was on Node A can be lost.

### Auto discovery

Suppose you start with:

```txt
Cache A
Cache B
```

The client discovers both.

Later AWS replaces a failed node:

```txt
Cache A
Cache B (failed)
Cache C (replacement)
```

Auto Discovery allows the client to learn about the new cluster topology instead of you having to hardcode/cache-manage the node endpoints.

# SQL distributed DB. Join table data cross nodes

There are **distributed SQL databases**, and some of them can perform queries—including joins—across data stored on different nodes.

Think of it like this:

```text
                Distributed SQL DB
                       │
          ┌────────────┼────────────┐
          │            │            │
       Node A        Node B       Node C
       AZ A          AZ B         AZ C
          │            │            │
       Users          Orders      Products
```

Suppose:

```sql
Users
user_id | name
--------+------
1       | John
2       | Alice
```

and the rows are distributed across nodes.

You can still run:

```sql
SELECT u.name, o.amount
FROM users u
JOIN orders o ON u.user_id = o.user_id;
```

The **distributed database engine coordinates the nodes**, fetches the necessary data, and performs the join—even if the relevant rows are on different nodes.

### Examples

* **Amazon Aurora DSQL** — distributed SQL database from AWS.
* **Google Cloud Spanner** — globally distributed relational database.
* **CockroachDB** — distributed SQL.
* **YugabyteDB** — distributed SQL.

**But there's an important performance consideration**

A local join:

```text
Node A:
Users + Orders
     ↓
    JOIN
```

is generally much faster than a cross-node join:

```text
Node A                 Node B
Users  ───────────────→ Orders
       network traffic
          ↓
        JOIN
```

Cross-node operations require **network communication**, so distributed SQL databases try to place related data together or optimize the query plan to minimize data movement.

This is fundamentally different from **Memcached**:

|                               | Memcached    | Distributed SQL   |
| ----------------------------- | ------------ | ----------------- |
| Data distributed across nodes | ✅            | ✅                 |
| Query language                | Key/value    | SQL               |
| Cross-node queries            | ❌            | ✅                 |
| JOIN                          | ❌            | ✅                 |
| Replication                   | Generally no | Usually yes       |
| Strong consistency            | ❌            | Usually available |
| Primary purpose               | Cache        | Database          |

**"Distributed" doesn't mean each node is isolated.** A distributed SQL database presents a unified database to you while internally distributing the data across nodes.

# Node vs shard

Node & shard are related, but **not the same concept**.

**Node** = a physical/virtual server running part of the database system.

**Shard** = a logical partition of the data.

### One node can have multiple shards

```text
Node A
├── Shard 1
├── Shard 4
└── Shard 7

Node B
├── Shard 2
├── Shard 5
└── Shard 8

Node C
├── Shard 3
├── Shard 6
└── Shard 9
```

And a shard may have **replicas** on multiple nodes:

```text
              Shard 1
             /       \
        Node A       Node B
       (replica)   (replica)
```

This gives you both **partitioning (sharding)** and **high availability/replication**.

### Good mental model

Think:

> **Node = where the data/process physically runs.**
> **Shard = how the data is logically divided.**

So when someone says **"the database has 10 nodes"**, they're talking about infrastructure.

When they say **"the database has 100 shards"**, they're talking about data partitioning.

And in a distributed SQL database, the database engine manages the relationship between the two.
