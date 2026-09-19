# Amazon Elastic MapReduce (EMR)

Amazon EMR (Elastic MapReduce) is a managed big data platform that lets you run distributed data processing frameworks like
- Apache Spark
- Hadoop (MapReduce)
- Hive
- HBase
- Presto / Trino

---

Amazon EMR is a managed cluster platform that simplifies running big data frameworks, such as Apache Hadoop and Apache Spark, on AWS to process and analyze vast amounts of data. By using these frameworks and related open-source projects, such as Apache Hive and Apache Pig, you can process data for analytics purposes and business intelligence workloads. Additionally, you can use Amazon EMR to transform and move large amounts of data into and out of other AWS data stores and databases.

### Architecture

In Amazon EMR (Elastic MapReduce), a cluster comprises three main types of nodes, each serving a specific function:

- **Primary (Master) Node:** Manages the distribution of data and tasks among other nodes, monitors the health of the cluster, and communicates with external clients. It's responsible for orchestrating the processing of data across the cluster.
- **Core Nodes:** These nodes store data and execute tasks. They are crucial for both data storage in HDFS (Hadoop Distributed File System) and for processing tasks. There is only one core instance group or instance fleet per cluster, but there can be multiple nodes running on multiple Amazon EC2 instances in the instance group or instance fleet. With instance groups, you can add and remove Amazon EC2 instances while the cluster is running. You can also set up automatic scaling to add instances based on the value of a metric.
- **Task Nodes:** Task nodes are optional and dedicated solely to processing tasks. They do not store data. Task nodes can be added or removed from the cluster to increase the processing power as needed, making them a flexible resource for managing workload demands.

In Amazon EMR clusters, selecting the right instance type—Spot, On-Demand, or Instance Fleets—boils down to a trade-off between cost savings and the importance of uninterrupted operations. For primary and core nodes, where consistent availability is crucial to prevent data loss and ensure smooth processing, use On-Demand Instances. However, for task nodes, which handle additional processing without storing data, Spot Instances offer a cheaper option, albeit with the risk of interruptions. Instance Fleets provide flexibility, allowing you to mix instance types to optimize both performance and cost, tailoring your EMR cluster to meet specific operational needs efficiently.

<img width="1998" height="824" alt="image" src="https://github.com/user-attachments/assets/e932668f-306f-4d89-adfd-fddb80393ac2" />
