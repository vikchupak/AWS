In AWS there are **auto scaling groups** created under the hood with **node group** approach.

- But AWS **doesn't automatically* autoscale** our resources. **However, the autoscaling group is just to group instances.**
- To "enable" autoscaling, we need to confire cluster autoscaler.
  - Create `custom policy` and attach to `node group AMI role` already created and attached to the **node group** being autoscaled
    - autoscaler group tags are important/used for this
  - Deploy cluster autoscaler resource/component to the cluster
    ```bash
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml
    ```
    ```bash
    kubectl get deployment -n kube-system cluster-autoscaler
    ``` 
