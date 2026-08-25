# AWS Glue

AWS Glue is a managed ETL service commonly used to move and transform data between data stores.

ETL stands for:
- E — Extract → get data from sources
- T — Transform → clean, filter, or modify the data
- L — Load → put the transformed data into a target system

### Job bookmarks

**Job bookmarks** in AWS Glue are designed to help maintain state information and prevent the reprocessing of old data. By utilizing job bookmarks, AWS Glue can effectively track the states of various elements of jobs, such as sources, transformations, and targets. This feature allows the ETL job to process only new or modified data when rerun on a scheduled interval, optimizing resources and processing time while maintaining data integrity.

<img width="2906" height="2020" alt="image" src="https://github.com/user-attachments/assets/cfd5d2e2-7830-4ce2-8ed7-f91fb3a42936" />

### AWS Glue crawler

An AWS Glue Crawler automatically discovers the structure (schema) of data and stores that metadata in the AWS Glue Data Catalog. For example, S3 data.

### AWS Glue Data Catalog

Glue Data Catalog as a "phone book" or "map" for your data. It doesn't store the actual data — it stores metadata about it.

### AWS Glue crawler + AWS Glue Data Catalog + S3 + Amazon Athena + QuickSight

```txt
S3 (raw sales data)
      ↓
AWS Glue Crawler  →  Glue Data Catalog (schema/metadata)
                              ↓
                       Amazon Athena (runs SQL query → produces results)
                              ↓
                    Amazon QuickSight (visualizes those results)
```
- Amazon S3 = Holds the actual data
- AWS Glue Crawler = Automatically scans the data in S3, detects its schema and format, and populates the Glue Data Catalog with the metadata
- Glue Data Catalog = Knows about the data (metadata)
- Amazon Athena = Queries the actual data in S3, using the metadata from Glue to understand it
- Amazon QuickSight = Visualizes the query results produced by Athena (charts, graphs, dashboards)
