# HYBRID ENVIRONMENTS AND MIGRATION

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

## Transit Gateway (TGW)

- **Network Transit Hub** to connect `VPCs to VPCs` and `VPCs to On-promises networks`
  - TGW vs VPC Peering. TGW supports `Transitive Routing` unlike `VPC Peering`

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
| <img width="1610" height="776" alt="image" src="https://github.com/user-attachments/assets/b708d74a-f367-4999-81d9-bdfe5ad93ffa" /> | <img width="1614" height="780" alt="image" src="https://github.com/user-attachments/assets/2a3b900a-0f4e-4189-a8e5-6ac505db3c49" /> |

- Attachment types to other networks
  - VPC
  - Site-to-Site VPN
  - Direct Connect (DX) Gateway
- Peer cross regions/accounts

## AWS Storage Gateway

- AWS hybrid storage service
- Connect On-premises with AWS cloud storage
  - Keep applications on-prem, but use AWS for storage, backup, or archiving
- Integrates with AWS S3, EBS, Glacier
- Usually run as a VM on-premises
  - Act as a bridge between local on-prem storage and AWS storage
  - Connection. Storage Gateway VM (On-prem) -> Storage Gateway Endpoint (AWS) 
- Represents storage using protocols
  - Internet Small Computer Systems Interface (iSCSI)
    - Block-level storage protocol
    - Presents `Raw Block Storage` (Raw disk)
    - Used by **Volume Gateway**
  - Network File System (NFS) (Linux/Unix)
    - File-level storage protocol
    - Used by **File Gateway**
  - Server Message Block (SMB) (Windows)
    - File-level storage protocol
    - Used by **File Gateway**

### Volume Gateway

- Stored volumes
  - **Primary data is stored on Storage Gateway VM on-prem locally**
  - Data is automatically asynchronously copied to **AWS S3** as EBS snapshots
  - Pros & Corns
    - Pros
      - Primary storage copy is on-prem local -> Low latency
      - Full disk backups
      - Create EBS volumes in AWS for Disaster Recovery
    - Corns
      - Primary storage copy is on-prem local -> Need to have storage capacity locally
  - Limitations
    - 32 Volumes per Gateway
    - 16TB per volume
    - 512TB per Gateway

- Cached volumes
  - The same as Stored volumes setup, but
    - **Primary data is stored on `AWS S3` Storage**
    - Frequently accessed data is cached on Storage Gateway VM on-prem locally
    - Known as Data Center Extension architecture
      - Storage appears on-promises, but it is actually in AWS
    - Pros & Corns
      - Pros
        - Create EBS volumes in AWS for Disaster Recovery
        - Save local storage capacity
    - Limitations
      - 32 Volumes per Gateway
      - 32TB per volume
      - 1PB per Gateway

### Tape Gateway

- Virtual Tape Library (VTL)

### Amazon S3 File Gateway
