## AWS Directory Service

### About Active Directory (AD) in general

- Manage identities and access, ensuring the right people have access to the right resources in a corporate IT network
- Commonly used in Windows environments
- Products
  - Microsoft Active Directory Domin Services (AD DS)
  - SAMBA - open-source alternative to AD DS

### AWS Directory Service

- [Doc](https://aws.amazon.com/directoryservice/)
- Managed implementation of AD
  - Runs within VPC
- Some AWS services require a directory e.g. Amazon Workspaces
- AD Modes
  - **Simple AD**
    - Uses SAMBA 4
    - AD location is AWS only
    - NOT designed to integrate with on-prem AD
  - **AWS Managed Microsoft AD (Microsoft AD)**
    - Uses Microsoft AD DS
    - Primary AD location is AWS
    - Can be integrated with on-prem AD (Hybrid Extension)
      - You have 2 ADs, one in AWS, the other on-prem that "trust" each other
        - Connection using VPN or DX
  - **AD Connector (Proxy Model)**
    - NOT a real AD
    - AD location is on-prem only
    - Connect existing on-prem AD to AWS services
      - Connection using VPN or DX
