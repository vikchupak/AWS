### AWS Event Source Mapping (ESM)

**Event Source Mapping is exclusively a Lambda concept.**

**Event Source Mapping (ESM)** is a configuration that connects an **event source** to an **AWS Lambda function** so Lambda can automatically retrieve and process events.

Think of it as:

```text
[Event Source] → [Event Source Mapping] → [Lambda Function]
```

### How it works

* Lambda **polls** the event source for new messages/events.
  - Lambda does NOT sit passively waiting to be pushed to. Instead, Lambda actively polls events stream for new records — 4 times per second by default.
  - Who initiates the call? => Lambda service
* When events are available, Lambda **invokes the function** with a batch of events.
* The function processes the batch.
* Lambda continues polling for new events.

### Common event sources

ESM is mainly used with **poll-based sources**:

| Event source                    | How Lambda gets events        |
| ------------------------------- | ----------------------------- |
| **Amazon SQS**                  | Polls messages from the queue |
| **Amazon Kinesis Data Streams** | Polls stream shards           |
| **Amazon DynamoDB Streams**     | Polls stream records          |
| **Amazon MSK**                  | Polls Kafka topics            |
| **Self-managed Apache Kafka**   | Polls Kafka topics            |

### Example: SQS

```text
┌──────────────┐
│   SQS Queue  │
└──────┬───────┘
       │
       │ poll messages
       ▼
┌──────────────────────┐
│ Event Source Mapping │
└──────────┬───────────┘
           │ batch
           ▼
┌──────────────────────┐
│   Lambda Function    │
└──────────────────────┘
```

Suppose 10 messages are in SQS:

```text
SQS
 ├─ Message 1
 ├─ Message 2
 ├─ ...
 └─ Message 10
       ↓
Event Source Mapping
       ↓
Lambda(event = [10 messages])
```

The ESM controls things such as:

* **Batch size** — how many records Lambda sends per invocation.
* **Batching window** — how long Lambda waits to accumulate records.
* **Concurrency** — how many Lambda invocations can process events.
* **Starting position** — important for streams such as Kinesis.
* **Error handling** — e.g. retry behavior and partial batch responses.

### Important distinction

An Event Source Mapping is **not the same as an EventBridge rule**.

|                 | Event Source Mapping                  | EventBridge           |
| --------------- | ------------------------------------- | --------------------- |
| Model           | **Lambda polls source**               | **Event-driven push** |
| Typical sources | SQS, Kinesis, DynamoDB Streams, Kafka | EventBridge event bus |
| Main purpose    | Consume records/messages              | Route events          |
| Lambda polling? | **Yes**                               | **No**                |

**Simple way to remember:**

> **Event Source Mapping = "Lambda, go and get events from this source."**
