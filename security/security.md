# HYBRID ENVIRONMENTS AND MIGRATION

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
  - Static vs Dynamic VPN (routing)
    - Static VPN (routing) doesn't use/require BGP
    - Dynamic VPN (routing) require BGP
      - Recommended setup for production
      - Uses BGP over the IPsec tunnel

<img width="1700" height="912" alt="image" src="https://github.com/user-attachments/assets/f399d8af-b446-4adb-8cc2-b6a8b8adc27a" />
