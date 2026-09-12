# EKS auth

Amazon EKS uses IAM to provide authentication to your Kubernetes cluster, but it still relies on native Kubernetes Role-Based Access Control (RBAC) for authorization. This means that IAM is only used for the authentication of valid IAM entities. All permissions for interacting with your Amazon EKS cluster’s Kubernetes API are managed through the native Kubernetes RBAC system.

Access to your cluster using AWS Identity and Access Management (IAM) entities is enabled by the **AWS IAM Authenticator for Kubernetes**, which runs on the Amazon EKS control plane. The authenticator gets its configuration information from the  **aws-auth ConfigMap (AWS authenticator configuration map)**.

The **aws-auth ConfigMap** is automatically created and applied to your cluster when you create a managed node group or when you create a node group using eksctl. It is initially created to allow nodes to join your cluster, but **you also use this ConfigMap to add role-based access control (RBAC) access to IAM users and roles**.
