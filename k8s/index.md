- Elastic Container Registry (ECR) - private docker repository for container images. Alternative to dockerhub, nexus

---

- **Elastic Container Service (ECS)** - container orchestration service, **AWS version/replacement of k8s**
  - Create ECS cluster containing all the services to manage the containers
  - Represents a Control Plane managing the containers, created automatically with the cluster 
  - Cntainers run on EC2 instances
  - EC2 instances are managed by ECS via the Control Plane
  - EC2 instances have docker runtime installed to run containers and `ECS Agent` installed to be managed by ECS
  - BUT, we have to create EC2 instances yourself, join them to the cluster, check if you have enough EC2 instances and resources to run containers. We have to manage EC2 instances OS like updates. Install docker runtime (and `ECS Agent`?)
  - So, we do not manage containers, but still have to manage servers(EC2 instances)
    - **Container orchestration is managed by ECS**
    - **Hosting infrastacture are still managed by you**
  - Advantage: Full access and controll of your infrastracture
- **Elastic Kubernetes Service (EKS)** - managed k8s service

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
  - Nodegroup, EC2-based (can be either self-managed by you or fully/semi-managed by AWS)
  - Fargate (fully-managed by AWS)
