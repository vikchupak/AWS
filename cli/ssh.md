```bash
# Create ssh key pair
ssh ec2 create-key-pair \
--key-name <keyName> \
--query 'KeyMaterial' \
--output text > pair_name.pem
```
