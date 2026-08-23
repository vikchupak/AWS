# AWS Glue

AWS Glue is a managed ETL service commonly used to move and transform data between data stores.

ETL stands for:
- E — Extract → get data from sources
- T — Transform → clean, filter, or modify the data
- L — Load → put the transformed data into a target system

**Job bookmarks** in AWS Glue are designed to help maintain state information and prevent the reprocessing of old data. By utilizing job bookmarks, AWS Glue can effectively track the states of various elements of jobs, such as sources, transformations, and targets. This feature allows the ETL job to process only new or modified data when rerun on a scheduled interval, optimizing resources and processing time while maintaining data integrity.

<img width="2906" height="2020" alt="image" src="https://github.com/user-attachments/assets/cfd5d2e2-7830-4ce2-8ed7-f91fb3a42936" />
