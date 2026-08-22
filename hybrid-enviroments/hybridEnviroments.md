# HYBRID ENVIRONMENTS

## AWS Site-to-Site VPN

- Border Gateway Protocol (BGP)
  - Standard internet protocol used worldwide. **Not specific to AWS.**
  - **Routing protocol** that decides **the best path for data to travel between networks**
    - It is not about data transfer speed or security
  - **Used by AWS inside the IPsec tunnel (VPN) or on Direct Connect for dynamic routing**
 
<img width="1700" height="912" alt="image" src="https://github.com/user-attachments/assets/25f5fab2-0bbc-470b-a6f5-253caf38963c" />

- AWS site-2-site VPN
  - Connect a VPC with on-promises network **over PUBLIC internet**
  - **Uses IPsec protocol for encryption (not HTTPS)**
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

## Direct Connect (DX)

<img width="1486" height="790" alt="image" src="https://github.com/user-attachments/assets/429ec2d7-da35-49ee-b9a1-ad53e1476d2a" />

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
  - VPN encryption. To End-to-End encrypt DX, Public VIF + VGW/TGW public endpoints with IPsec (VPN) setup is used

## Limitations combining VPC peering with DX or VPN

<img width="436" height="218" alt="image" src="https://github.com/user-attachments/assets/a5139134-4dc2-45d3-b53f-8892d9f37f9e" />

- VPC peering connection does not support edge-to-edge routing. This means that if either VPC in a peering has one of the following connections, you cannot extend the peering with "additional" connection
  - A VPN connection or an AWS Direct Connect connection to a corporate network
  - An Internet connection through an Internet gateway
  - An Internet connection in a private subnet through a NAT device
  - A gateway VPC endpoint to an AWS service; for example, an endpoint to Amazon S3

## Transit Gateway (TGW)

- TGW is a **Network Transit Hub** to connect `VPCs to VPCs` and `**VPCs to on-promises networks**`
  - Connects to on-premises networks via VPN or AWS Direct Connect
  - TGW supports `Transitive Routing` unlike `VPC Peering`
  - VPC Peering works only between AWS VPCs
    - **Cannot connect to on-premises networks**

| Feature | VPC Peering | Transit Gateway |
| --- | --- | --- |
| **Topology** | **Point-to-Point** (Full Mesh) | **Hub-and-Spoke** (Centralized) |
| **Transitive Routing** | **No** (A to B, B to C ≠ A to C) | **Yes** (A to TGW to C works) |
| **Scalability** | Hard to manage (Max 125 peers) | Easy to manage (Scales to thousands) |
| **Cost** | No hourly fee; pay for data transfer | **Hourly fee** + Data processing fee |
| **Latency** | **Lowest** (Direct connection) | Slightly higher (Extra hop through TGW) |
| **Complexity** | High at scale (Mesh network) | Low (Single connection per VPC) |


| VPC Peering | Transit Gateway |
|------------------------|------------------------|
| <img width="1610" height="776" alt="image" src="https://github.com/user-attachments/assets/b708d74a-f367-4999-81d9-bdfe5ad93ffa" /> | <img width="1614" height="780" alt="image" src="https://github.com/user-attachments/assets/4367d047-4b1f-4f64-abd5-22a900f30520" /> |

### Connec transit gateway between regions

To connect a Transit Gateway between AWS regions, you use inter-region peering between two Transit Gateways. It’s not automatic—you explicitly create and accept a peering attachment.

<img width="685" height="551" alt="image" src="https://github.com/user-attachments/assets/50b38bc1-c361-4d68-94ad-d4d41d449d1a" />

<img width="3810" height="2970" alt="image" src="https://github.com/user-attachments/assets/3b570004-ccd6-4617-a268-86d28da3c482" />

### DX connection

On-prem -> **Direct Connect** -> **Transit (Virtual Interface) VIF** -> **DX Gateway** -> TGW -> VPC

- A Transit VIF is a Direct Connect virtual interface that connects your on-prem network directly to a TGW

### Site-to-Site VPN connection

On-prem → Customer Gateway → Internet(encrypted data) → AWS Site-to-Site VPN Endpoint → TGW → VPC

### TGW attachment model

- Attachment types to other networks
  - VPC Attachment
    - Between TGW ↔ VPC
    - Connects a VPC to the Transit Gateway
  - **Site-to-Site VPN Attachment**
    - Between On-prem ↔ TGW over internet
    - Encrypted IPsec tunnel to your Customer Gateway
  - **Direct Connect (DX) Gateway Attachment**
    - Between AWS Direct Connect Gateway ↔ TGW
    - Connects Direct Connect (via Transit VIF) into TGW
- Peer cross regions/accounts
  - Peering Attachment (TGW Peering)
    - Between TGW ↔ TGW
    - Connects Transit Gateways
      - Across regions
      - Across accounts

## AWS Transfer Family

Transfer data TO or FROM S3, EFS using non-native AWS protocols
- File Transfer Protocol (FTP)
- File Transfer Protocol Secure (FTPS)
- SSH File Transfer Protocol (SFTP)
- Applicability Statement 2 (AS2)

---

- It is about ability to upload/download using different protocols rather than migration
