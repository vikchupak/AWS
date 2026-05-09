| Service                           | Instance visibility in console UI | Scaling type                  | Writes                 | Cluster placement |
| --------------------------------- | ------------------- | ----------------------------- | ---------------------- | --- |
| Amazon RDS                    | visible             | 1 writer, only manual horizontal/vertical scaling of read replicas              | single writer         | single region |
| Amazon Aurora (provisioned) cluster | visible             | 1 writer, no default horizontal autoscaling of read replicas. Can be configured using Application Auto scaling policy | single writer          | single region |
| Amazon Aurora Serverless v2   | visible             | 1 writer, vertical autoscaling of read replicas         | single writer        | single region |
| Amazon Aurora Global Database | visible             | 1 writter in primary region, horizontal autoscaling of read replicas across primary/secondary regions | single writer  | multi-region | 
| Amazon Aurora DSQL | not visible | Fully serverless distributed SQL, all nodes can handle reads/writes with coordinated transactions, AWS scales compute **invisibly** | no single writer; any node can accept writes with distributed coordination | multi-region |
