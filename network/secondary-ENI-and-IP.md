# EC2 & ENI

- EC2 awlays has one primary ENI
  - ENI always has one primary private IP
  - ENI can have optional secondary private IPs
- EC2 can have optional secondary ENIs

```txt
EC2 instance
  ├── Primary ENI-1 (eth0)
  │     ├── Primary IP: 10.0.0.10
  │     └── Secondary IPs: optional
  │
  └── Secondary ENI-2 (eth1)
        ├── Primary IP: 10.0.1.20
        └── Secondary IPs: optional
```
