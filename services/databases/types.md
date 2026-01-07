# BD categorized by physical Storage types

- Row Store
  - Postgres (SQL)
- Column Databases (Column Stores)
  - Redshift (SQL)
  - ClickHouse (SQL)
  ```
  # Each column is stored contiguously
  IDs:      1, 2
  Names:    John, Anna
  Ages:     25, 31
  Cities:   London, Paris
  ```
- Wide-Column Databases
  - Apache Cassandra (No SQL)
  - BigQuery (SQL)

---

DynamoDB is best described as:

* ✅ Key-Value database
* ✅ Wide-column database
* ✅ Document store hybrid
* ❌ NOT a true analytical column store
