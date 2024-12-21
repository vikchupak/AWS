eksctl - command line tool for working wit aws k8s (Elastic Kubernetes Service) that automates many individual tasks.

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
