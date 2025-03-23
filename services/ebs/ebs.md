- ELB (Elastic Load Balancing)
  - Elastic Load Balancer (ELB) is a general term used by AWS to refer to their suite of load balancing services
  - **ELB is created within VPC and spans multiple AZs/subnets**
  - https://aws.amazon.com/elasticloadbalancing/getting-started/?nc=sn&loc=4
  
## Application Load Balancer (ALB) vs Network Load Balancer (NLB)

- ALB works at 7 OSI layer **(Host based routing)**
- NLB works at 4 OSI layer **(IP based routing)**

### **Comparison: ALB vs. NLB vs. CLB**
| Feature               | ALB (Layer 7) | NLB (Layer 4) | CLB (Classic Load Balancer, Legacy) |
|-----------------------|--------------|--------------|-------------|
| Protocols            | HTTP, HTTPS  | TCP, TLS, UDP | HTTP, HTTPS, TCP |
| Routing Type         | Path, Host, Headers | IP & Port-based | Basic |
| SSL Termination      | Yes          | No (Pass-through) | Yes |
| WebSockets Support   | Yes          | No          | No |
| Sticky Sessions      | Yes (via Cookies) | Yes (via Source IP) | Yes |
| Best For            | Web Apps, APIs | Low-latency TCP/UDP apps | Legacy apps |

## Target group

**Target Group** can span multiple subnets, both **public** and **private**, but **there are some important considerations** to keep in mind:

### **Key Points to Understand:**

1. **Target Group Definition:**
   - A **Target Group** is a collection of targets (such as EC2 instances, IP addresses, or Lambda functions) that the load balancer routes traffic to.
   - Targets within a target group can reside in **different subnets**, but these subnets must be within the **same VPC**.

2. **Public and Private Subnets:**
   - You can register targets (e.g., EC2 instances) that are in both **public** and **private** subnets within the **same VPC**.
   - The load balancer can route traffic to targets in both public and private subnets as long as they are within the same **VPC** and registered with the same **target group**.
