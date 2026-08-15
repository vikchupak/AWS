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

# Sharding

Amazon Kinesis Data Streams supports resharding, which lets you adjust the number of shards in your stream to adapt to changes in the rate of data flow through the stream. Resharding is considered an advanced operation.

<img width="1005" height="470" alt="image" src="https://github.com/user-attachments/assets/3c3d9426-9df7-4fad-8cff-b5de2d1bce78" />

There are two types of resharding operations: shard split and shard merge.

- In a shard split, you divide a single shard into two shards.
- In a shard merge, you combine two shards into a single shard.
- Resharding is always pairwise in the sense that you cannot split into more than two shards in a single operation, and you cannot merge more than two shards in a single operation.
- The shard or pair of shards that the resharding operation acts on are referred to as parent shards. The shard or pair of shards that result from the resharding operation are referred to as child shards.

Splitting increases the number of shards in your stream and therefore increases the data capacity of the stream. Because you are charged on a per-shard basis, splitting increases the cost of your stream. Similarly, merging reduces the number of shards in your stream and therefore decreases the data capacity—and cost—of the stream.

If your data rate increases, you can also increase the number of shards allocated to your stream to maintain the application performance. You can reshard your stream using the `UpdateShardCount` API. **The throughput of an Amazon Kinesis data stream is designed to scale without limits via increasing the number of shards within a data stream.**
