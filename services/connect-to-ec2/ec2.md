# AWS Systems Manager > (Node Tools) Session Manager

### Session manager vs SSH key-pair to connect to EC2

✅ **AWS Session Manager is preferred** over key-pair SSH for accessing EC2 in almost all modern setups.

---

# ✅ Session Manager vs. SSH key pair

| Feature                       | **Session Manager (SSM)** | **SSH key pair**        |
| ----------------------------- | ------------------------- | ----------------------- |
| Requires public IP            | ❌                         | ✅ (unless tunneling)    |
| Requires inbound ports        | ❌                         | ✅ (port 22)             |
| Uses IAM instead of keys      | ✅                         | ❌                       |
| Audit logging                 | ✅ (CloudTrail, logs)      | ❌                       |
| Access control granularity    | High (IAM)                | Low                     |
| Works via private subnet      | ✅                         | ❌ (or requires bastion) |
| Easy to rotate credentials    | ✅                         | ❌                       |
| File transfer/port forwarding | ✅                         | ✅                       |
| Requires SSM agent            | ✅                         | ❌                       |
| Easy setup                    | ✅                         | ✅                       |
| Best practice                 | ✅                         | ❌                       |

---

# ✅ Why Session Manager is preferred

### ✅ 1. **More secure**

* No port 22 open
* No public IP needed
* No SSH keys to lose/rotate
* IAM-based access control
* Full auditing & logging

### ✅ 2. **Private-only instances**

Instances can stay in **private subnets** with no internet
→ You access over the SSM control channel.

### ✅ 3. **Centralized access**

One place to control permissions.

### ✅ 4. **Auditable**

Every session can be logged to:

* CloudWatch Logs
* S3

SSH provides none of this by default.

---

# ✅ When SSH key pairs still make sense

SSH may be needed when:

* You must use tools not supported by SSM
* SSM agent isn’t available
* No IAM control allowed (rare)
* Bare-metal AMIs or custom OS without SSM support

Usually for legacy or special workloads.

---

# Practical Guidance

## ✅ Best-practice architecture

* Put EC2 in private subnets
* Disable inbound port 22
* No public IP
* Access via Session Manager

This significantly reduces attack surface.

---

# Example Setup

### Instance requirements

* SSM Agent installed (preinstalled in Amazon Linux, Ubuntu)
* IAM role with:

```
AmazonSSMManagedInstanceCore
```

### Connect

```bash
aws ssm start-session --target i-123456789
```

Optional tunneling:

```bash
aws ssm start-session \
  --target i-123456789 \
  --document-name AWS-StartPortForwardingSession \
  --parameters '{"portNumber":["22"],"localPortNumber":["9999"]}'
```

---

# Recommendation

✅ Prefer **Session Manager**
❌ Avoid direct SSH if possible

Only keep SSH as a fallback, and disable port 22 when not needed.

<img width="1487" height="802" alt="image" src="https://github.com/user-attachments/assets/96ed92f7-7a9c-4d9f-97e4-b585c0fb1c4d" />

<img width="1487" height="802" alt="image" src="https://github.com/user-attachments/assets/99501ebc-ab16-4388-84cc-fb56428e6664" />

# CloudFormation Template. EC2 with Session Manager configured

- [Template](https://github.com/vikchupak/AWS/blob/main/services/connect/ec2instabce.yml)

