- ELB (Elastic Load Balancing)
  - Elastic Load Balancer (ELB) is a general term used by AWS to refer to their suite of load balancing services.
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
