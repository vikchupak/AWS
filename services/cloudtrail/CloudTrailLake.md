# CloudTrail Lake

**AWS CloudTrail and CloudTrail Lake are related, but they are not the same thing.**

> **CloudTrail = records AWS activity**
> **CloudTrail Lake = stores, processes, and analyzes that activity**

### CloudTrail Lake

**CloudTrail Lake** is an **analytics capability built around CloudTrail events**.

Instead of simply delivering logs to S3, CloudTrail Lake provides a managed environment where you can **store and query events using SQL**.

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
