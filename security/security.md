# HYBRID ENVIRONMENTS AND MIGRATION

- AWS site-2-site VPN
  - Connect a VPC with on-promises network over PUBLIC internet
  - Uses IPsec protocol (not HTTPS)
    - Works at Layer 3
    - Secures all IP traffic (TCP, UDP, ICMP, anything)
  - Virtual Private Gateway (VGW)
    - Logical resource in AWS used as target in one or more route tables
  - Customer Gateway (CGW)
    - Logical configuration within AWS (which represents a physical on-promises router)
    - Physical on-promises router (which AWS VPN connects to)
  - VPN connection
    - Configuration that links VGW and CGW
  - Speed limit is 1.25 Gbps

<img width="1700" height="912" alt="image" src="https://github.com/user-attachments/assets/51deae98-f213-4372-a8e6-3e0ba266f8a2" />
