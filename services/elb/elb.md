# ELB

Elastic Load Balancer (ELB) is a general term used by AWS to refer to their suite of load balancing services

### ELB types
- Classic Load Balancer (CLB) (legacy)
- Application Load Balancer (ALB)
- Network Load Balancer (NLB)
- Gateway LB (GWLB)

---

- **ELB is created within VPC and spans multiple AZs/subnets**
- https://aws.amazon.com/elasticloadbalancing/getting-started/?nc=sn&loc=4
- **Require `8+` free IPs per subnet, and `/27` subnet to allow scaling**
- ALB. Client-LB connection & LB-target instance connection are separate, not the same
  - Client-LB connection 1 is encripted (https); LB-target instance connection 2 is unencripted (http). Client-instance encription is broken
  - Client-LB connection 1 is encripted (https); LB-target instance connection 2 is encripted (https). Client-instance encription is broken?
  - If we need unbroken client-instance encription, then only **NLB** must be used

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

# Gateway LB (GWLB)

- GWLB is a specialized AWS load balancer designed to handle "bump-in-the-wire" network appliances, such as third-party firewalls, Intrusion Detection Systems (IDS/IPS), or deep packet inspection tools.

- Unlike a standard Load Balancer that acts as a destination (proxy), a GWLB acts as a transparent gateway. It intercepts traffic, sends it to a security appliance for inspection, and then forwards it to the original destination.

It’s mainly used for
- Firewalls
- IDS / IPS
- DPI (deep packet inspection)
- Network security appliances (Palo Alto, FortiGate, etc.)

Think of it as “A load balancer for firewalls”.

---

- Uses Gateway Load Balancer Endpoint (GWLBe)
- Works on Layer 3/4 (IP level)
- Stands in front of ALB/NLB
- GWLB is "transparent". ALB/NLB are unaware of GWLB
- Uses GENEVE protocol

Ingress
```yml
Client
  |
  v
IGW
  |
  v
Route Table
  |
  v
GWLBe
  |
  v
GWLB
  |
  v
ALB / NLB
  |
  v
Targets
```

Egress
```yml
App
  |
  v
Route Table (0.0.0.0/0)
  |
  v
GWLBe
  |
  v
GWLB
  |
  v
NAT / IGW
  |
  v
Internet
```
