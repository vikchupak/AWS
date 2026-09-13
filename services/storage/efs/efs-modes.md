## Modes

### Performance modes

- **General Purpose mode (Default)**
  - Designed for latency-sensitive applications (e.g., web servers, content management systems, developer tools)
  - Provides the lowest per-operation latency
  - Recommended by AWS for almost all workloads **unless high IOPS parallel scaling is required**
- **Max I/O mode**
  - Designed for **highly parallelized** workloads (e.g., big data, media processing, AI/ML training)
  - Trades higher per-operation latency for higher aggregate throughput and IOPS limits

You choose a file system’s performance mode when you create it, and it cannot be changed. The two performance modes have no additional costs, so your Amazon EFS file system is billed and metered the same, regardless of your performance mode.

### Throughput modes

- Elastic Throughput (Default)
  - Automatically scales up or down based on your workload's activity
- Bursting Throughput
  - Throughput scales dynamically based on the total amount of data stored in EFS
  - Allows short periods of higher throughput by consuming accumulated "burst credits"
- Provisioned Throughput
  - You manually specify a fixed amount of dedicated throughput (in MiB/s) regardless of file storage size

With Bursting Throughput mode, a file system’s throughput scales as the amount of data stored in the EFS Standard or One Zone storage class grows. File-based workloads are typically spiky, driving high levels of throughput for short periods of time, and low levels of throughput the rest of the time. To accommodate this, Amazon EFS is designed to burst to high throughput levels for periods of time.

Provisioned Throughput mode is available for applications with high throughput to storage (MiB/s per TiB) ratios, or with requirements greater than those allowed by the Bursting Throughput mode. For example, say you’re using Amazon EFS for development tools, web serving, or content management applications where the amount of data in your file system is low relative to throughput demands. Your file system can now get the high levels of throughput your applications require without having to pad your file system.
