| Term         | Meaning              | Example              |
| ------------ | -------------------- | -------------------- |
| **Global**   | Not tied to a region | Amazon Route 53, IAM |
| **Regional** | Scoped to one region | ALB, EC2, RDS        |
| **Zonal**    | Tied to one AZ       | EBS volume           |

- Globally Resilient
  - A service remain functioning despite a region outage
- Regional Resilient
  - A service operates in one region
  - A service remain functioning despite a AZ outage
- AZ resilient
  - A service operates in one AZ
  - If AZ fails, the service failes

See [11:55](https://learn.cantrill.io/courses/1820301/lectures/41301618)
