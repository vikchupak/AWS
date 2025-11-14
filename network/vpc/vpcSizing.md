# VPC Private CIDR

- Internet Engineering Task Force (IETF) in RFC 1918 defines IPs range used in **PRIVATE, internal networks** and is explicitly **not routed over the public internet**:
  - `10.0.0.0/8`
  - `172.16.0.0/12`
  - `192.168.0.0/16`
- Default Cloud Providers private CIDR
  - `172.31.0.0/16` AWS Default VPC
  - `10.128.0.0/9` GCP default VPC
  - `10.0.0.0/16` Azure default Azure VPC

---

AWS VPC min/max range:
  - min `/28` (16 IP)
  - max `/16` (65536 IP)

### Splitting VPC into subnets

- A VPC size is `10.16.0.0/16`
- 16 subnets
- A subnet size is `/20`

<img width="1369" height="652" alt="image" src="https://github.com/user-attachments/assets/01c6aae8-8a59-4f70-bc79-89cf46d305e0" />
