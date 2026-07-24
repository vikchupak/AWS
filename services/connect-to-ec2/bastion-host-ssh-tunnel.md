# Bastion host & Bastion host ssh tunnel

A **bastion host SSH tunnel** is a method where you:

* First connect to a **publicly accessible bastion host (jump server)** via SSH
* Then use that connection to **securely access private resources** (like EC2 instances or databases) inside a private network (VPC)

### 🔁 How it works (conceptually)

1. Your local machine → SSH → **bastion host** (public subnet)
2. Bastion host → connects to → **private instance / database** (private subnet)
3. Optionally, you create an **SSH tunnel (port forwarding)** so it feels like local access

### 🔐 Two common use cases

#### 1. SSH into private EC2 via bastion

```bash
ssh -i key.pem ec2-user@bastion-host
ssh -i key.pem ec2-user@private-instance
```

Or cleaner (ProxyJump):

```bash
ssh -i key.pem -J ec2-user@bastion-host ec2-user@private-instance
```

#### 2. SSH tunnel (WITH port forwarding) to a private DB (e.g. PostgreSQL)

<img width="2076" height="1623" alt="image" src="https://github.com/user-attachments/assets/c986d567-89b7-4b0a-a217-0ddba50f0af5" />

Open tunnel
```bash
ssh -i key.pem -f -N -L 5432:private-db:5432 ec2-user@bastion-host
```
- -f → run in background
- -N → no remote command
- -L → local port forwarding

Connect locally
```bash
psql -h localhost -p 5432
```

- Creates a secure tunnel
- Makes remote service appear local
- Required for non-SSH protocols (DB, Redis, etc.)

👉 Used for:

- Connecting to databases
- Accessing internal services from your laptop
