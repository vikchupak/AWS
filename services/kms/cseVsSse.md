# S3 Client-Side Encription (CSE)

- Flow. User/App -(encripted data)-> S3 -(encripted data)-> S3 Storage

- Client asks KMS for DEK + Encrypted DEK
- Client encrypts data using DEK + attaches encrypted DEK as metadata and sends encripted data to S3
- Client gets a object from S3. Extracts encrypted DEK from object metadata
  - Asks KMS to decrypt DEK and send it back
  - Client uses DEK to decrypt the object

---
  
- AWS KMS optionally generates CMK and DEK keys for you(only DEK is sent to client). CMK stored on AWS side.
- We can generate CMKs youself locally(without KMS), then we have to store and manage CMK on client side.

# S3 Server-Side Encription (SSE)

- Flow. User/App -(NOT-encripted data)-> S3 -(encripted data)-> S3 Storage
- S3 encrypts data

---

- **SSE-S3** `Server-Side Encription with Amazon S3-managed Keys` (AES256 algorithm) - default
  - Use `AWS managed keys` stored in AWS KMS
  - S3(AWS) creates, manages, and uses encription keys
  - Not possible to set policies on the keys. They are completely managed by AWS
- **SSE-KMS** `Server-Side Encription with KMS Keys stored in AWS KMS` - recommended. Can be set as default
  - Use `Customer managed keys` stored in AWS KMS
  - You set policies to set granular permissions and manage the key
- **SSE-C** `Server-Side Encription with Customer-provided Keys`
  - Use `own keys` stored and managed on client side
  - Client provides the encryption key with every request
  - AWS S3 uses this key to encrypt/decrypt data
  - AWS does not store the key — only uses it in memory
  - No policies as keys are NOT in AWS

<img width="1305" height="636" alt="image" src="https://github.com/user-attachments/assets/5f12e9e0-f04e-4af9-bc63-d40a7a9ab136" />
