# Dynamo DB

- https://www.youtube.com/watch?v=2X2SO3Y-af8 (key concepts)
- https://www.youtube.com/watch?v=FQrN5aJWa_U (practical example via console)
- https://www.youtube.com/watch?v=QoLlM5ax568 (practical example vai cli)
- https://www.youtube.com/watch?v=vl14y3sMkt4 (data modelling)

---

- Item attribute names are always strings
  ```json
  {
    "customerId": ...,
    "orderId": ...,
    "amount": ...
  }
  ```
- Primary/index partition key value and sorting key value must be `top-level attributes` and a scalar type:
  - String
  - Number
  - Binary
- 
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
 
---

Tables are schemaless - we don't have to define attributes(columns) on table level. We can create items(rows) with any attributes.

<img width="751" height="493" alt="image" src="https://github.com/user-attachments/assets/8242e991-06f0-4125-a400-a4ccf4d539fe" />

---

- Table has only one primary key that defines each row uniquely.
- `primary key = {table partition key}:{table sorting key(optional)}`
- primary key must be unique
- in pimary key, gsi, lsi, partition key doesn't have to be unique

- `global secondary index = {non table partition key:any sorting key(optional)}`
- `local secondary index` = `{table partition key}:{non table sorting key}`

## JSON

- Classic JSON to DynamoDB JSON
  - https://dynobase.dev/dynamodb-json-converter-tool/
- It is not possible to create index on nested data like Map or List, (Set?) for efficient search
- Map is not JSON-as-string
  - Nested Access: You can use DynamoDB's document path syntax to access, update, or conditionally write on the individual nested keys and values within the map without reading or writing the entire map content. This is a significant advantage over storing it as a string.
