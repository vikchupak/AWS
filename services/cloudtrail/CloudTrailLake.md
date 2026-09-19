# CloudTrail Lake

> CloudTrail Lake is no longer open to new customers starting May 31, 2026. AWS recommends Amazon CloudWatch as the alternative, which offers:
> - Native analytics powered by OpenSearch
> - 60+ AWS sources (vs. CloudTrail Lake's ~3 AWS sources)
> - Open access via Apache Iceberg APIs
> - Built-in OCSF and OpenTelemetry support

AWS CloudTrail and CloudTrail Lake are related, but they are not the same thing.

> - **CloudTrail = records AWS activity**
> - **CloudTrail Lake = stores, processes, and analyzes that activity**

### CloudTrail Lake

**CloudTrail Lake** is an **analytics capability built around CloudTrail events**.

AWS CloudTrail Lake lets you run SQL-based queries on your event logs in AWS CloudTrail. It provides a robust and efficient way to directly analyze CloudTrail logs. **CloudTrail Lake converts existing events in row-based JSON format to Apache ORC format**. ORC is a columnar storage format that is optimized for fast retrieval of data. Events are aggregated into event data stores, which are immutable collections of events based on criteria that you select by applying advanced event selectors.

Instead of simply delivering logs to S3, CloudTrail Lake provides a managed environment where you can **store and query events using SQL**.

<img width="1401" height="699" alt="image" src="https://github.com/user-attachments/assets/939ee985-8ea3-4415-a0b4-2e9234383b60" />

Conceptually:

```text
AWS activity
     ↓
CloudTrail
     ↓
CloudTrail Lake
     ↓
SQL queries / analysis
```

For example, you could query:

```sql
SELECT *
FROM ...
WHERE eventName = 'DeleteBucket'
```

and investigate:

> Who deleted an S3 bucket?

or:

> Show all failed API calls from a particular IP.

### The key difference

|                          | CloudTrail                  | CloudTrail Lake          |
| ------------------------ | --------------------------- | ------------------------ |
| Main purpose             | Record AWS activity         | Store & analyze activity |
| Records API events       | ✅                           | Uses CloudTrail events   |
| Store in S3              | ✅                           | Not the primary purpose  |
| SQL querying             | Limited/direct integrations | ✅                        |
| Analytics                | Basic                       | Advanced                 |
| Managed event data store | ❌                           | ✅                        |

Don't think of CloudTrail Lake as a completely separate logging service.

It's better to think:

```text
                 AWS CloudTrail
                       │
              records AWS activity
                       │
             ┌─────────┴─────────┐
             ↓                   ↓
         S3 bucket          CloudTrail Lake
       log storage          query/analysis
```

**CloudTrail Lake is essentially CloudTrail's managed event storage and analytics capability.**
