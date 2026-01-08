# Amazon Redshift

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
