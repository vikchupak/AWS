- Elastic Container Registry (ECR) - private docker repository for container images. Alternative to dockerhub, nexus

---

- **Elastic Container Service (ECS)** - container orchestration service. **AWS version/replacement of k8s**
  - Create ECS cluster containing all the services to manage the containers
  - Represents a Control Plane managing the containers, created automatically with the cluster
    - **EC2-hosted worker nodes**
      - Containers run on EC2 instances
      - We have to create EC2 instances yourself, **join them to the cluster**, check if you have enough EC2 instances and resources to run containers. We have to manage EC2 instances' OS, like updates. Install docker runtime and `ECS Agent`
          - Then, EC2 instances are part of ECS cluster and the `Control Plane - ECS Agents` mange containers on the instanses
          - Each EC2 instance has docker runtime installed to run containers and `ECS Agent` to communicate with the Control Plane to manage containers
      - So, we do not manage containers, but still have to manage servers(EC2 instances)
        - **Container orchestration is managed by ECS**
        - **Hosting infrastacture are still managed by you**
          - Create EC2s
          - Install Docker runtime and ECS Agent
          - Manage OS
          - Join EC2s to ECS cluster
          - Check if enough resources
      - Advantage: Full access and controll of your infrastracture
    - **Fargate-hosted worker nodes**
      - Runs containers in **serverless** way(we do not create servers yourself, but servers are created and fully managed by AWS)
      - Servers are added based on the need to run containers
      - Pay only for what your system actually consuming
- **Elastic Kubernetes Service (EKS)** - managed k8s service. **Original k8s in AWS**
  - Create EKS cluster containing all the services to manage the containers
  - EKS deploys and manages k8s Control Plane Nodes with all required services/processes
  - Control Plane Nodes automatically replicated across multiple availability zones (AZ)
    - **EC2-hosted worker nodes (Compute Fleet)**
      - Create EC2 instanses and connect them to the cluster
      - We have to create EC2 instances yourself, **join them to the cluster**, check if you have enough EC2 instances and resources to run containers. We have to manage EC2 instances' OS, like updates. Install docker runtime and k8s processes
          - Then, EC2 instances are part of ECS cluster and the `Control Plane - k8s processes` mange containers on the instanses
          - Each EC2 instance has docker runtime installed to run containers and `k8s processes` to communicate with the Control Plane to manage containers
    - **EC2-Nodegroup-hosted worker nodes**
      - Creates and deletes EC2 instances for you, but you need to configure it. It is like bulk create.
      - No nodes autoscaling out-of-the-box. You need to configure it on both side k8s and AWS
    - **Fargate-hosted worker nodes**
      - The same as for ECS Fargate-hosted worker nodes
---

Ways of running containers:
- EC2 - manyally provisioned virtual servers
- Fargate - on-demand automatically provisioned virtual servers

---

- We can use `ECS` with:
  - EC2 (self-managed by you)
  - Fargate(fully-managed by AWS)
- We can use `EKS` with:
  - EC2 (self-managed by you)
  - Nodegroup, EC2-based (semi-managed by AWS)
  - Fargate (fully-managed by AWS)
