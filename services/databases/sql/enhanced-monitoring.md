# Amazon RDS Enhanced Monitoring

- See also [this](https://github.com/vikchupak/AWS/blob/main/services/cloudwatch/CloudWatch.md#rds-default-metrics-vs-enhanced-monitoring-vs-cloudwatch-agent)

Amazon RDS offers a powerful feature known as Enhanced Monitoring, which provides detailed metrics in real-time about the operating system (OS) underlying your database instances. This feature allows users to monitor performance at a granular level through the AWS Management Console or by accessing the Enhanced Monitoring JSON output via CloudWatch Logs. By default, these metrics are retained in CloudWatch Logs for 30 days, but this retention period can be adjusted by modifying the retention settings for the RDSOSMetrics log group in CloudWatch.

<img width="1582" height="883" alt="image" src="https://github.com/user-attachments/assets/ad8e3dd6-5aa0-47ff-8f1a-17b0deddb17d" />

Enhanced Monitoring differs from standard CloudWatch metrics in that it gathers data directly from an agent installed on the instance, rather than from the hypervisor, which is used by CloudWatch. This distinction can lead to slight variations between the two sets of metrics. For instance, CloudWatch provides CPU utilization metrics based on the hypervisor’s view, while Enhanced Monitoring captures detailed insights from the instance itself, offering a more accurate representation of resource usage at the OS level.

This feature is particularly beneficial for users who need in-depth visibility into how individual processes or threads on a DB instance utilize CPU resources. The differences in metric data may become more pronounced when using smaller instance classes, as multiple virtual machines are often managed by the same hypervisor, affecting the accuracy of hypervisor-based metrics.
