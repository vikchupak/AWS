# EFS mount target

An EFS mount target is essentially an Elastic Network Interface (ENI) that Amazon creates in each subnet you enable for EFS

Each mount target:
- Lives in your VPC
- Belongs to one subnet
- Gets one private IP address (automatically assigned unless you specify)
- Acts as the entry point to EFS in that Availability Zone
- Is managed fully by AWS (you cannot SSH into it, stop it, modify OS, etc.)

## How EC2 connects to EFS

When you mount:
```bash
sudo mount -t nfs4 fs-12345678.efs.eu-central-1.amazonaws.com:/ /mnt/efs
```

DNS resolves to the mount target IP in your AZ.

So EC2 talking to EFS looks like:
```bash
EC2 instance → mount target ENI → EFS backend
```
