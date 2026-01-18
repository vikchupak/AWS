- [Launch Templates](https://github.com/vikchupak/AWS/blob/main/services/ec2/LC%26LT.md)
- [Target Groups & Auto Scaling Groups](https://github.com/vikchupak/AWS/blob/main/services/elb/TG&ASG.md)

### ASG vs ECS

- ECS scales containers
  - [ECS(1)](https://github.com/vikchupak/AWS/blob/main/services/eks/index.md)
  - [EC2(2)](https://github.com/vikchupak/AWS/blob/main/services/ecs/ecs.md)
  - 2 modes
    - **EC2 mode**
      - 2 Ways
        - **Manual**. Launch EC2s and add/remove them to ECS Cluster
        - **Automatic**. Create ASG to add/remove EC2s to ECS Cluster automatically.
          - You create `ECS Cluster + ASG` to manage provisioning EC2s and their horizontal scaling for containers
          - **Capacity Providers**. Modern ECS uses Capacity Providers. This links your ECS cluster directly to the ASG. If you try to run a container and there’s no room, ECS will tell the ASG, "Hey, spin up another server for me," and the ASG handles it automatically
      - Pay for running instances
    - **Fargate mode**
      - "Serverless". AWS manages provisioning EC2s and their "horizontal scaling" for containers for you
      - Pay for what you task (containers) consume
- ASG scales EC2 instances
  - You define instance type
