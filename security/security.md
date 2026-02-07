# HYBRID ENVIRONMENTS AND MIGRATION

## AWS Site-to-Site VPN

- Border Gateway Protocol (BGP)
  - Standard internet protocol used worldwide. **Not specific to AWS.**
  - **Routing protocol** that decides **the best path for data to travel between networks**
    - It is not about data transfer speed or security
  - **Used by AWS inside the IPsec tunnel (VPN) or on Direct Connect for dynamic routing**
- AWS site-2-site VPN
  - Connect a VPC with on-promises network **over PUBLIC internet**
  - **Uses IPsec protocol (not HTTPS)**
    - Works at Layer 3
    - Secures all IP traffic (TCP, UDP, ICMP, anything)
  - Speed limit is 1.25 Gbps
  - Virtual Private Gateway (VGW)
    - Logical resource in AWS used as target in one or more route tables
  - Customer Gateway (CGW). Represents both
    - Logical configuration within AWS (which represents a physical on-promises router)
    - Physical on-promises router (which AWS VPN connects to)
  - VPN connection
    - Configuration that links VGW and CGW
  - Static vs Dynamic routing
    - Static routing doesn't use BGP
    - Dynamic routing requires BGP
      - Recommended setup for production
      - Uses BGP over the IPsec tunnel
  - Route Propagation
    - If enabled on a VPC route table (RT), AWS automatically adds VGW to the VPC RT

<img width="1700" height="912" alt="image" src="https://github.com/user-attachments/assets/25f5fab2-0bbc-470b-a6f5-253caf38963c" />

## Direct Connect (DX)

- Direct Connect (DX)
  - A physical connection
  - 1, 10 or 100 Gbps
  - Not encrypted
  - Business Premises -> DX Location -> AWS Region
    - You pay for Port Allocation at a DX Location
    - It is your responsibility to "connect" your business premises to the DX Location Port using physical cables
    - **Cross Connect** connects AWS Port to Customer/Partner Router Port
  - Resilience is "bad" if using only 1 DX Port
    - It is a single point of failure
    - Below **HA Resilient** architecture for DX
    <img width="1486" height="790" alt="image" src="https://github.com/user-attachments/assets/128746b6-06c6-457a-ba0e-561afee4308b" />
  - DX does **NOT** provide access to the **Public Internet**. Only to AWS public services and private VPC resources
    - Virtual Interfaces (VIF) are used to provide DX access to AWS public services and private VPC resources
    - **Public VIF** provides access to AWS Public services
    - **Private VIF** provides access to AWS Private VPC resources
  - To End-to-End encrypt DX (VPN), Public VIF + VGW/TGW public endpoints setup is used
