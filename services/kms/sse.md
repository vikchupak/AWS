# S3 Client-Side Encription

User/App -(encripted data)-> S3 -(encripted data)-> S3 Storage

- Client encrypts data

# S3 Server-Side Encription (SSE)

User/App -(NOT-encripted data)-> S3 -(encripted data)-> S3 Storage

- S3 encrypts data

---

- Data encription key (DEK)

---

- Server-Side Encription with Customer-provided Keys (SSE-C)
  - Use own keys
- Server-Side Encription with Amazon S3-managed Keys (SSE-S3 | AES256 algorithm) - default
  - Use `AWS managed keys`
  - S3(AWS) creates, manages, and uses encription keys
- Server-Side Encription with KMS Keys stored in AWS KMS (SSE-KMS)
  - Use `Customer managed keys` to set policies to set granular permissions

<img width="1305" height="636" alt="image" src="https://github.com/user-attachments/assets/5f12e9e0-f04e-4af9-bc63-d40a7a9ab136" />
