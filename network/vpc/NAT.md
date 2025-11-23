# NAT Instance vs NAT Gateway. NAT table

## ✅ **NAT Instance vs NAT Gateway**

AWS offers **two ways** to allow **private subnets** to access the Internet **outbound** (updates, package installs, external APIs) *without exposing them publicly*:

1. **NAT Instance** (an EC2 instance acting as NAT) - legacy, not recommended. But not deprecated.
2. **NAT Gateway** (managed AWS service)

---

## 🔶 **NAT Gateway (Managed AWS Service)**

### **How it works**

* A fully managed, highly available NAT service created per **AZ**.
* Lives in a **public subnet**, and routes traffic from private subnets to the Internet.

### **Pros**

* **Highly available** in its AZ (no maintenance).
* **Scales automatically** to very high bandwidth.
* **Simple**: no OS, no patches, no SSH, no configs.
* **Reliable**: AWS fully manages redundancy.

### **Cons**

* **Expensive** — two cost components:

  * *Hourly cost*: ~$0.045/hr (~$32/month)
  * *Data processing fee*: ~$0.045/GB
* **One NAT gateway per AZ** recommended (doubles/triples cost per AZ).

### **When to use**

* Production workloads.
* High throughput.
* Zero-maintenance environments.
* Multiple private subnets per AZ.

---

## 🔷 **NAT Instance (EC2)**

### **How it works**

* You run a specially configured EC2 instance (with Source/Destination check disabled) to act as a NAT.

### **Pros**

* **Cheaper** — cost = EC2 instance price (t3.micro ~$8/mo).
* Can add **custom firewall rules**, proxies, routing logic.
* Can run **intrusion detection**, monitoring, or caching.
* Full control of OS.

### **Cons**

* **Not highly available** unless YOU build it (autoscaling, failover).
* **Single EC2 instance = single point of failure** without extra work.
* Must **patch**, **monitor**, and maintain the OS.
* **Scaling is manual** (instance size upgrade).

### **When to use**

* Small projects, dev/staging environments.
* Budget-constrained setups.
* When you need custom software on the NAT (e.g., squid proxy).

## ❌ **Common Pitfalls**

### **1. Placing NAT gateway in a private subnet**

It must be placed in **public subnet**, with:

* public subnet route to IGW
* NAT gateway with elastic IP

### **2. One NAT gateway for multiple AZs**

This causes:

* cross-AZ charges (expensive)
* single point of failure
  Best practice: **NAT Gateway per AZ**.

### **3. Forgetting to update route table**

Private subnet route must point:

* `0.0.0.0/0` → NAT Gateway (or NAT instance)

### **4. Not disabling Source/Dest check on NAT instance**

NAT instance won’t work otherwise.

# NAT Table

- NAT Table (or Translation Table) is a database/record used by the router.
- PAT (Port Address Translation) is a translation **technique** that relies heavily on the NAT table.

## 🗺️ Role of the NAT Table

The NAT table is a critical component, typically residing in the router or firewall, that makes NAT possible, especially for the most common type, **Port Address Translation (PAT)** (or NAT Overload).

### How It Works

The table stores temporary mappings to keep track of connections between devices on the internal (private) network and external devices on the internet (public network).

1.  **Outgoing Traffic:** When a device on the private network sends a packet out, the NAT device intercepts it. It replaces the private source IP address and port number with its own **public IP address** and a **unique public port number** for that session.
2.  **Table Entry Creation:** The NAT device records this translation in the NAT table. The entry links the internal source (Private IP:Port) to the external mapping (Public IP:Assigned Port) and the destination address.
    * *Example Entry:* `(192.168.1.10:5000) <--> (203.0.113.5:60000)`
3.  **Incoming Traffic:** When the response packet returns from the internet, its destination is the public IP and assigned port (e.g., `203.0.113.5:60000`).
4.  **Table Lookup:** The NAT device looks up this public IP/Port combination in the NAT table to find the corresponding private IP/Port.
5.  **Reverse Translation:** It then reverses the translation, changing the destination address back to the private IP and port (e.g., `192.168.1.10:5000`), and forwards the packet to the correct internal device.

```
Private source IP:Port <-> Public source IP:Port
```
