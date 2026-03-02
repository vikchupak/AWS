# CloudWatch

- CloudWatch Logs is a service which can accept logging data, store it and monitor it.
- Can be used for:
  - ClodWatch logs
  - ClodWatch metrics
  - CloudWatch alarms
  - CloudWatch events (Legacy/deprecated - use EventBridge instead)
- CloudWatch Stream - Logs from the same source

<img width="1280" height="686" alt="image" src="https://github.com/user-attachments/assets/2551dc20-b507-4fc4-8803-61e20f23a2a4" />

# CloudWatch Monitiring

### EC2 Basic Monitoring vs Detailed Monitoring vs CloudWatch Agent

| Feature / Metric         | 🟢 EC2 Basic Monitoring                   | 🔵 EC2 Detailed Monitoring                         | ⚡ CloudWatch Agent                                           |
| ------------------------ | ----------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| **Official Name**        | Basic Monitoring                          | Detailed Monitoring                                | CloudWatch Agent                                             |
| **Default Enabled?**     | ✅ Yes                                     | ❌ No, must enable                                  | ❌ No, must install                                           |
| **Metric Frequency**     | 5 minutes                                 | 1 minute                                           | Configurable, 1s–60s                                         |
| **CPU Utilization**      | ✅                                         | ✅                                                  | ✅                                                            |
| **Network Metrics**      | ✅ (in/out)                                | ✅                                                  | ✅ (via custom metrics)                                       |
| **Disk I/O**             | ✅                                         | ✅                                                  | ✅ (can collect more detailed disk metrics)                   |
| **Status Checks**        | ✅                                         | ✅                                                  | ❌ (but can monitor OS health)                                |
| **Memory Usage**         | ❌                                         | ❌                                                  | ✅                                                            |
| **Disk Space Usage (%)** | ❌                                         | ❌                                                  | ✅                                                            |
| **Swap Usage**           | ❌                                         | ❌                                                  | ✅                                                            |
| **Per-process Metrics**  | ❌                                         | ❌                                                  | ✅                                                            |
| **OS-level Metrics**     | ❌                                         | ❌                                                  | ✅                                                            |
| **Custom Metrics**       | ❌                                         | ❌                                                  | ✅                                                            |
| **Application Logs**     | ❌                                         | ❌                                                  | ✅ (CloudWatch Logs)                                          |
| **Cost**                 | Free                                      | Extra cost                                         | Extra cost (per EC2 or per on-prem usage)                    |
| **Best Use Case**        | Basic monitoring / alarms for CPU/network | More granular EC2 metrics / scaling / short spikes | Full OS monitoring, disk %, memory, app logs, hybrid servers |

### RDS Default Metrics vs Enhanced Monitoring vs CloudWatch Agent

| Feature / Metric            | 🟢 RDS Default Metrics                  | 🔵 RDS Enhanced Monitoring                                                     | ⚡ CloudWatch Agent                                         |
| --------------------------- | --------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| **Official Name**           | RDS Metrics / Default Metrics           | Enhanced Monitoring                                                            | CloudWatch Agent                                           |
| **Default Enabled?**        | ✅ Yes                                   | ❌ No, must enable                                                              | ❌ No, must install                                         |
| **Metric Frequency**        | 1 minute (some engines)                 | 1 second – 60 seconds                                                          | Configurable, 1s–60s                                       |
| **Data Source**             | Hypervisor                              | OS-level (agent inside DB)                                                     | OS-level (agent on EC2 or on-prem)                         |
| **CPU Utilization**         | ✅ Aggregated at instance level          | ✅ Per-process CPU; threads nested under parent                                 | ✅ Per-process CPU (if monitoring EC2 host processes)       |
| **Memory Usage**            | ✅ FreeableMemory (aggregated)           | ✅ Detailed per-process memory                                                  | ✅ OS-level memory                                          |
| **Disk Usage / IOPS**       | ✅ Aggregated                            | ✅ OS-level, per-volume                                                         | ✅ OS-level, per-volume                                     |
| **Load Average**            | ❌                                       | ✅ OS-level                                                                     | ✅ (if monitoring OS)                                       |
| **Per-process CPU/Threads** | ❌                                       | ✅ Shows RDS child, RDS management, OS processes (top consumers only)           | ✅ (if monitoring EC2 host processes)                       |
| **Swap Usage**              | ❌                                       | ✅ OS-level                                                                     | ✅                                                          |
| **Database Connections**    | ✅                                       | ❌ (still only in default metrics)                                              | ❌                                                          |
| **Custom Metrics**          | ❌                                       | ❌                                                                              | ✅                                                          |
| **Application Logs**        | ❌                                       | ❌                                                                              | ✅ (CloudWatch Logs)                                        |
| **Process List**            | ❌                                       | ✅ RDS child / RDS processes / OS processes (max 100, top CPU/memory consumers) | ✅ (for EC2 host processes)                                 |
| **Requires IAM Role**       | ❌                                       | ✅                                                                              | ✅                                                          |
| **Extra Cost**              | ❌                                       | ✅                                                                              | ✅                                                          |
| **Best Use Case**           | Standard DB monitoring, alarms, scaling | Performance troubleshooting, OS-level visibility, identifying top processes    | Full OS metrics, logs, hybrid servers, EC2-based databases |

