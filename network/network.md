- **AWS Cloud** (Amazon Web Services) is a comprehensive cloud computing platform
  - AWS Cloud is the overall platform for hosting and managing your applications and data on Amazon's global infrastructure
  - VPC is a virtual network within AWS Cloud, providing isolated environments for deploying resources securely and efficiently
- **Data centers** (NOT creatable by users)
  - The physical facilities that house the hardware and network infrastructure. Server farms
- **Edge locations** (NOT creatable by users)
  - A mini data center to ONLY cache your content (CDN - Content delivery network, Cloud Front)
  - Edge locations > AZs & Regions
- **Geographic location** (NOT creatable by users)
  - Group of regions
- **Regions** (NOT creatable by users)
  - A geographical area
  - Each region consists of **two or more** Availability Zones
  - Each region is fully independent and isolated from other regions. It makes sense to deploy your app to multiple regions for availability
  - Each region is resource and service spesific. Resources are not shared automatically between regions
  - Regions operate independently, meaning AWS services in one region do not automatically communicate with services in another
  - Cross-region communication requires special configurations like VPC Peering, AWS Transit Gateway, or AWS VPN/Direct Connect
  - Each region can have multiple VPCs, allowing for different environments (e.g., prod-vpc, dev-vpc)
- **AZs** (Availability Zone) (NOT creatable by users)
  - Availability Zones consist of **one or more** physical data centers that are redundantly connected to each other and the internet
    - https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html
  - Each AZ must belong to a single Region(it cannot span multiple Regions)
  - A single AZ can contain multiple VPCs from the same or different AWS accounts
  - A VPC can span multiple AZs
  - An AZ **can host multiple VPCs** from different accounts
  - **EC2 instances can communicate within the same VPC, between different AZs without additional setup using (private IPs) AWS backbone network - built in functionality**
- **VPC** - virtual network. Because no real routers and switchers are used, like EC2 virtual servers
  - You have a default VPC in each Region
  - VPC is always created within a single Region and cannot span multiple regions
  - Each region can have multiple VPCs, allowing for different environments (e.g., prod-vpc, dev-vpc)
  - A VPC can span multiple AZs
- **Private/public subnets**
  - Each subnet must belong to a single Availability Zone(it cannot span multiple AZs)
  - A subnet is always confined to a single AZ, but an AZ can contain multiple subnets
- **EC2**
  - Every EC2 instance must be launched inside a subnet (which means it is inside a specific VPC and AZ)

-----

Firewall

- EC2 instance level via **security group**
- Subnet level via **NACL**
- VPC level. AWS does not have a dedicated firewall like NACLs or Security Groups, but you can implement security controls using
  - **Route Tables** – Can be used to control traffic routing at the VPC level
  - AWS Network Firewall – A managed firewall service that provides stateful inspection, intrusion prevention, and filtering at the VPC level

-----

- **Internet Gateway** (IGW)
  - An Internet Gateway is a **resource**
  - Connects VPC to internet
  - Used for **outbound and inbound** internet access for resources in a **public subnet**.
  - You have resources in a **public subnet** that need direct access to and from the internet.
  - ***Steps to Connect a VPC to the Internet***
    - Create an Internet Gateway (IGW)
      - An Internet Gateway is created and attached to the VPC. This provides the actual link between your VPC and the internet.
    - Attach the Internet Gateway to the VPC
      - After creating the IGW, attach it to the VPC to allow internet communication
    - Set Up Route Tables
      - In the VPC’s main route table, add a route that directs all traffic destined for the internet (0.0.0.0/0) (Destination) to the Internet Gateway (Target)
          - Best practice: Instead of using the main route table, create a custom VPC route table and associate it with a specific public subnet.
          - The reason: Main Route Table should usually be used for private subnets (without internet access) to avoid unintentional exposure of private resources to the internet. This ensures that only the public subnet has internet access, while private subnets remain isolated
    - Configure Subnets
      - Public Subnet: Place EC2 instances in a public subnet and assign them public IPs. These instances can communicate directly with the internet via the IGW
      - Private Subnet: Instances in private subnets can’t access the internet directly unless a NAT Gateway is used for outbound traffic
    - Security Groups and Network ACLs
      - Ensure that security groups allow inbound and outbound traffic as needed (e.g., allowing HTTP/HTTPS traffic for web servers)
      - Network ACLs may need to be configured to allow inbound and outbound traffic from the internet as well
  - How EC2 instance with public IP receives traffic
    - The request reaches the EC2 instance via its public IP, which is mapped internally to the instance’s private IP
    - The mapping of the public IP to the private IP happens at the Internet Gateway (IGW) level by **AWS’s internal NAT (Network Address Translation) system**, which is part of the **Internet Gateway (IGW)**
    - Key Takeaways
      - IGW is responsible for mapping public IPs to private IPs
      - AWS automatically performs this NAT (Network Address Translation)
      - Unlike a NAT Gateway, which allows multiple private instances to share a single public IP, IGW does a one-to-one mapping

