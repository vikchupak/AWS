# Dynamo DB

- https://www.youtube.com/watch?v=2X2SO3Y-af8 (key concepts)
- https://www.youtube.com/watch?v=FQrN5aJWa_U (practical example via console)
- https://www.youtube.com/watch?v=QoLlM5ax568 (practical example vai cli)

---

- It is **key-value** database
  - Types
    - String
    - Number
    - Binary
    - Boolean
    - Null
    - List > **JSON** array ?
    - Map > **JSON** object ?
    - Set > Set of type String, Number, Binary
- **Table primary partition/sorting key and index partition/sorting key must be `top-level attributes` and must be `type of`**
  - String
  - Number
  - Binary

## JSON

- Classic JSON to DynamoDB JSON
  - https://dynobase.dev/dynamodb-json-converter-tool/
- It is not possible to create index on nested data like Map or List, (Set?) for efficient search
