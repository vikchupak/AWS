# Auto Scaling Group (ASG)

- Target Group acts as the bridge between your Load Balancer and your EC2 instances
- ASG takes over the responsibility of adding and removing instances from that Target Group automatically
  - Manages EC2 lifecycle
  - Registers and deregisters instances in the Target Group
  - Uses TG health status to replace unhealthy instances
  - Uses **Launch Template**
- ELB does NOT know about ASG directly
- **ASG defines WHEN & WHERE. LT defines WHAT**

```text
[ INTERNET ]
      |
      ▼
+-----------------------+
|  ELB (Load Balancer)  |
+----------+------------+
           |
           | Routes traffic based on rules
           ▼
+--------------------------------------------------------+
|     Target Group                                       |
|                                                        |
|   [ Instance A ]    [ Instance B ]    [ Instance C ]   |
|     (Healthy)         (Healthy)         (Launching)    | 
+----------+---------------------------------------------+
           ▲
           |
           | ASG adds/removes instanses to TG based on EC2 `Health checks` or `ASG Scaling Policies`
           | and **Launch Template**
           ▼
+-----------------------------------------------------------+
|               Auto Scaling Group (ASG)                    |
|                 (LT + ASG Policies)                       |
+-----------------------------------------------------------+
```

# Functions of the Auto Scaling Group (ASG)

- **Replacement (Self-healing)**
  - Based on `Health Checks`
  - It is maintaining the number of health servers you asked for
  - Check Types
    - EC2 Status Checks (Default)
    - ELB/Target Group Health Checks
      - App checks, e.g., `GET /health`
- **Dynamic Scaling (Capacity adjustment)**
  - Based on `Scaling Policies`
    - Uses **metrics**, like average CPU. Usually from cloudwatch

# Scaling Methods

- Manual Scaling - Manually adjust desired capacity
- Scheduled Scaling - Time based adjustments
- Health Check Replacements (Self-healing)  - maintaining the desired number of health servers
- Dynamic Scaling - reactive scaling based on `Scaling Policies`

# ASG Scaling Policies (optional)

- Dynamic Scaling
  - Simple (legacy)
    - Add a **fixed** number of instnses when a **fixed** metric threshold reached. Then cooldown period stars.
    - Example ```If CUP > 50% add 2 instances```
  - Step (better)
    - Add a **different** number of instances based on a **different** metric threshold value. Then cooldown period stars.
    <img width="290" height="126" alt="image" src="https://github.com/user-attachments/assets/e6de2206-08d4-44e2-a369-8da7c1cd7b36" />

  - Target Tracking (recommended)
    - You define the desired metric value and ASG calcs everything automatically

# Cooldown

The Cooldown - the ASG stops everything and waits for a specific amount of time (the "cooldown period") before it is allowed to look at the alarm again.

# ASG Lifecycle hooks

- Define actions to take on instances during ASG actions (like add/remove instances, changing instance state)

# ASG HealthCheck

- Status checks. Identify hardware and software issues that may impair an instance
- Health checks provided by Elastic Load Balancing (ELB). These health checks are disabled by default but can be enabled
- Your custom health checks