- **NAT Gateway** (Network Address Translation Gateway or NGW)
  - NAT Gateway is a managed **service**
  - Is **deployed/created in a public subnet**, and it communicates with instances in private subnets through the public subnet's routing
  - Used for **outbound** internet access for resources in a **private subnet**
  -  You have resources in a **private subnet** that:
     - Need **only outbound** internet access (e.g., downloading software updates, accessing external APIs)
     - Should remain inaccessible from the internet
  - ***Steps to create and configure NGW***
    - Create and configure IGW using custom route table and public subnet
    - Create an Elastic IP (EIP) for the NAT Gateway (AWS NAT Gateways only support Elastic IPs)
      - Elastic IP (**Static**)
        - A fixed public IP that you can associate with an instance
        - Persists even after stopping and starting the instance
    - Create the NAT Gateway
      - Choose public subnet
      - Choose Elastic IP
    - Set up private subnet’s Route Table
      - Set `Destination`: `0.0.0.0/0`
      - Set/choose `Target`: Select the NAT Gateway
    - Launch an EC2 instance in the Private Subnet and test outbound access
      - `curl -I https://www.google.com`

- **VPC Route tables**
  - AWS route tables are a **custom abstraction** within the AWS cloud environment to manage how traffic flows between resources in a VPC. The routing mechanism in AWS doesn't rely on any Linux-based routing/networking tools directly (ip route command)
  - **Main Route Table**
    - Every VPC has a main route table that applies to all subnets by default
  - **Custom Route Table**
    - You can create custom route tables and associate them with specific subnets
  - Routing rules in these(Main and Custom) tables define how traffic is directed between subnets, internet gateways, NAT gateways, VPNs, etc
  - Subnet Association
    - A subnet does not have its own routing table
    - Instead, a subnet is associated with a specific route table
    - A route table can be associated with one or more subnets.
    - A subnet cannot be associated with multiple route tables.
  - Target vs Destination as exaple of `ip route`(Linux)/`route print`(Windows)
    - Destination (Network destination in Linux/Windows). **Actual adress we want to reach - final point**.
    - Target (Gateway in Linux/Windows). **Closest/next hop to reach the destination - intermediate point**
    
- **NACL (Network Access Control List)** is a security feature in AWS that **acts as a firewall** to control traffic (both inbound and outbound) at the **subnet level**

- **Security Groups** act as a firewall at EC2 instance level

---

- Within a VPC, cross-AZs and cross-Subnets communication don't need additional configuration
- Cross-VPCs and cross-Regions communication require special configuration
- Amazon Elastic Kubernetes Service (EKS) spans multiple Availability Zones (AZs) within a given region(VPC) by default
  - EKS allows you to specify which subnets in which AZs you want your worker nodes to reside
  - In fact, it is a common best practice to spread worker nodes across multiple AZs to ensure high availability and fault tolerance for your Kubernetes workloads
