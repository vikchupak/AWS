```bash
# Syntax
aws <command> describe-<entry> \
--filter <filterOtions> \
--query <queryOptions>
```

```bash
aws ec2 describe-instances \
--filter "Name=instance-type,Values=t2.micro" \
--query "Reservations[].Instances[].InstanceId"
```

- filter - filter command result
- query - map results
