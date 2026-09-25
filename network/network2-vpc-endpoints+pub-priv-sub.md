## VPC endpoints

- VPC **Interface** Endpoint
  - **Allows DIRECT access to `PUBLIC AWS services` from private subnets.** SECURE because it is direct. **1 VPC endpoint - 1 service.**
    - No public IP addresses needed to access public AWS services
  - **Interface endpoints are NOT associated with route tables directly. Interface endpoints use ENIs/subnets**
  - **Paid**
- VPC **Gateway** Endpoint
  - A private connection between your VPC and **`specific PUBLIC AWS services`** — **without sending traffic over the public internet**.
    - Currently, Gateway Endpoints support only two services:
      - Amazon S3 (public service). Name **S3 gateway endpoint**
      - Amazon DynamoDB (public service). Name **DynamoDB gateway endpoint**
    - **Gateway endpoints are associated with route tables**
      ```txt
      Destination              Target
      10.0.0.0/16              local
      DynamoDB prefix list     vpce-xxxxxxxx
      0.0.0.0/0                NAT Gateway
      ```
  - **Free**

Example:
- A lambda can be deployed in private subnet and need access to public resources. VPC endpoints or NAT Gateway can help.
- A lambda can be deployed in public subnet.
