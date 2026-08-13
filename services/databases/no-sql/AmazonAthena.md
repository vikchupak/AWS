# Amazon Athena

- Serverless interactive Quering Service
- Query data from different files stored in S3
- Define tables and data is projected on the fly while quering
- Use SQL syntax to query data, including joins.
- No source data transforming/mutation
- Billing is based on the amount of data consumed while quering
- https://www.youtube.com/watch?v=K2GfrERtliU (tutorial)

---

Amazon Athena supports a wide variety of data formats like 
- CSV
- TSV
- JSON
- Textfiles
- Open-source columnar formats such as Apache ORC and Apache Parquet
- Compressed data in Snappy, Zlib, LZO, and GZIP formats

By compressing, partitioning, and using columnar formats you can improve performance and reduce your costs.

Athena charges you by the amount of data scanned per query. You can save on costs and get better performance if you partition the data, compress data, or convert it to columnar formats such as Apache Parquet.

<img width="750" height="119" alt="image" src="https://github.com/user-attachments/assets/683f27f1-6d7e-4f51-87dc-356e13f4bb41" />

Apache Parquet is an open-source columnar storage format that is 2x faster to unload and takes up 6x less storage in Amazon S3 as compared to other text formats.
