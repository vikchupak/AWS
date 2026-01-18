- [Launch Templates](https://github.com/vikchupak/AWS/blob/main/services/ec2/LC%26LT.md)
- [Target Groups & Auto Scaling Groups](https://github.com/vikchupak/AWS/blob/main/services/elb/TG&ASG.md)

### ASG vs ECS

- ECS scales containers
  - [ECS](https://github.com/vikchupak/AWS/blob/main/services/eks/index.md)
  - 2 modes
    - EC2 mode
      - You create `ECS Cluster + ASG` to manage provisioning EC2s and their horizontal scaling for containers
      - Pay for running instances
    - Fargate mode
      - "Serverless". AWS manages provisioning EC2s and their "horizontal scaling" for containers for you
      - Pay for what you task (containers) consume
- ASG scales EC2 instances
  - You define instance type
