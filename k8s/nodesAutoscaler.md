## Node group approach

In AWS there are **auto scaling groups** created under the hood with **node group** approach.

- But AWS **doesn't automatically autoscale** our resources. **The autoscaling group is just to group instances.**
- To "enable" autoscaling, we need to confire cluster autoscaler.
  - Create `custom policy` and attach to `node group AMI role` already created and attached to the **node group** being autoscaled
    - autoscaler group tags are important/used for this. These tags are added to all EC2 instances inside **auto scaling group** and the autoscaler will scale nodes by matching these tags.
      - `k8s.io/cluster-autoscaler/<cluster-name>`
      - `k8s.io/cluster-autoscaler/enabled`
  - Deploy cluster autoscaler (as pod) to the cluster in `kube-system` namespace
    ```bash
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml
    ```
    ```bash
    kubectl get deployment -n kube-system cluster-autoscaler
    ```
     ```bash
    kubectl get pod -n kube-system
     # cluster-autoscaler will be in list
    ``` 

## Fargate approach

- **Fargate creates one pod per node**
  - Which means fargate doesn't fit for stataful apps or DeamonSet

1. Create IAM role for Fargate and attach needed policies to it.
2. Create/configure fargate profile and apply/app the fargate IAM role to it.
   - It will use `namespace or/and labels` to define pods to manage
3. Deploy pods using deployment manifest with added `namespace or/and labels`

- Fargate-provisioned nodes/pods are created in private VPC. Not public. So we have to spesify these private subnets.
- Fargate nodes is not visible in AWS console UI as they are complitelly **managed by AWS account** like controle plane nodes as well.

List fargate nodes/pods
```bash
kubectl get nodes -n fargate-namespace
# fargate nodes is not visible in AWS console UI as they are complitelly managed by AWS account
```

## Combination Node group and Fargate

- We can use both at the same time
  - Fargate for stateless apps
  - Node groups(EC2) for stateful apps
