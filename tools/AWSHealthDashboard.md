# AWS Health Dashboard

The AWS Health Dashboard is available out-of-the-box to all AWS accounts at no additional cost.

You can access it in the AWS Management Console using either of these quick methods
- The Search Bar: Type "Health" or "AWS Health Dashboard" into the main search bar at the top of the console and select it from the dropdown.
- The Notification Bell: Click the bell icon in the top right corner of the AWS console navigation bar, and select "View all Health events".
- Direct URL: Navigate directly to https://health.aws.amazon.com/health/home.

---

**AWS Health** provides ongoing visibility into your resource performance and the availability of your AWS services and accounts. You can use AWS Health events to learn how service and resource changes might affect your applications running on AWS. AWS Health provides relevant and timely information to help you manage events in progress. AWS Health also helps you be aware of and to prepare for planned activities.

You can use **Amazon EventBridge** to detect and react to AWS Health events. Then, based on the rules that you create, EventBridge invokes one or more target actions when an event matches the values that you specify in a rule. For example, you can use AWS Health to receive email notifications if you have AWS resources in your AWS account that are scheduled for updates, such as Amazon Elastic Compute Cloud (Amazon EC2) instances.

<img width="1050" height="887" alt="image" src="https://github.com/user-attachments/assets/074810b5-b59d-48ce-9f1a-b18e1be311a1" />

**Your account events** – This page shows events that are specific to your account. You can view open, recent, and scheduled changes. You can also view notifications, as well as an event log that shows all events from the past 90 days.
