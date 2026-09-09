# Event types

Amazon S3 can publish notifications for the following events

| **Category** | **Event types** | **Description** |
| --- | --- | --- |
| **New object-created events** | `s3:ObjectCreated:*`<br>`s3:ObjectCreated:Put`<br>`s3:ObjectCreated:Post`<br>`s3:ObjectCreated:Copy`<br>`s3:ObjectCreated:CompleteMultipartUpload` | Amazon S3 APIs such as PUT, POST, and COPY can create an object. You can enable notifications for a specific API or use `s3:ObjectCreated:*` to receive notifications regardless of which API created the object.<br><br>You do not receive event notifications from failed operations. |
| **Object removal events** | `s3:ObjectRemoved:*`<br>`s3:ObjectRemoved:Delete`<br>`s3:ObjectRemoved:DeleteMarkerCreated` | Enables notifications when an object or batch of objects is removed from a bucket.<br><br>`s3:ObjectRemoved:Delete` — notification when an object is deleted or a versioned object is permanently deleted.<br><br>`s3:ObjectRemoved:DeleteMarkerCreated` — notification when a delete marker is created for a versioned object.<br><br>`s3:ObjectRemoved:*` — notification for any supported object deletion event.<br><br>You do not receive event notifications from automatic deletes performed by lifecycle policies or from failed operations. |
| **Restore object events** | `s3:ObjectRestore:Post`<br>`s3:ObjectRestore:Completed` | Notifications for object restoration from the S3 Glacier storage classes.<br><br>`s3:ObjectRestore:Post` — restoration initiated.<br><br>`s3:ObjectRestore:Completed` — restoration completed. |
| **Reduced Redundancy Storage (RRS) object lost events** | `s3:ReducedRedundancyLostObject` | Notification when Amazon S3 detects that an object stored using the RRS storage class is lost. |
| **Replication events** | `s3:Replication:OperationFailedReplication` | Notification when an object eligible for replication using Amazon S3 Replication Time Control fails to replicate. |
| **Replication events** | `s3:Replication:OperationMissedThreshold` | Notification when an object eligible for Amazon S3 Replication Time Control exceeds the 15-minute replication threshold. |
| **Replication events** | `s3:Replication:OperationReplicatedAfterThreshold` | Notification when an object eligible for Amazon S3 Replication Time Control is replicated after the 15-minute threshold. |
| **Replication events** | `s3:Replication:OperationNotTracked` | Notification when an object eligible for Amazon S3 Replication Time Control is no longer tracked by replication metrics. |

### Amazon S3 supports the following destinations where it can publish events:

1. Amazon Simple Notification Service (Amazon SNS) topic
2. Amazon Simple Queue Service (Amazon SQS) queue
3. AWS Lambda
