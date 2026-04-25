# S3 Client-Side Encription (CSE)

- Flow. User/App -(encripted data)-> S3 -(encripted data)-> S3 Storage
- Client encrypts data

---

- **CSE using KMS key (uses AWS Key Management Service as master key source)**
  - Upload/Encrypt
    - Client asks KMS for DEK + Encrypted DEK
    - Client encrypts data using DEK + attaches encrypted DEK as metadata and sends encrypted data to S3
  - Download/Decrypt
    - Client gets a object from S3. Extracts encrypted DEK from object metadata
      - Asks KMS to decrypt DEK and send it back
      - Client uses DEK to decrypt the object

- **CSE using client-side master key (no AWS Key Management Service involved)**
  - We can generate CMKs youself locally(without KMS), then we have to store and manage CMK on client side.
  - Upload/Encrypt
    - Client generates (once) the client-side master key
      - Via crypto library (e.g., AES-256 key) or similar
      - Stored in
        - HSM
        - Secure vault
    - Client generates a random DEK locally using **the Amazon S3 encryption client**
    - Client encrypts the DEK using the client-side master key (using **the Amazon S3 encryption client**)
    - Client encrypts data using DEK + attaches encrypted DEK as metadata and sends encripted data to S3 (using **the Amazon S3 encryption client**)
  - Download/Decrypt
    - Client gets a object from S3. Extracts encrypted DEK from object metadata
      - Uses client-side the master key to decrypt DEK
      - Client uses DEK to decrypt the object

# S3 Server-Side Encription (SSE)

- Flow. User/App -(NOT-encripted data)-> S3 -(encripted data)-> S3 Storage
- S3 encrypts data

---

- **SSE-S3** `Server-Side Encription with Amazon S3-owned Keys` (AES256 algorithm) - default
  - Uses `S3-owned keys` (AWS owned keys)
  - S3 creates, manages, and uses encription keys
  - Not possible to set policies on the keys. They are completely managed by AWS
  - SSE-S3 does not use KMS under the hood
    - Everything happens inside S3, no KMS API calls are involved
      - AWS-managed HSMs are still used, but they bypass KMS
    - The Master key + DEK principles are the same like when using KMS
    - No master key is visible to the user
    - **Note:** There is `default S3 KMS key` to select in account
      - This key is **AWS managed key** (LEGACY since 2021)
        - Don't be confused by this key. It is not S3-owned key (AWS owned key)
- **SSE-KMS** `Server-Side Encription with KMS Keys stored in AWS KMS` - recommended. Can be set as default
  - Uses `Customer managed keys` stored in AWS KMS
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
