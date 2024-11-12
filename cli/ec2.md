```bash
# Create ec2 instance
aws ec2 run-instances \
--image-id <osImageId> \
--count <instanceCount> \
--instance-type <instanceType> \
--key-name <sshKeyName> \
--security-group-ids <securityGroupIds> \
--subnet-id <subnetId>
```
