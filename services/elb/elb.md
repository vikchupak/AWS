- ELB (Elastic Load Balancing)
  - Elastic Load Balancer (ELB) is a general term used by AWS to refer to their suite of load balancing services
  - **ELB is created within VPC and spans multiple AZs/subnets**
  - https://aws.amazon.com/elasticloadbalancing/getting-started/?nc=sn&loc=4
  - **Require `8+` free IPs per subnet, and `/27` subnet to allow scaling**
  - ALB. Client-LB connection & LB-target instance connection are separate, not the same
    - ALB-target instance connection is NOT HTTPS encripted. So client-instance encription is broken
    - If we need unbroken clien-instance encription, then only NLB must be used

List LBs
```bash
aws elbv2 describe-load-balancers
```
  
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

- A **Target Group** is a collection of targets (such as EC2 instances, IP addresses, or Lambda functions) that the load balancer routes traffic to.
- **Target Group** can **span multiple subnets, both `public` and `private`**, but these subnets must be within the **same VPC**.
- **Target group** can **span multiple AZs.**

## Cross-Zone Load Balancing

- By default, ELB routes trafic to TG targets in its AZ, which can cause uneven trafic distribution between targes.
- With Cross-Zone ENABLED, ELB can route trafic to TG targets in other AZs for even trafic distribution between targes.
