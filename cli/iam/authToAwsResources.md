- **Add a password for a user to login to Management Console**
```bash
aws iam create-login-profile \
--user-name <userName>
--password <password>
--password-reset-required
```
- **Add an access key for a user to get programmatic access to AWS resources**
```bash
aws iam create-access-key \
--user-name <userName>
```
