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
- Wide-Column Databases (Wide-Column Stores)
  - Apache Cassandra | DynamoDB (No SQL)
  - BigQuery (SQL)
- Document Store
  - MongoDB (No SQL)
- Key-Value Store
  - Redis

---

- OLTP (Online **Transaction** Processing)
  - PostgreSQL
  - MySQL
  - Oracle DB
  
- OLAP (Online **Analytical** Processing)
  - Google BigQuery
  - Amazon Redshift
  - Snowflake

- Data Warehouse
  - A Data Warehouse is a central repository that stores large amounts of data from many different sources within an organization. Think of it as a "digital library" where data is cleaned, organized, and archived
 
### OLAP is Data Warehouse?

Not exactly. While they are very closely related, they aren't the same thing.
The best way to think about it is: The Data Warehouse is the "Library," and OLAP is the "Librarian."

### The Key Distinction
- Data Warehouse (The Container): This is the physical (or cloud) storage location where all your historical data from different sources is collected, cleaned, and organized.

- OLAP (The Technology): This is the computational process or "engine" that sits on top of the warehouse. It allows you to actually query, slice, and analyze that data from different perspectives.

---

DynamoDB is best described as:

* ✅ Key-Value database
* ✅ Wide-column database
* ✅ Document store hybrid
* ❌ NOT a true analytical column store
