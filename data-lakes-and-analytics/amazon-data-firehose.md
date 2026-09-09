# Amazon Data Firehose

**Amazon Data Firehose (formerly known as Amazon Kinesis Data Firehose)** is a fully managed, serverless streaming data pipeline service. It captures, optionally transforms, and delivers streaming data to destinations — automatically, at scale, with no infrastructure to manage.

<img width="1816" height="849" alt="image" src="https://github.com/user-attachments/assets/18b89432-8208-47cb-a163-145a23b1f9d5" />

> **The key idea:** You point data at it, tell it where to deliver, and it handles everything in between.

## Core Concepts

```text
Data Producer
     │
     │ sends records continuously
     ▼
┌─────────────────────────────────────────────┐
│              Firehose Stream                │
│                                             │
│  1. INGEST    ──► receives incoming data    │
│                                             │
│  2. BUFFER    ──► accumulates data until    │
│                    buffer size or time met  │
│                                             │
│  3. TRANSFORM ──► optional Lambda function  │
│                    to modify/enrich data    │
│                                             │
│  4. CONVERT   ──► optional format conversion│
│                    (JSON → Parquet/ORC)     │
│                                             │
│  5. DELIVER   ──► sends batch to destination│
└─────────────────────────────────────────────┘
     │
     ▼
Destination
(S3, Redshift, OpenSearch, Splunk, etc.)
```

## Key Characteristics

| **Characteristic** | **Detail** |
| --- | --- |
| **Fully managed** | No servers, clusters, or infrastructure to provision or manage |
| **Serverless** | Automatically scales based on data volume |
| **Near real-time** | Delivers data within seconds; it buffers records first |
| **At-least-once delivery** | Data is guaranteed to be delivered, but duplicates are possible |
| **Pay per use** | Billed based on data volume ingested |

## Data Sources — Where Data Comes From

```text
┌─────────────────────────────────────────────────────┐
│                  DATA SOURCES                       │
│                                                     │
│  • Direct PUT (applications via SDK/API)            │
│  • Amazon Kinesis Data Streams                      │
│  • Amazon MSK (Managed Streaming for Kafka)         │
│  • Amazon CloudWatch Logs                           │
│  • AWS IoT                                          │
│  • Amazon EventBridge                               │
│  • Kinesis Agent (installed on servers)             │
└─────────────────────────────────────────────────────┘
```

## Destinations — Where Data Goes

```text
┌──────────────────────────────────────────────────────────┐
│                    DESTINATIONS                          │
│                                                          │
│  AWS Native:                                             │
│  ├─► Amazon S3              (data lake storage)          │
│  ├─► Amazon Redshift        (data warehouse)             │
│  ├─► Amazon OpenSearch      (search & analytics)         │
│  └─► Apache Iceberg Tables  (open table format on S3)    │
│                                                          │
│  Third-Party:                                            │
│  ├─► Splunk                 (log analytics)              │
│  ├─► Datadog                (monitoring)                 │
│  ├─► New Relic              (observability)              │
│  ├─► Dynatrace              (APM)                        │
│  ├─► MongoDB                (NoSQL database)             │
│  ├─► Snowflake              (cloud data warehouse)       │
│  └─► Coralogix / Elastic    (log management)            │
│                                                          │
│  Custom:                                                 │
│  └─► HTTP endpoint          (your own API)               │
└──────────────────────────────────────────────────────────┘
```

## Buffering — How Near Real-Time Works

Firehose does **not** deliver records one by one. It buffers data first, then delivers it in batches.

You configure two possible triggers:

```text
Buffer Size
     │
     └──► Deliver when buffer reaches X MB
          (1–128 MB)

Buffer Interval
     │
     └──► Deliver when X seconds have passed
          (60–900 seconds)

             Whichever happens FIRST
                       │
                       ▼
                  DELIVERY
```

This is why Firehose provides **near real-time** delivery rather than true real-time streaming — there is a buffering delay.

## Optional Transformation with AWS Lambda

Before delivery, Firehose can invoke a Lambda function to transform each record:

```text
Raw Record
    │
    ▼
┌──────────────┐
│ AWS Lambda   │
│ Transformation│
└──────┬───────┘
       │
       ▼
Transformed Record
       │
       ▼
Destination
```

Examples:

- Parse and enrich log lines
- Filter unwanted records
- Convert formats (CSV → JSON)
- Mask sensitive fields
- Add timestamps or metadata

## Optional Format Conversion

Firehose can automatically convert data before writing to S3:

```text
JSON ──► Apache Parquet
             │
             └──► Columnar format
                  Optimized for Athena /
                  Redshift Spectrum


JSON ──► Apache ORC
             │
             └──► Columnar format
                  Optimized for Hive / EMR
```

This can reduce storage costs and improve query performance.

## Delivery to Amazon Redshift — Special Case

Redshift delivery has an extra step because Firehose uses S3 as intermediate staging:

```text
Firehose
   │
   ▼
S3 (intermediate staging)
   │
   ▼
COPY command
   │
   ▼
Redshift Table
```

## Common Use Cases

| **Use Case** | **How Firehose Helps** |
| --- | --- |
| **Log ingestion** | Collect application/server logs → S3 or OpenSearch |
| **Clickstream analytics** | Stream web/app events → S3 → query with Athena |
| **IoT data collection** | Ingest sensor data → S3 or Redshift |
| **Security monitoring** | Stream CloudWatch/VPC Flow Logs → Splunk/OpenSearch |
| **Real-time dashboards** | Stream metrics → OpenSearch → dashboards |
| **Data lake ingestion** | Continuously load streaming data into S3 as Parquet |

## How It Compares to Related Services

| **Service** | **Purpose** |
| --- | --- |
| **Kinesis Data Streams** | Real-time stream processing; custom consumers; low latency; you manage consumers |
| **Data Firehose** | Managed delivery pipeline; near real-time; no consumer code required |
| **Amazon MSK (Kafka)** | Full Apache Kafka; complex event streaming; manage topics and consumers |
| **AWS Glue** | Batch ETL; large periodic data transformation jobs |

## Summary

> **Amazon Data Firehose is the simplest way to continuously collect streaming data, optionally transform it, and reliably deliver it to storage or analytics destinations — fully managed, with no infrastructure to manage.**
> 
