Security groups can be created only within VPC.

```bash
# List security groups
aws ec2 describe-security-groups
```
```bash
# List vpcs
aws ec2 describe-vpcs
```
```bash
# Create a security group
aws ec2 create-security-group \
--group-name <groupName> \
--description <groupDescription> \
--vpc-id <vpcId>
```
```bash
# Get info on group by groupId
aws ec2 describe-security-groups \
--group-ids <groupId1 groupId2>
```
```bash
# Add a rule to a security group
aws ec2 authorize-security-group-ingress \
--group-id <groppId> \
--protocol <protocol> \
--port <port> \
--cidr <ips>
```
