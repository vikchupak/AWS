### ASG for EC2 vs ECS for containers

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
  - [Launch Templates](https://github.com/vikchupak/AWS/blob/main/services/ec2/LC%26LT.md)
  - [Target Groups & Auto Scaling Groups](https://github.com/vikchupak/AWS/blob/main/services/elb/TG&ASG.md)
  - You define instance type

### K8s & EKS

- Kubernetes Horizontal Pod Autoscaler (HPA) - native core k8s pods autoscaler. It scales **pods** based on metrics collected by
  - Kubernetes Metrics Server - an official Kubernetes add-on
  - Or Prometheus + Prometheus Adapter - an external system for advanced autoscaling
- Kubernetes Cluster Autoscaler - an official, but not core Kubernetes project. It scales **nodes**
  - [Example1](https://gitlab.com/devopsbootcamp8550504/11-aws-eks/01-02-ekswithconsole/-/blob/main/cluster-autoscaler-autodiscover.yaml?ref_type=heads)
  - Example2

---

- Karpenter - AWS node autoscaler. It replaces Kubernetes Cluster Autoscaler
  - Why Karpenter is different (vs Cluster Autoscaler)
    - Doesn’t rely on Auto Scaling Groups
    - Chooses instance types dynamically
    - Faster provisioning
    - More flexible (spot, mixed instances, etc.)
