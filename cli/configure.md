# Configure CLI user creds

```bash
aws configure
```
will ask
  - AWS Access Key ID (the key ID is assigned to a spesific user, so it is like a user login)
  - AWS Secret Access Key (like the user password)
  - Default region name (where all components are created by default)
  - Default output format (how to output data in terminal, `json` | `text` | `table`)

### Alternative Method: Specify Profile
To configure multiple sets of credentials, you can specify a profile using the `--profile` option:

```bash
aws configure --profile myprofile
```

You can then use this profile by adding `--profile myprofile` to your commands or setting the profile as the default for a session.

**AWS CLI configs location**
- `~/.aws`
  - `~/.aws/config`
  - `~/.aws/credantials`

# Switch between cli users

In the AWS CLI, you can switch between different IAM users by creating **profiles** for each user in the AWS CLI configuration. A profile allows you to store multiple sets of credentials and configuration settings, making it easy to switch between different users without reconfiguring each time.

### Setting Up Multiple Profiles

1. **Configure Profiles**:
   Use `aws configure` with the `--profile` option to set up each IAM user profile.

   ```bash
   aws configure --profile user1
   ```

   Provide the access key, secret access key, default region, and output format for `user1`. Repeat the same for another user by changing the profile name:

   ```bash
   aws configure --profile user2
   ```

   **Example `~/.aws/credentials` file:**

   ```plaintext
   [user1]
   aws_access_key_id = AKIAEXAMPLEUSER1
   aws_secret_access_key = EXAMPLESECRETUSER1

   [user2]
   aws_access_key_id = AKIAEXAMPLEUSER2
   aws_secret_access_key = EXAMPLESECRETUSER2
   ```

2. **Switch Between Profiles**:
   You can specify the profile in each command using the `--profile` option. For example:

   ```bash
   aws s3 ls --profile user1
   ```

3. **Set a Default Profile for a Session**:
   If you frequently use a specific profile, set it as the default for your terminal session by setting the `AWS_PROFILE` environment variable:

   **Linux & macOS:**

   ```bash
   export AWS_PROFILE=user1
   ```

   Now, any AWS CLI command you run in this session will use `user1`’s profile by default until you unset or change the `AWS_PROFILE` variable.

### Listing Configured Profiles
To list all profiles configured on your system, you can use:

```bash
aws configure list-profiles
```

### Example Use Case
If you regularly switch between development and production accounts, you could create profiles like `dev` and `prod`, and then run commands with the appropriate profile, ensuring you’re always working in the correct environment.

### Summary
Profiles make it simple to manage and switch between different AWS users or roles in the CLI. Use the `--profile` flag in commands or set the `AWS_PROFILE` environment variable to make the transition smooth and efficient.