- Is there auto-replication between AZs?
  - AWS does not automatically replicate resources between Availability Zones (AZs) by default
  - You need to explicitly configure replication depending on the service you are using
  - But, most database services replicate data across multiple AZs automatically

---
     
- https://github.com/VIK2395/Network/blob/main/NetmaskVsSubnetMask.md
- https://github.com/VIK2395/DevOps/blob/main/Linux/Network/VPN/index.md

### **Internet Gateway (IGW) vs NAT Gateway (NGW)**

| **Feature**                | **Internet Gateway (IGW)**                                         | **NAT Gateway (NGW)**                                              |
|----------------------------|--------------------------------------------------------------------|--------------------------------------------------------------------|
| **Purpose**                | Allows **direct internet access** for resources in a **public subnet**. | Allows resources in a **private subnet** to access the internet for outbound traffic, without exposing them to inbound traffic. |
| **Inbound Traffic**         | Supports inbound traffic (e.g., public users accessing a web server in the subnet). | Does **not** support inbound traffic from the internet to private subnet resources. |
| **Outbound Traffic**        | Allows outbound traffic directly to the internet.                | Handles outbound traffic from private subnet resources, translating private IPs to public IPs. |
| **Association**             | Attached to the **VPC** directly.                               | Deployed in a **public subnet** but used by **private subnets** via routing. |
| **Use Case**                | For **public subnets** (e.g., hosting web servers, APIs, etc.).   | For **private subnets** (e.g., private EC2 instances downloading updates or accessing external APIs). |
| **Public IPs**              | Resources require a **public IP** or **Elastic IP** to use the IGW. | Resources use their **private IP**, and the NAT Gateway translates it to the NAT Gateway's **public IP**. |
| **Directionality**          | Bidirectional (inbound and outbound traffic).                   | Unidirectional (outbound traffic only).                           |
| **Security**                | Requires careful security group and NACL configuration to protect public-facing resources. | Provides a secure way to access the internet while keeping resources inaccessible from the internet. |
| **Managed by AWS?**         | Fully managed by AWS.                                           | Fully managed by AWS.                                             |
| **Redundancy**              | Highly available across the VPC.                                | Highly available within a single **Availability Zone (AZ)**. To make it fault-tolerant, deploy one NAT Gateway per AZ. |
| **Performance**             | Supports unlimited bandwidth.                                   | Scales automatically to handle traffic but has a cost per GB processed. |
| **Pricing**                 | No additional cost; you only pay for the resources using the IGW. | Charged per hour of use and per GB of data processed. |

---

### **How They Work Together in a VPC**

#### Example:
1. **Public Subnet**:
   - Contains resources like web servers.
   - Subnet is associated with a **route table** that directs `0.0.0.0/0` traffic to the **Internet Gateway**.

2. **Private Subnet**:
   - Contains backend resources like databases or internal servers.
   - Subnet is associated with a **route table** that directs `0.0.0.0/0` traffic to the **NAT Gateway**, which is deployed in a public subnet.
   - The NAT Gateway then uses the Internet Gateway for external communication.

#  Internet Gateway (IGW) and  NAT Gateway (NGW) are managed aws services?

- Internet Gateway (IGW) is not a managed AWS service in the same way as other AWS services like NAT Gateways or Elastic Load Balancers.
  - Why Internet Gateway is Not a Managed Service:
    - No Additional Charges: There are no additional charges for using an IGW, beyond the standard VPC charges. You are not billed for the actual IGW itself—only for the resources (like EC2 instances or data transfer) that use it.

    - User-Managed: You are responsible for creating, attaching, and managing the IGW. Once attached to your VPC, the IGW enables communication between the VPC and the internet, but AWS does not handle the actual routing or operational management beyond basic infrastructure availability.

- NAT Gateway - Managed Service. AWS handles scaling, high availability, and maintenance for these services, and you are billed based on usage (e.g., per-hour cost and data processing costs).
