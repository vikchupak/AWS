# EKS Monitoring & Observability (logging) — Comparison

| Solution                                                              | Main purpose                               | Metrics |     Application logs | Dashboard             | Operational overhead | Best fit                                            |
| --------------------------------------------------------------------- | ------------------------------------------ | ------: | -------------------: | --------------------- | -------------------- | --------------------------------------------------- |
| **☁️ CloudWatch Container Insights + CloudWatch Dashboard**           | Managed container monitoring               |       ✅ |                    ✅ | CloudWatch dashboards | 🟢 **Lowest**        | **ECS/EKS container monitoring with minimal setup** |
| **📊 Amazon Managed Service for Prometheus + Amazon Managed Grafana** | Prometheus metrics + Grafana visualization |       ✅ | ⚠️ Primarily metrics | Grafana               | 🟡 Medium            | Prometheus/Grafana ecosystem and advanced metrics   |
| **⚙️ CloudWatch Agent + CloudWatch Dashboard**                        | Custom metrics/log collection              |       ✅ |                    ✅ | CloudWatch dashboards | 🟡 Medium            | When you need **custom collection/configuration**   |
| **🔎 Amazon OpenSearch Service + OpenSearch Dashboards**              | Log analytics + search + visualization     |       ✅ |                    ✅ | OpenSearch Dashboards | 🔴 **Highest**       | Advanced **log search/analytics**                   |

<img width="2704" height="1966" alt="image" src="https://github.com/user-attachments/assets/f6c89155-e95d-4b0d-bb9a-1ba00490ffb2" />
