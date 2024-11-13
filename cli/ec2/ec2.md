```bash
# Create ec2 instance
aws ec2 run-instances \
--image-id <osImageId [AMI (Amazon Machine Image)]> \
--count <instanceCount> \
--instance-type <instanceType> \
--key-name <sshKeyName> \
--security-group-ids <securityGroupIds> \
--subnet-id <subnetId>
```

```bash
# List ec2 instances
aws ec2 describe-instances
```
