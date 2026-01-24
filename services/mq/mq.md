# Amazon Message Queuing (Amazon MQ)

- [Doc](https://aws.amazon.com/amazon-mq/)
- Managed Open-Source Message Broker
  - Based on `Apache Active MQ`
  - Supports JMS API, AMQP, MQTT, OpenWire, STOMP
  - Provides Queues and Topics within the same product
- VPC-based NOT public service
- Best when moving an existing application to AWS that already uses a traditional message broker like RabbitMQ or ActiveMQ
- Use SNS + SQS for most new implementations (default choice)
