# Simple Notification Service (SNS)

- PUB-SUB style
  - Publishers send messages to TOPICS
  - Subscribers receive messages SENT to TOPICS
  - Use SNS subscription **filter policies** for the subscriber to only receive a message that they are interested in

```txt
SNS Topic
   │
   ├── Subscription → SQS Auto
   │                    Filter: quoteType = AUTO
   │
   ├── Subscription → SQS Home
   │                    Filter: quoteType = HOME
   │
   └── Subscription → SQS Life
                        Filter: quoteType = LIFE

Each SNS subscription can have its own filter policy
```

- SNS Topic → publishes/fans out messages
- SNS Subscription → connects topic to SQS
- Subscription Filter Policy → determines which messages that particular subscription receives
- SQS Queue → receives the messages that passed the filter
