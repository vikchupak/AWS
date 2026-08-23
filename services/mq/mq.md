# Amazon Message Queuing (Amazon MQ)

- [Doc](https://aws.amazon.com/amazon-mq/)
- Managed Open-Source Message Broker
  - Based on `Apache Active MQ`
  - Supports JMS API, AMQP, MQTT, OpenWire, STOMP
  - Provides Queues and Topics within the same product
- VPC-based NOT public service
- Best when moving an existing application to AWS that already uses a traditional message broker like RabbitMQ or ActiveMQ
- Use SNS + SQS for most new implementations (default choice)

---

<img width="500" alt="image" src="https://github.com/user-attachments/assets/812d57a4-31fc-47b3-b001-46f67f244100" />

- **Amazon MQ**
  - Managed **message broker** service.
  - Helps migrate existing message-broker applications to AWS.
  - Supports **Apache ActiveMQ, RabbitMQ**, and other broker engines.
  - Enables communication between applications using different languages, OSs, and messaging protocols.

- **RabbitMQ cluster deployment**
  - Uses **3 RabbitMQ broker nodes** across multiple AZs.
  - Nodes are behind a **Network Load Balancer (NLB)**.
  - Nodes share **users, queues, and distributed state**.
  - Provides **high availability (HA)**.

- **Queue mirroring**
  - Each queue has **1 main node** and one or more **mirror nodes**.
  - Operations are first applied to the main node, then replicated to mirrors.
  - Amazon MQ automatically configures **classic queue mirroring** across the cluster.
  - Default policy:
    - `ha-mode = all` → replicate queues to all nodes.
    - `ha-sync-mode = automatic` → automatically synchronize mirrors.
  - Data is therefore replicated across AZs for better **durability and availability**.

- **Amazon MQ manages HA policies**
  - **Do not delete** the default system policy.
  - If deleted, Amazon MQ **recreates it automatically**.
  - Any custom policies on a clustered broker automatically receive the required HA settings.
  - If you specify different HA settings, Amazon MQ **overrides them** with the required cluster settings.
