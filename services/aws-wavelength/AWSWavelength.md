# AWS Wavelength

📡 What is AWS Wavelength?

AWS Wavelength is an AWS infrastructure offering optimized for mobile edge computing, specifically designed for 5G networks. It embeds AWS compute and storage services directly within telecommunications providers' (CSP) data centers at the edge of the 5G network.

🔑 Key Highlights
- Purpose: Enables ultra-low latency applications by keeping traffic within the telecom network — without traversing the public internet.
- How it works: You extend your VPC into Wavelength Zones, then deploy AWS resources (EC2, EKS, ECS, EBS, ALB, etc.) there, just like in a regular AWS Region.
- Supported services: EC2, EBS, VPC, EKS, ECS, Auto Scaling, CloudWatch, CloudTrail, CloudFormation, and more.
- [See](https://github.com/vikchupak/AWS/blob/main/network/wavelengthZones.md)
