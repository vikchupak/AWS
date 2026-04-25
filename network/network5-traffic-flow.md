# Inbound and outbound traffic routing

## 🧠 **Key principle**

> **For inbound traffic, the Internet Gateway (IGW) is the actual router that delivers packets to the ENI.**
> The **route table does not route inbound Internet traffic** — it only affects **traffic leaving the subnet** (outbound).

---

### 🔹 **Inbound traffic flow**

1. **Client → Internet → AWS network**

   * Client sends packet to the **ALB public IP**.

2. **Packet reaches IGW**

   * The IGW knows the VPC that owns the public IP and forwards the packet to the correct **subnet ENI**.

3. **VPC internal routing**

   * AWS uses internal mapping: public IP → ENI → subnet.
   * **Route table is not consulted** for inbound Internet traffic.

4. **ENI receives the packet**

   * The ALB node receives it, then forwards to targets (private EC2s).

---

### 🔹 **Outbound traffic flow**

* When an ENI sends packets **to the Internet**, the **subnet’s route table** is used to decide that traffic goes through the IGW.
* So the **route table only matters for outbound**, not inbound from the Internet.

---

### 🔹 **Summary Table**

| Traffic Direction                    | Who routes the packets? | Role of Route Table?                               |
| ------------------------------------ | ----------------------- | -------------------------------------------------- |
| **Inbound from Internet → ALB node** | **IGW forwards to ENI** | ❌ Not involved                                     |
| **Outbound from ALB/EC2 → Internet** | IGW sends packets out   | ✅ Route table decides “next hop” (0.0.0.0/0 → IGW) |

---

### 🔑 **Takeaway**

* **Inbound:** IGW is the router; public IP → ENI mapping is handled internally by AWS.
* **Outbound:** Route table + IGW decide how packets leave the subnet.
