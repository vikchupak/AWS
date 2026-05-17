Prerequisites
- Process data and store results in JSON format to an S3 bucket
- Run sophisticated Big Data analytics on your data without moving them into a separate analytics system

Answer
- Amazon Athena, Amazon Redshift Spectrum, AWS Glue

| Service           | Role                                |
| ----------------- | ----------------------------------- |
| Glue              | Prepare + transform + catalog data  |
| Athena            | Query data directly                 |
| Redshift Spectrum | Query S3 via Redshift               |
