# AWS Systems Manager (SSM)

- Originall name was "Simple Systems Manager". This is why SSM.
- **SSM agent** is already installed on many AMI
- The SSM Agent is used for instance management and automation

### Core use cases

- Run commands remotely (no SSH needed)
- Patch management
- Session Manager (shell access via AWS console)
- Inventory & compliance
- Parameter Store / Secrets integration

### AWS Systems Manager Run Command

You can use AWS Systems Manager Run Command to configure and manage Amazon EC2 instances without establishing direct SSH or RDP connections. Run Command allows administrators to remotely execute commands on one or more instances from the AWS Management Console or through programmatic interfaces. This capability enables teams to apply configuration updates, install software, or run scripts across a fleet of instances in a centralized and consistent manner, which significantly simplifies operational management in environments that use Auto Scaling or large groups of EC2 instances.

Setup **Amazon EC2 instances** or **on-premises machines** that are configured with the **SSM Agent** and appropriate IAM permissions so they can communicate with AWS Systems Manager.

AWS Systems Manager Run Command works without inbound ports because the connection is initiated from the EC2 instance itself (outbound), not from you.

Step-by-step:

- SSM Agent runs on EC2
  - Preinstalled on most modern AMIs
  - Acts like a “client”
- Agent opens outbound connection
  - Connects to AWS over HTTPS (port 443)
  - To SSM endpoints (public or VPC endpoints)
- You send a command
  - From console / CLI / API
- AWS stores the command
  - In the SSM service
- Agent polls / maintains channel
  - Receives the command from AWS
- Agent executes locally
  - Runs script/command on the instance
- Returns output
  - Sends results back to AWS
