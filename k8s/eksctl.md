eksctl - command line tool for working with aws k8s (Elastic Kubernetes Service) that automates many individual tasks.

- https://eksctl.io/

Create cluster
```bash
eksctl create cluster \
—name demo-cluster \
—version 1.27 \
—region eu-central-1 \
—nodegroup-name demo-nodes \
—node-type t2.micro \
—nodes 2 \ # real nodes count as nodes autoscaler is not created out-of-the-box
—nodes-min 1 \
—nodes-max 3
```

It will create many things under the hood for us
- Roles with policies
- VPC with public and private subnets in each AZ

## `eksctl` uses `aws cli` under the hood

**`eksctl`** uses the AWS CLI under the hood to interact with Amazon EKS (Elastic Kubernetes Service) and AWS services. Specifically:

- **AWS API calls:** `eksctl` relies on the AWS CLI or SDK to make API calls for creating and managing EKS clusters, associated resources (like EC2 instances, IAM roles, VPCs), and other AWS infrastructure.
- **AWS CLI credentials:** `eksctl` uses the credentials and configuration provided by the AWS CLI. It reads from `~/.aws/credentials` and `~/.aws/config` to authenticate and interact with AWS.
- **Seamless integration:** It simplifies the complex series of AWS CLI commands required to set up and manage EKS by automating tasks such as:
  - Creating clusters and nodes
  - Configuring IAM roles and policies
  - Setting up networking (VPC, subnets, etc.)
  - Managing Kubernetes versions and updates

In summary, while `eksctl` is a higher-level tool focused on simplifying EKS cluster management, it uses the AWS CLI or SDK to perform the underlying operations.
