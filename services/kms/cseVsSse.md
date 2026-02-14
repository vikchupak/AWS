# S3 Client-Side Encription (CSE)

- Flow. User/App -(encripted data)-> S3 -(encripted data)-> S3 Storage

---

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
  - Use `S3-managed keys`
  - S3 creates, manages, and uses encription keys
  - Not possible to set policies on the keys. They are completely managed by AWS
  - SSE-S3 does not use KMS under the hood
    - Everything happens inside S3, no KMS API calls are involved
      - AWS-managed HSMs are still used, but they bypass KMS
    - The Master key + DEK principles are the same like when using KMS
    - No master key is visible to the user
    - Note: There is default KMS-S3 key to select in account. This key is managed by KMS. So, don't be confused by this key
      - Real SSE-S3 keys are not managed by KMS
- **SSE-KMS** `Server-Side Encription with KMS Keys stored in AWS KMS` - recommended. Can be set as default
  - Use `Customer managed keys` stored in AWS KMS
  - You set policies to set granular permissions and manage the key
- **SSE-C** `Server-Side Encription with Customer-provided Keys`
  - Use `own keys` stored and managed on client side
  - Client provides the encryption key **("DEK like", but no real AWS KMS or DEK keys used)** with every request
  - AWS creates cryptographic hash of your key
    - It salts the key and hashes it
    - The hash is stored as part of the object metadata in S3
  - AWS S3 uses the key to encrypt/decrypt data
  - AWS does not store the key — only uses it in memory
  - No policies as keys are NOT in AWS

<img width="1305" height="636" alt="image" src="https://github.com/user-attachments/assets/5f12e9e0-f04e-4af9-bc63-d40a7a9ab136" />
