- Every VPC has a (virtual) **VPC Router** (invisible)
  - Not user-visible. You can’t SSH or inspect the router — only define routes.
  - It is Highly available, it runs in all of AZs of VPC uses
  - The router has a network interface in every subnet in your VPC
  - By default it routes traffic between subnets
  - Controlled by "route tables" each subnet has one
  - "Interprets" your route table
  - VPC has Main route table - subnet default
    - Traffic is forwarded to its destination via target
      - destination - final point
      - target - intermediate point
      - Target:
        - local - destination inside VPC

Instance → Subnet → (Subnet’s Route Table) → VPC Router → Target (IGW, NAT, TGW, etc.)
