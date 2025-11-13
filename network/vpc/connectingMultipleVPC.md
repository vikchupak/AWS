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
