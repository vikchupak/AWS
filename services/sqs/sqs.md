# Simple Queue Service (SQS)

- SQS Standard
  - Oprimazed for speed and scale, so **order is NOT guaranteed**
  - A message is `deleverd at-least-once`
- SQS FIFO
  - Garanties order
  - A message is `exactly-once`
- Pay for requests to SQS, not messages sent/pulled
  
---

- Visibility Timeout
  - Time the message is "hidden" while being processed by consumer
- ASG can scale based on Queue Length

<img width="1275" height="721" alt="image" src="https://github.com/user-attachments/assets/af823a18-f6d7-4aa0-932c-20888ef9fff1" />
