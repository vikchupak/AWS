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
—nodes 2 \
—nodes-min 1 \
—nodes-max 3
```
