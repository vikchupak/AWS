# Amazon Redshift

- Amazon Redshift is SQL-based
- Amazon Redshift → relational / **SQL data warehouse**
  - Optimized for analytical queries (OLAP) on massive datasets, not for transactional workloads (OLTP) like a typical MySQL or PostgreSQL database
- Uses SQL to query data
- Based on PostgreSQL syntax, with Redshift-specific features
- Designed primarily for analytics (OLAP) over large datasets
- Data is stored in tables with rows and columns

---

- Amazon Redshift is a column based, petabyte scale, data warehousing product within AWS
- Server, not serverless
- Redshift cluster
  - Runs in one AZ in a VPC
  - Leader node
    - Accepts input query; breaks it into tiny pieces and gives a piece to every Compute Node to work on at the exact same time. Agragates retults.
  - Compute Nodes
    - Perform actual queries of data
  - Client communication happens via Leader Node, and it delegates actual work to Compute Nodes
- Redshift Spectrum
  - Allows you to query data sitting in Amazon S3 (a "Data Lake") without actually moving it into Redshift. It’s perfect for analyzing massive amounts of "cold" or raw historical data cheaply.
- Federated Query
  - Allows you to query data outside Redshift warehouse, sitting in other databases like Amazon RDS, Aurora or on-promises.

# Redshift vs postgreSQL

The key diff is how the databases **organize the data internally(how data physically stored on disk)** for storage and processing.

Suppose we have:

| id | name  | age | city  |
| -: | ----- | --: | ----- |
|  1 | Alice |  25 | Kyiv  |
|  2 | Bob   |  30 | Lviv  |
|  3 | John  |  40 | Odesa |

### PostgreSQL — row-oriented

Conceptually stored like:

```text
Row 1: 1, Alice, 25, Kyiv
Row 2: 2, Bob,   30, Lviv
Row 3: 3, John,  40, Odesa
```

So when you need **one complete record**, PostgreSQL is efficient.

```sql
SELECT *
FROM users
WHERE id = 1;
```

It can find the row and retrieve:

```text
1, Alice, 25, Kyiv
```

This is good for **OLTP** applications where you frequently:

* Insert a record
* Update a record
* Retrieve individual records
* Retrieve a small number of records

---

### Redshift — column-oriented

Conceptually stored like:

```text
id:    1, 2, 3
name:  Alice, Bob, John
age:   25, 30, 40
city:  Kyiv, Lviv, Odesa
```

Now imagine a huge table with **1 billion rows**, and you ask:

```sql
SELECT AVG(age)
FROM users;
```

Redshift only needs to read the **`age` column**:

```text
age: 25, 30, 40, ...
```

It doesn't need to read:

```text
id
name
city
...
```

That's a huge performance advantage for analytical queries.

### Why column storage is good for analytics

Analytics often looks like:

```sql
SELECT city, AVG(age), COUNT(*)
FROM users
GROUP BY city;
```

You might have a table with **100 columns**, but the query only needs 3:

```text
city
age
COUNT(*)
```

A columnar database can read primarily those columns.

It also enables **better compression** because values in the same column tend to have similar types/patterns:

```text
age: 25, 30, 40, 25, 31, 25, 40...
```

This can significantly reduce disk I/O.

### The trade-off

| Operation                    | Row-oriented PostgreSQL | Column-oriented Redshift |
| ---------------------------- | ----------------------- | ------------------------ |
| Get one user                 | 🟢 Excellent            | 🔴 Not ideal             |
| Insert one order             | 🟢 Excellent            | 🔴 Not ideal             |
| Update individual row        | 🟢 Excellent            | 🔴 Not ideal             |
| Scan millions of rows        | 🟡                      | 🟢 Excellent             |
| `SUM()`, `AVG()`, `GROUP BY` | 🟡                      | 🟢 Excellent             |
| Read only 2 of 100 columns   | 🟡                      | 🟢 Excellent             |

**In short:**

> **Row-oriented → optimize for retrieving/changing individual records.**
> **Column-oriented → optimize for scanning and aggregating huge amounts of data.**
