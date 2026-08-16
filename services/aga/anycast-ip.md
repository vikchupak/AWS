# AGA 2 anycast IPs

AGA IPs are Static + Anycast

Anycast IPs - IP addresses that utilize **Anycast routing** to advertise the same IP addresses simultaneously from multiple edge locations worldwide.

## 1. Static + Anycast: Breaking Down the Mechanics

### **What Makes Them "Static"?**

Unlike standard dynamic IPs or DNS-based load balancing where IP addresses can change or shift during failovers, AGA two IPs **never change** for the lifespan of your resource. Your clients connect directly to these fixed IPs, meaning you don't need complex DNS record updates or short TTLs (Time-To-Live) when modifying back-end infrastructure.

### **What Makes Them "Anycast"?**

* **Unicast (Traditional):** An IP address belongs to *one* physical server/interface in *one* location. Traffic from anywhere in the world routes directly to that single physical point.
* **Anycast:** The **exact same IP address** is broadcast via BGP (Border Gateway Protocol) from dozens or hundreds of global edge locations simultaneously.

When a user in Tokyo and a user in Frankfurt send traffic to `1.2.3.4`, the internet's routing protocol automatically sends each user to their **closest physical AWS/Cloud edge location**. From there, the provider routes the traffic internally across its optimized private fiber backbone to your actual application backend (e.g., an EC2 instance, Application Load Balancer, or Kubernetes cluster).

## 2. Why Are There **Two** IPs? (Fault Isolation)

Having one Anycast IP address already provides global reach, but providing **two** introduces physical redundancy and fault tolerance at the routing layer:

* **Independent Network Zones:** AWS, for example, services the two Anycast IPs from completely separate, isolated network zones (similar to physical Availability Zones). They pull from different IP subnets and physical infrastructure.
* **Client Fallback:** If a specific ISP, firewalled network, or localized routing issue blocks or drops traffic to the primary Anycast IP, your client application or DNS setup can seamlessly retry using the **second** static Anycast IP.

---

## Key Benefits

| Benefit | How It Works |
| --- | --- |
| **Lower Latency** | Traffic enters the provider's fast, private global network at the nearest PoP (Point of Presence) rather than traveling over the public internet. |
| **Instant Failover** | If a backend region goes down, traffic is automatically rerouted across the backbone to a healthy region without waiting for DNS cache propagation. |
| **Simplified Allowlisting** | Enterprise clients or firewalls only need to allowlist two static IP addresses, even if your backend scales across multiple global regions. |
| **TCP Termination at the Edge** | TCP handshakes complete at the nearest edge PoP, drastically speeding up initial connection times for distant users. |
