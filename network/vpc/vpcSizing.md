# VPC Private CIDR

- Internet Engineering Task Force (IETF) in RFC 1918 defines IPs range used in **PRIVATE, internal networks** and is explicitly **not routed over the public internet**:
  - `10.0.0.0/8`
  - `172.16.0.0/12`
  - `192.168.0.0/16`
- Default Cloud Providers private CIDR
  - `172.31.0.0/16` AWS Default VPC
  - `10.128.0.0/9` GCP default VPC
  - `10.0.0.0/16` Azure default Azure VPC
