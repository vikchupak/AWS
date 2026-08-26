# CloudWatch Application Insights

Monitors your application stack for performance issues and errors.

```txt
┌─────────────────────────────────────────────────────┐
│                   AWS Cloud                         │
│                                                     │
│   CloudWatch Application Insights Service           │
│   (Runs entirely on AWS — nothing to install)       │
│                                                     │
│   - Analyzes your resources                         │
│   - Detects anomalies                               │
│   - Creates dashboards                              │
│   - Correlates problems                             │
└──────────────────┬──────────────────────────────────┘
                   │ reads metrics & logs from
                   ▼
┌─────────────────────────────────────────────────────┐
│              CloudWatch                             │
│   (Metrics, Logs, Alarms already flowing in)        │
└──────────────────┬──────────────────────────────────┘
                   │ collected by
                   ▼
┌─────────────────────────────────────────────────────┐
│         Your EC2 / Application Servers              │
│                                                     │
│   ✅ Unified CloudWatch Agent  ← installed here     │
│   ✅ SSM Agent                 ← installed here     │
└─────────────────────────────────────────────────────┘
```

### 🔧 What IS Required on Your Servers

Even though Application Insights itself runs on AWS, it does require two agents pre-installed on your EC2 instances:

<img width="679" height="119" alt="image" src="https://github.com/user-attachments/assets/7d6b0749-92cd-4935-b73c-2fe9c3fdc6a1" />

Application Insights uses SSM to automatically configure the CloudWatch Agent on your instances — it writes its config to SSM Parameter Store and pushes it to the agent. You don't write any config yourself.

### 🚀 How You Set It Up

1. Go to CloudWatch Application Insights Console  in the AWS Console
2. Add your application — you point it to an AWS Resource Group (a collection of related resources like EC2, RDS, ELB, etc.)
3. Application Insights automatically scans those resources
4. It recommends and applies metrics/log configurations
5. It starts monitoring, detecting anomalies, and building dashboards — all automatically

### 📌 Key Takeaway

Application Insights is like a smart observer sitting in AWS — it looks at your existing CloudWatch data, figures out what's wrong, and surfaces it for you. The only things on your servers are the standard CloudWatch Agent and SSM Agent, which you'd likely already have installed anyway.

<img width="1274" height="337" alt="image" src="https://github.com/user-attachments/assets/35f33264-50f9-45ff-b430-e61a6047ef45" />
