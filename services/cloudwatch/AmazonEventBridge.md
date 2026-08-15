# Amazon EventBridge (Amazon CloudWatch Events)

Historically, EventBridge was called Amazon CloudWatch Events. They are essentially the same concept.

Amazon EventBridge rule:
- Acts as a conditional router on an event bus.
- Monitors incoming JSON events in real time OR runs on a time-based schedule, directing matching events to one or more downstream target services.

Rule Trigger Types:
- Event Pattern Rules: Triggered reactively when an incoming JSON payload matches a defined filter.
- Scheduled Rules: Triggered proactively on a time-based cadence using standard cron expressions.

Capabilities:
- Target Routing: A single rule can route matching events to up to 5 targets simultaneously (including AWS Lambda, SQS queues, SNS topics, Step Functions state machines, Kinesis Data Streams, or event buses in other AWS accounts).
- Input Transformation: Rules can manipulate the event payload prior to delivery. You can extract specific JSON paths and reformat the payload into a clean string or structured object using an Input Transformer.
