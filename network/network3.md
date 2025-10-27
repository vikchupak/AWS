# Public IPs/subnets/EC2/ENI

## ⚙️ ** What happens when you launch an EC2 into a private subnet**

* It always gets a **private IP** (e.g. `10.0.11.42`)
* It **cannot** get a **public IP**, even if you manually set `associate_public_ip_address = true`

  * AWS will ignore or reject that flag if the subnet isn’t public.

---

## 🧭 ** Internet access for private EC2s**

Private EC2s can still access the Internet **outbound only**, via:

* A **NAT Gateway** (recommended)
* Or a **NAT instance** (legacy approach)

That allows them to download updates, access APIs, etc.
But inbound Internet connections → ❌ not possible.

---

## 🔒 ** Inbound access options**

If you want to reach those EC2s from outside:

* You can SSH via a **bastion/jump host** in a **public subnet**, or
* Route traffic through a **public ALB/NLB** that forwards to the private EC2s, or
* Use **AWS Systems Manager Session Manager** (no public IPs needed at all).

---

## ✅ **Summary**

| Scenario                                       | Subnet Type | Gets Public IP? | Can Reach Internet? | Can Be Reached From Internet? |
| ---------------------------------------------- | ----------- | --------------- | ------------------- | ----------------------------- |
| EC2 in **Public Subnet**, auto-assign enabled  | Public      | ✅ Yes           | ✅ Yes               |                               |
| EC2 in **Public Subnet**, auto-assign disabled | Public      | ❌ No            | ❌ No                |                               |
| EC2 in **Private Subnet**                      | Private     | ❌ No            | ✅ Outbound via NAT  | ❌ No inbound                  |
