# BD categorized by physical Storage types

- Row-oriented (Databases) Stores
  - Traditional databases store data record-by-record. If the database wants to read Row 1, it grabs the entire block containing all its attributes
  - Databases
    - Postgres (SQL)
- Column (Databases) Stores
  - Analytical databases store each column in its own separate file/block
  - Databases
    - Redshift (SQL)
    - ClickHouse (SQL)
  ```
  # Each column is stored contiguously
  Column1 (ID):      1, 2
  Column2 (Name):    John, Anna
  Column3 (Age):     25, 31
  Column4 (City):    London, Paris
  ```
- Wide-Column (Databases) Stores
  - Wide-column stores are "Row-oriented" but schemaless. Each row is like a mini-map where columns can exist or not
  - Databases
    - Apache Cassandra (No SQL)
    - DynamoDB (No SQL)
    - BigQuery (SQL)
  ```
  Row1: ID:1, Date:2024-01-01, Product:Laptop, Price:1200, Region:North
  Row2: ID:2, Date:2024-01-01, Product:Mouse, Price:25 (Notice: Region column is missing entirely)
  Row3: ID:3, Date:2024-01-02, Product:Laptop, Price:1200, Discount:5% (Notice: New "Discount" column added just for this row)
  ```
- Document Store
  - MongoDB (No SQL)
- Key-Value Store
  - Redis

---

- OLTP (Online **Transaction** Processing). Row/transaction.
  - PostgreSQL
  - MySQL
  - Oracle DB
  
- OLAP (Online **Analytical** Processing). Column based.
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
