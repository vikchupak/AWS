# Simple Queue Service (SQS)

- SQS Standard
  - Oprimazed for speed and scale, so **order is NOT guaranteed**
  - A message is deleverd `at-least-once`
- SQS FIFO
  - Garanties order
  - A message is deleverd `exactly-once`
- Pay for requests to SQS, not messages sent/pulled
- Amazon SQS is a public service, but your queues are private by default
  
---

- Visibility Timeout
  - Time the message is "hidden" while being processed by consumer
- ASG can scale based on Queue Length

<img width="1275" height="721" alt="image" src="https://github.com/user-attachments/assets/af823a18-f6d7-4aa0-932c-20888ef9fff1" />

# SQS uses Polling Model vs RabbitMQ uses Push Model

- In SQS, the standard model is "pull" (polling), where your application has to actively ask for new messages
- SQS (Pull) is a stateless HTTP-based service. It doesn't keep a "pipe" open to your servers. Instead, your consumers make a standard web request to the SQS endpoint to fetch data
- In RabbitMQ, the broker "pushes" messages to your consumers as soon as they are available
- RabbitMQ (Push) maintains an open, persistent connection (often using the AMQP protocol) between the server and the consumer. The moment a message hits the queue, RabbitMQ sends it down that open pipe

---

- Short Polling
  - WaitTimeSeconds = 0 (Immediate)
- Ling Polling (recommended)
  - WaitTimeSeconds > 0 (up to 20s)
