# HYBRID ENVIRONMENTS AND MIGRATION

- Border Gateway Protocol (BGP)
  - Standard internet protocol used worldwide. **Not specific to AWS.**
  - Routing protocol that decides how data travels across the internet or large networks
  - Used inside the IPsec tunnel (VPN) or on Direct Connect for dynamic routing
- AWS site-2-site VPN
  - Connect a VPC with on-promises network over PUBLIC internet
  - Uses IPsec protocol (not HTTPS)
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
    - Static routing doesn't use/require BGP
    - Dynamic routing require BGP
      - Recommended setup for production
      - Uses BGP over the IPsec tunnel

<img width="1700" height="912" alt="image" src="https://github.com/user-attachments/assets/51deae98-f213-4372-a8e6-3e0ba266f8a2" />
