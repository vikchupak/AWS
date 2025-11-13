# Joined VPC private IPS should never overlap

That is the **golden rule** of private networking in AWS: **The private IP CIDR blocks of any two networks (VPCs, on-premises data centers, etc.) that need to communicate must never overlap.**

If they overlap, any attempt to route traffic between those two networks will **fail** due to **routing ambiguity**, regardless of whether you use **VPC Peering** or **Transit Gateway**.

---

## 🚫 Why Overlap Must Be Avoided

The term "private IP" only means the address is not advertised to the public internet. Within your interconnected network, they are used for local routing, and local routers must have a single, unambiguous path for every address range.

* **The Problem:** When you connect VPC A ($10.10.0.0/16$) and VPC B ($10.10.0.0/16$), the router sees that the destination address (e.g., $10.10.1.50$) exists in **two different directions**.
* **The Result:** AWS network services are designed to prevent this conflict.
    * **VPC Peering** connections will **fail to establish**.
    * **Transit Gateway** connections will result in **unreliable or failed routing** because the TGW route table cannot determine which VPC attachment to send the traffic to.

## ✅ The Solution: Systematic IP Address Management (IPAM)

To ensure successful connectivity and future scalability, you must implement a plan to guarantee uniqueness.

* **Allocate Large Blocks:** Start with a large, unused private range (like $10.0.0.0/8$).
* **Slice Systematically:** Allocate unique, non-overlapping **/16** or **/18** blocks for each new VPC based on Region, Environment, or Account.
    * VPC in Region 1: $10.1.0.0/16$
    * VPC in Region 2: $10.2.0.0/16$
    * VPC for Development: $10.10.0.0/16$
    * VPC for Production: $10.20.0.0/16$

By making every connected network use a **unique slice** of private IP space, you ensure that the router always has one clear path for any destination IP address.

# How to connect 2 VPCs

You can easily create two custom VPCs and connect them for testing using **VPC Peering**. This establishes a private, point-to-point connection between them.

The most critical requirement is that the two VPCs **must not have overlapping CIDR blocks**.

Here is the step-by-step process.

---

## 1. Plan Non-Overlapping CIDR Blocks 📝

For your test, let's use two distinct and safe CIDR blocks. We'll use a large **/16** block for each to ensure plenty of room for subnets and testing resources.

| VPC Name | VPC CIDR | Purpose |
| :--- | :--- | :--- |
| **VPC-A** | **$10.10.0.0/16$** | The requester/initiator VPC. |
| **VPC-B** | **$10.20.0.0/16$** | The acceptor/target VPC. |

> **Note:** These two ranges are entirely separate ($10.10.x.x$ and $10.20.x.x$), guaranteeing no overlap.

---

## 2. Create the Custom VPCs and Subnets 🏗️

You need to create both VPCs and at least one subnet in each.

### A. Create VPC-A ($10.10.0.0/16$)

1.  Go to the **AWS VPC** dashboard.
2.  Click **Create VPC**.
3.  Choose **VPC only**.
4.  Set the **Name tag** to `VPC-A-Test`.
5.  Set **IPv4 CIDR block** to **$10.10.0.0/16$**.
6.  Click **Create VPC**.

### B. Create VPC-B ($10.20.0.0/16$)

1.  Repeat the process.
2.  Set the **Name tag** to `VPC-B-Test`.
3.  Set **IPv4 CIDR block** to **$10.20.0.0/16$**.
4.  Click **Create VPC**.

### C. Create Subnets (One in each VPC)

1.  Go to **Subnets** in the VPC dashboard.
2.  Click **Create Subnet**.
3.  For VPC-A, choose `VPC-A-Test` and create a subnet with CIDR **$10.10.1.0/24$**.
4.  For VPC-B, choose `VPC-B-Test` and create a subnet with CIDR **$10.20.1.0/24$**.

---

## 3. Create and Accept the VPC Peering Connection 🔗

This establishes the network link between the two separate VPCs.

1.  In the VPC dashboard, go to **Peering Connections**.
2.  Click **Create Peering Connection**.
3.  Set the **Name tag** to `PCX-A-to-B`.
4.  For **VPC ID (Requester)**, select **VPC-A-Test** ($10.10.0.0/16$).
5.  For **VPC ID (Accepter)**, select **VPC-B-Test** ($10.20.0.0/16$) (assuming both are in the same account and region).
6.  Click **Create Peering Connection**.

The connection status will show as **Pending Acceptance**.

7.  Select the new peering connection.
8.  Click **Actions** and then **Accept Request**.
9.  The status will change to **Active** once accepted.

---

## 4. Update Route Tables (The Final Step) 🗺️

Even though the connection is **Active**, traffic cannot flow until the route tables in both VPCs are updated to tell them about the *other* VPC's network range.

### A. Update VPC-A's Route Table

