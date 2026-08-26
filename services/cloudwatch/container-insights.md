# Amazon CloudWatch Container Insights

Monitors containerized workloads.

## CloudWatch Application Insights vs Container Insights

They are **two different features** of Amazon CloudWatch, each serving a different purpose.

## CloudWatch Application Insights

| Aspect | Details |
|---|---|
| **Purpose** | Monitors your **application stack** for performance issues and errors |
| **Target** | **.NET, Java, SQL Server, SAP** and other application workloads running on EC2 |
| **What it does** | Automatically detects application problems, analyzes logs/metrics, and surfaces insights |
| **Key Feature** | Uses **machine learning** to detect anomalies and identify root causes |
| **Output** | Dashboards showing **problems, insights, and related log patterns** |
| **Use Case** | *"My application is throwing errors — what's wrong?"* |

### CloudWatch Container Insights

| Aspect | Details |
|---|---|
| **Purpose** | Monitors **containerized workloads** specifically |
| **Target** | **Amazon ECS, Amazon EKS, Kubernetes on EC2, AWS Fargate** |
| **What it does** | Collects metrics and logs from containers, pods, tasks, and clusters |
| **Key Feature** | Provides **CPU, memory, disk, and network** metrics at the container/pod/cluster level |
| **Output** | Pre-built dashboards for **cluster, node, pod, task, and service** level metrics |
| **Use Case** | *"How is my ECS cluster or Kubernetes pod performing?"* |

### Side-by-Side Comparison

| Feature | Application Insights | Container Insights |
|---|---|---|
| **Focus** | Application-level monitoring | Container/cluster-level monitoring |
| **Target workload** | .NET, Java, SQL Server, SAP apps | ECS, EKS, Kubernetes, Fargate |
| **Uses ML** | ✅ Yes | ❌ No |
| **Log analysis** | ✅ Yes | ✅ Yes |
| **Metrics** | Application & infrastructure metrics | Container & cluster metrics |
| **Pre-built dashboards** | ✅ Yes (problem-focused) | ✅ Yes (performance-focused) |
| **Anomaly detection** | ✅ Automatic | ❌ Manual setup needed |

### Simple Way to Remember

- 🖥️ **Application Insights** → *"What's wrong with my application?"* → Focuses on **application health & errors**
- 🐳 **Container Insights** → *"How are my containers performing?"* → Focuses on **container & cluster metrics**

### Using Them Together

They can be used **together**.

For example:

```text
EKS Cluster
    │
    ├── Container Insights
    │      └── Cluster / node / pod performance
    │
    └── Application
           └── Application Insights
                  └── Application health / errors / problems
```
