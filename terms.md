| Term         | Meaning              | Example              |
| ------------ | -------------------- | -------------------- |
| **Global**   | Not tied to a region | Amazon Route 53, IAM |
| **Regional** | Scoped to one region | ALB, EC2, RDS        |
| **Zonal**    | Tied to one AZ       | EBS volume           |

- Globally Resilient
  - A service remain functioning despite a region outage
- Regional Resilient
  - A service runs its resources in one region
  - A service remain functioning despite a AZ outage
- AZ resilient
  - If AZ fails, the service failes