1.  Go to **Route Tables** in the VPC dashboard.
2.  Select the main route table for **VPC-A-Test** (or the specific one associated with your subnet).
3.  Go to the **Routes** tab and click **Edit routes**.
4.  Click **Add route**.
    * **Destination:** Enter **$10.20.0.0/16$** (VPC-B's CIDR).
    * **Target:** Select **Peering Connection** and choose `PCX-A-to-B`.
5.  Click **Save changes**.

### B. Update VPC-B's Route Table

1.  Select the main route table for **VPC-B-Test**.
2.  Go to the **Routes** tab and click **Edit routes**.
3.  Click **Add route**.
    * **Destination:** Enter **$10.10.0.0/16$** (VPC-A's CIDR).
    * **Target:** Select **Peering Connection** and choose `PCX-A-to-B`.
4.  Click **Save changes**.

---

## 5. Testing Connectivity (Security Groups) 🛡️

If you launch an EC2 instance in each VPC's subnet, you still need to ensure the **Security Groups** allow the traffic.

* In the Security Group associated with your EC2 instance in **VPC-A**, add an **Inbound Rule** to allow the necessary protocol (e.g., **ICMP** for ping, **SSH/RDP**) from the source **$10.20.0.0/16$** (VPC-B's CIDR).
* Repeat the process for the Security Group in **VPC-B**, allowing traffic from the source **$10.10.0.0/16$** (VPC-A's CIDR).

Once the security groups are configured, an instance in $10.10.1.0/24$ will be able to communicate directly with an instance in $10.20.1.0/24$ using their **private IP addresses**.

```
+---------------------------------------------------------------------------------------+
| AWS Region (e.g., us-east-1)                                                          |
|                                                                                       |
|  +-------------------------------------+      +-------------------------------------+ |
|  |             VPC-A (Test)            |      |             VPC-B (Test)            | |
|  |   CIDR: 10.10.0.0/16                |      |   CIDR: 10.20.0.0/16                | |
|  |                                     |      |                                     | |
|  |   +-----------------------------+   |      |   +-----------------------------+   | |
|  |   |        Subnet-A-1           |   |      |   |        Subnet-B-1           |   | |
|  |   |   CIDR: 10.10.1.0/24        |   |      |   |   CIDR: 10.20.1.0/24        |   | |
|  |   |                             |   |      |   |                             |   | |
|  |   |   +---------------------+   |   |      |   |   +---------------------+   |   | |
|  |   |   |     EC2 Instance    |   |   |      |   |   |     EC2 Instance    |   |   | |
|  |   |   |     (Server-A)      |   |   |      |   |   |     (Server-B)      |   |   | |
|  |   |   |   Private IP:       |   |   |      |   |   |   Private IP:       |   |   | |
|  |   |   |   10.10.1.50        |   |   |      |   |   |   10.20.1.50        |   |   | |
|  |   |   +---------------------+   |   |      |   |   +---------------------+   |   | |
|  |   +-----------------------------+   |      |   +-----------------------------+   | |
|  |                                     |      |                                     | |
|  |   +-----------------------------+   |      |   +-----------------------------+   | |
|  |   |      Route Table VPC-A      |   |      |   |      Route Table VPC-B      |   | |
|  |   |-----------------------------|   |      |   |-----------------------------|   | |
|  |   | Destination      | Target   |   |      |   | Destination      | Target   |   | |
|  |   |------------------|----------|   |      |   |------------------|----------|   | |
|  |   | 10.10.0.0/16     | Local    |   |      |   | 10.20.0.0/16     | Local    |   | |
|  |   |------------------|----------|   |      |   |------------------|----------|   | |
|  |   | 10.20.0.0/16     | pcx-ID   |<-----+------>| 10.10.0.0/16     | pcx-ID   |   | |
|  |   +-----------------------------+   |  ^   |   +-----------------------------+   | |
|  +-------------------------------------+  |   +-------------------------------------+ |
|                                           |                                           |
|                                           |                                           |
|                                     +---------------------------+                     |
|                                     | VPC Peering Connection    |                     |
|                                     |       (pcx-ID)            |                     |
|                                     | Non-overlapping CIDRs     |                     |
|                                     | is CRUCIAL for this link! |                     |
|                                     +---------------------------+                     |
+---------------------------------------------------------------------------------------+
```

### Explanation of the Diagram:

  * **AWS Region:** The entire setup resides within a single AWS region.
  * **VPC-A (Test) & VPC-B (Test):** Two distinct Virtual Private Clouds.
      * Notice their **CIDR blocks** are **$10.10.0.0/16$** and **$10.20.0.0/16$**. These are completely separate, which is essential for the peering connection.
  * **Subnet-A-1 & Subnet-B-1:** A subnet within each VPC. For simplicity, we show one in each.
      * The subnet CIDRs are slices of their respective VPCs ($10.10.1.0/24$ within $10.10.0.0/16$, and $10.20.1.0/24$ within $10.20.0.0/16$).
  * **EC2 Instances (Server-A & Server-B):** An example server running in each subnet.
      * They have private IP addresses from their respective subnets ($10.10.1.50$ and $10.20.1.50$).
  * **VPC Peering Connection (pcx-ID):** This is the direct, private network link established between VPC-A and VPC-B. AWS's backbone handles the routing over this link.
  * **Route Tables:** Each VPC has its own route table.
      * **Local Route:** Each route table has a `Local` route for its *own* VPC's CIDR, meaning traffic destined for addresses within its VPC stays local.
      * **Peering Route:** This is the critical part for cross-VPC communication.
          * VPC-A's Route Table explicitly says: "To reach $10.20.0.0/16$ (VPC-B's network), send traffic via `pcx-ID`."
          * VPC-B's Route Table explicitly says: "To reach $10.10.0.0/16$ (VPC-A's network), send traffic via `pcx-ID`."

This setup allows Server-A (10.10.1.50) to communicate with Server-B (10.20.1.50) using their private IP addresses, leveraging the VPC Peering Connection for the private route.
