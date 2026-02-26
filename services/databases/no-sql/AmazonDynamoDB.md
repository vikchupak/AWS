# Amazon DynamoDB

- **Public** Database-as-a-service
- Key-value & document
- Serverless
- Operates within **a single AWS Region**

---

- https://www.youtube.com/watch?v=2X2SO3Y-af8 (key concepts)
- https://www.youtube.com/watch?v=FQrN5aJWa_U (practical example via console)
- https://www.youtube.com/watch?v=QoLlM5ax568 (practical example vai cli)
- https://www.youtube.com/watch?v=vl14y3sMkt4 (data modelling)

## On-demand vs provisioned capacity

- Provisioned capacity
  - Manually set RCUs & WCUs
  - If CUs exceed -> throttling happens
- On-demand
  - Automatically scales up and down

---

- It is **key-value** database
  - All value types:
    - String
    - Number
    - Binary
    - Boolean
    - Null
    - List > **JSON** array **(can be considered as a document)**
    - Map > **JSON** object **(can be considered as a document)**
    - Set > Set of type String, Number, Binary
- Item attribute names are always strings
  ```json
  {
    "customerId": ...,
    "orderId": ...,
    "amount": ...
  }
  ```
- Primary / index partition key value and sorting key value must be `top-level attributes` and a `scalar type`:
  - String
  - Number
  - Binary
 
---

Tables are **schemaless - we don't have to define attributes(columns) on table level**. We can create items(rows) with any attributes.

<img width="751" height="493" alt="image" src="https://github.com/user-attachments/assets/8242e991-06f0-4125-a400-a4ccf4d539fe" />

---
- `PK` stands for `partition key`
- `SK` stands for `sorting key`
- Table has only one primary key that defines each row uniquely.
- `primary key = {table partition key}:{table sorting key(optional)}`
- primary key must be unique and define each item(row) uniquely
- `local secondary index (LSI)` = `{table partition key}:{non table sorting key}`
  - Can't be added or removed after table creation
  - DynamoDB limits you to 5 LSIs per table
  - LSIs consume the same RCUs/WCUs as the base table
  - We can set what attributes are projected(included) into index
    - the base table’s primary key is always projected into the LSI, regardless of the projection type
    - If an attribute is not projected, it can still be received, but it is inefficient
- `global secondary index (GSI) = {non table partition key:any sorting key(optional)}`
  - Can be created at any time
  - DynamoDB limits you to 20 GSIs per table
  - GSIs consume their own RCUs/WCUs
  - We can set what attributes are projected(included) into index
    - Base table primary key is NOT automatically included unless you explicitly add it to the projection
    - If an attribute is not projected, it can still be received, but it is inefficient

---

- Strongly consistent reads are only possible on the base table and LSIs
- Reads from a GSI is eventually consistent reads

## JSON

- Classic JSON to DynamoDB JSON
  - https://dynobase.dev/dynamodb-json-converter-tool/
- It is not possible to create index on nested data like Map or List, (Set?) for efficient search
- Map is not JSON-as-string
  - Nested Access: You can use DynamoDB's document path syntax to access, update, or conditionally write on the individual nested keys and values within the map without reading or writing the entire map content. This is a significant advantage over storing it as a string.

### Streams

- Time-ordered list of table item changes (inserts, updates, deletes) for 24 hours
- Enabled per table basis
- Stream has 4 view types
  - `KEYS_ONLY`
  - `NEW_IMAGE`
  - `OLD_IMAGE`
  - `NEW_AND_OLD_IMAGES`
- Item change can generate an event with data changed
  - The event can be sent to lambda, so creating **a trigger** using a DynamoDB stream and a lambda

## DynamoDB Global Tables

- **Multi-regional**
- Cross-regional replication
- Multi-master replication. Means all tables support reads and writes
  - Reads and writes can occur in any region
    - sub-second replication
- **Last writer wins** for conflict resolution
- Strongly consistent reads ONLY in the same region as writes
- Global eventually consistent

## DynamoDB Accelerator (DAX)

- **In merory-cache** on AWS side. Layer between app and DynamoDB.
- Uses DAX SDK on app side
- DAX implements **Read-Through** & **Write-Through** Caching, so the app does't have to perform **Side-Cache** like with redis
- DAX cluster has to be **deployed within** a vpc in multi AZs
  - It has a Primary node for writes and Replicas nodes for reads
- Scales automatically

<img width="1270" height="714" alt="image" src="https://github.com/user-attachments/assets/517558e9-19dd-433b-b100-77616a046ab4" />

## DynamoDB TTL

- Enable on table
- Select attribute where to store delete timestamp
  - This attribute is scanned. The item is set to **EXPIRED** once match. Later another scan deletes expired items.
