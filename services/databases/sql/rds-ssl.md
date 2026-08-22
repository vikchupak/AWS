# RDS for PostgreSQL - Server-side TLS enforcement

By default, `RDS for PostgreSQL` enforces ssl connection.

This can be disabled using `custom rds parameter group`, set `rds.force_ssl=0`

<img width="1881" height="536" alt="image" src="https://github.com/user-attachments/assets/bbcd5d91-db1f-4102-b32a-d72ef2e5c4fe" />


# Server & CA (Certificate Authority) certificates

- **RDS server certificate**
  - This identifies the specific RDS server
  - Always stored server-side
  - Used during the TLS handshake
- **RDS CA (Certificate Authority) certificate**
  - Used by client to verify "RDS server certificate" can be trusted
  - Client configures which CA it trusts

# Client-side TLS / SSL configuration

- **To establish ssl connection, the client has to configure RDS CA certificate**
- If `rds.force_ssl=0`, the client can still connect via http 

# Server-side TLS enforcement

- If `rds.force_ssl=1`, the client is forced to configure RDS CA certificate to always connect via https
