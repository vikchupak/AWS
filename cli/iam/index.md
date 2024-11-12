- Create a user
```bash
aws iam create-user \
--user-name <userName>
```
- Create a user grop
```bash
aws iam create-group \
--group-name <groupName>
```
- Add a user to a group
```bash
aws iam add-user-to-group \
--user-name <userName>
--group-name <groupName>
```
- Show a group info
```bash
aws iam get-group \
--group-name <groupName>
```
- Add a permission to a user
```bash
aws iam attach-user-policy \
--user-name <userName>
--policy-arn <policy-AmanonResouceName>
```
- Add a permission to a group
```bash
aws iam attach-group-policy \
--group-name <groupName>
--policy-arn <policy-AmanonResouceName>
```
- List a group permissions
```bash
aws iam list-attached-group-policies \
--group-name <groupName>
```
