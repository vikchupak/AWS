# AWS Global Accelerator (AGA)

- [Doc](https://aws.amazon.com/global-accelerator/)
- Use Private AWS global network to speed up data transfer
  - Improve performance by up to 60% compared to the public internet
- AGA uses `AGA edge locations` as entery/exit points to Private AWS global network
- Works at 4 OSI layer
  - Can be used for non http(s)

# AGA with ALBs - use static AGA IPs

AGA can be used as an entry point with static IPs.

### Architecture Diagram

```txt
========================================================================================
1. DNS LAYER (Amazon Route 53)
========================================================================================
   User Query: https://api.yourdomain.com
                    |
                    v
   +-----------------------------------------------------------------+
   |                     Amazon Route 53                             |
   |  A Record (Alias) -> **Points to Global Accelerator DNS Name**  |
   +-----------------------------------------------------------------+
                    |
                    v (Resolves to 2 Static Anycast IPs)
                    
========================================================================================
2. ENTRY & INGRESS LAYER (AWS Global Accelerator & Edge Network)
========================================================================================
   Corporate Firewall / Clients *
   [ Allowed IPs ONLY: 1.2.3.4, 5.6.7.8 ]
                    |
                    v (Port 443 / HTTPS)
   +-----------------------------------------------------------------+
   |                  AWS Global Accelerator                         |
   |  • 2 Static Anycast IPs (1.2.3.4 / 5.6.7.8)                      |
   |  • Ingresses traffic at nearest AWS Edge Location               |
   +-----------------------------------------------------------------+
                    |
                    | (Routes over AWS Private Global Backbone)
        +-----------+-----------+
        |                       |
        v                       v
========================================================================================
3. REGIONAL INFRASTRUCTURE (Private & Isolated ALBs)
========================================================================================
  [ AWS Region A (e.g., us-east-1) ]        [ AWS Region B (e.g., eu-west-1) ]
  ----------------------------------        ----------------------------------
  Endpoint Group A                          Endpoint Group B
        |                                         |
        v                                         v
  +--------------------------------+        +--------------------------------+
  |    **INTERNAL** Application LB |        |    **INTERNAL Application LB** |
  |  • Scheme: Internal            |        |  • Scheme: Internal            |
  |  • Private IPs only in VPC     |        |  • Private IPs only in VPC     |
  |  • NO Public IP / IGW access   |        |  • NO Public IP / IGW access   |
  |  • ACM Cert: api.yourdomain.com|        |  • ACM Cert: api.yourdomain.com|
  +--------------------------------+        +--------------------------------+
        |                                         |
        +------------------+                      +------------------+
        |                  |                      |                  |
        v                  v                      v                  v
    +--------+         +--------+             +--------+         +--------+
    | Private|         | Private|             | Private|         | Private|
    |  EC2   |         |  EC2   |             |  EC2   |             |  EC2   |
    +--------+         +--------+             +--------+         +--------+
```

### Step 1: DNS Resolution via Route 53

1. The client sends a request to `[https://api.yourdomain.com](https://api.yourdomain.com)`.
2. **Amazon Route 53** serves an **A Record (Alias)** pointing directly to the AWS Global Accelerator DNS name (`a1b2c3d4e5.awsglobalaccelerator.com`).
3. Route 53 resolves the domain to the **2 static Anycast IP addresses** provided by Global Accelerator (e.g., `1.2.3.4` and `5.6.7.8`).

### Step 2: Edge Ingress & Firewall Traversal

1. The client's browser sends HTTPS traffic to port 443 at `1.2.3.4`.
2. The corporate firewall allows this outbound traffic because only these **2 static IPs** were whitelisted.
3. Traffic hits the nearest **AWS Edge Location**, entering the private AWS Global Backbone Network directly.

### Step 3: Layer 4 Global Routing to Internal ALBs

1. Global Accelerator inspects the traffic at Layer 4 (Transport Layer).
2. It evaluates health checks and geoproximity to select the optimal regional **Endpoint Group** (e.g., Region A).
3. Global Accelerator routes the encrypted TCP packets through AWS-managed Elastic Network Interfaces (ENIs) directly into the **private subnets** of the destination VPC.

### Step 4: TLS Termination & Private Routing

1. The **Internal ALB** receives the TCP traffic on its private IP address.
2. The ALB performs the TLS handshake using the regional **AWS Certificate Manager (ACM)** SSL certificate attached to its HTTPS listener.
3. The ALB evaluates path rules and proxies the decrypted request to the healthy backend **EC2 instances** in private application subnets.

# TODO: Compare later with

- CloudFront
  - Works at 7 OSI layer
- S3 Transfer Acceleration
  - Uses **CloudFront edge locations** and CloudFront Edge Network to send data faster
  - HTTP/HTTPS only as uses CloudFront
