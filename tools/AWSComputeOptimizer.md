# AWS Compute Optimizer

- Free for all accounts

AWS Compute Optimizer recommends optimal AWS resources for your workloads to reduce costs and improve performance by using machine learning to analyze historical utilization metrics. Overprovisioning resources can lead to unnecessary infrastructure costs, and underprovisioning resources can lead to poor application performance. Compute Optimizer generates recommendations for the following resources:

- EC2 instances
- EC2 Auto Scaling groups
- EBS volumes
- Lambda functions

Uses deep (Machine Learning) **ML-powered** analysis.

You must opt-in to have Compute Optimizer analyze your AWS resources. The service supports standalone AWS accounts, member accounts of an organization, and the management account of an organization. After you opt-in, Compute Optimizer begins analyzing the specifications and the utilization metrics of your resources from Amazon CloudWatch for the last 14 days.  For example, for Amazon EC2 instances, Compute Optimizer analyzes the vCPUs, memory, storage, and other specifications.

<img width="943" height="569" alt="image" src="https://github.com/user-attachments/assets/cecfda75-1d17-4576-95fb-292758d9adb0" />

<img width="1552" height="330" alt="image" src="https://github.com/user-attachments/assets/469c7880-06d3-43d3-a909-4863cc80afbe" />
