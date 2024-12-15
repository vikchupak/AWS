
Add new context to `~/.kube/config`
```bash
aws eks update-kubeconfig --name=<aws-k8s-cluster-name>
```

- `~/.kube/config` can contail creds for multiple different k8s clusters(contexts)

List contexts
```bash
kubectl config get-contexts
```

Switch to context
```bash
kubectl config use-context <context-name>
```

Add new context
```bash
kubectl config set-context <new-context-name> --cluster=<cluster-name> --user=<user-name>
```
