# Amazon Kinesis

- [Doc](https://aws.amazon.com/kinesis/)
- Public **real-time** streaming service
  - The stream ingests data (1MB/s)
  - Consumers consume data from the stream (2MB/s)
  - Data is stored in Kinesis Data Records (1MB)
- **Producers** send data to kinesis stream
- Streams store 24-hour moving window of data
  - Can be extended to 365 days
- **Multiple consumers** access/read the data from that moving window

# Amazon Data Firehose (Old name Amazon Kinesis Data Firehose)

- [Doc](https://aws.amazon.com/firehose/)
- Persist data from different sources (including kinesis steams) to
  - S3, HTTP, Elasticsearch, Redshift
  - **Near** real-time delivery
- Firehose is a standalone delivery service that can take data from many places
  - While it can read from Kinesis Data Streams, it is no longer strictly tied to the Kinesis family
- Lambda can be used to transform data before saving to destination
- Data can be backuped to S3 before saving to the destination

# Amazon Kinesis Data Analytics for SQL

- [Doc](https://aws.amazon.com/kinesis/data-analytics-for-sql/)
- **Real-time** data processing
  - Process and analyze streaming data using standard SQL
- Ingests from Amazon kinesis data streams or Amazon Data Firehoses
- Send data to destinations
  - Near real-time when sending to Firehoses
  - Real-time when sending to Lambda or kinesis data streams

```txt
source streams -> Kinesis Analytics -> destination streams -> consumers
```

# Amazon Kinesis Video Streams

- [Doc](https://aws.amazon.com/kinesis/video-streams/)
- Ingest live video data from producers
- Consumers can access the data `frame-by-frame`
- Integrates with other AWS services as Rekognition and Connect
