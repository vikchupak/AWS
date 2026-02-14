# KMS

- Manage cryptographic keys
- [Official doc](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)

---

- KMS key
  - Key to encrypt/decrypt DEK
- Data Encription Key (DEK)
  - "Original" DEK - Plaintext DEK
  - Encrypted DEK - Ciphertext DEK

---

- Encrypt
  - You want to encrypt a file
  - KMS "asks" HSM to generate a KMS key or use an existing one
    - The KMS key is generated only once and stored inside HSM
    - The KMS key never leaves the HSM
  - KMS "asks" HSM to generate a DEK
    - The DEK is generated inside the HSM
    - KMS "asks" HSM to encrypt the DEK using the KMS key -> produces the encrypted DEK
      - **Neither** the original DEK **nor** encrypted DEK is **stored inside KMS/HSM** 
  - KMS sends both the original DEK(plaintext DEK) + the encrypted DEK to the client/server
  - Client/server uses the plaintext DEK to encrypt the file
    - After encryption, the plaintext DEK is discarded from memory
    - **The encrypted DEK** is stored alongside the encrypted file as metadata
- Decrypt
  - You want to decrypt a file
  - You have
    - The encrypted file
    - The encrypted DEK (stored as metadata with the file)
  - The client/server sends the encrypted DEK to KMS
  - KMS "asks" HSM to decrypt the encrypted DEK using the KMS key
    - The encrypted DEK contains metadata that identifies KMS key to use for decrypt
    - The HSM decrypts the encrypted DEK using the KMS key
    - The plaintext DEK is returned temporarily to the client/server
  - The client/server
    - Uses the plaintext DEK to decrypt the file
    - Removes the plaintext DEK from memory after decryption

---

- AWS owned keys
  - Collection of keys that are used and managed by AWS in multiple AWS accounts
- **Customer owned keys**
  - **AWS managed keys**
    - Created automatically by services
  - Customer managed keys
    - Created explicitly by customer
    - Are more configureable

---

# Key Policies

- Every EMS Key has `Key (resource-based) Policy`
  ```json
  {
    "Version": "2012-10-17",
    "Id": "auto-rds-2",
    "Statement": [
      {
        "Sid": "Allow access through RDS for all principals in the account that are authorized to use RDS",
        "Effect": "Allow",
        "Principal": {
          "AWS": "*"
        },
        "Action": [
          "kms:Encrypt",
          "kms:Decrypt",
          "kms:ReEncrypt*",
          "kms:GenerateDataKey*",
          "kms:CreateGrant",
          "kms:ListGrants",
          "kms:DescribeKey"
        ],
        "Resource": "*",
        "Condition": {
          "StringEquals": {
            "kms:ViaService": "rds.eu-central-1.amazonaws.com",
            "kms:CallerAccount": "353313230204"
          }
        }
      },
      {
        "Sid": "Allow direct access to key metadata to the account",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::353313230204:root"
        },
        "Action": [
          "kms:Describe*",
          "kms:Get*",
          "kms:List*",
          "kms:RevokeGrant"
        ],
        "Resource": "*"
      }
    ]
  }
  ```
- IAM identities sometimes need an IAM (Identity-based) policy in addition to the KMS key policy
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "kms:Encrypt",
          "kms:Decrypt"
        ],
        "Resource": "arn:aws:kms:us-east-1:123456789012:key/abcd-1234-efgh-5678"
      }
    ]
  }
  ```

---

**AWS services (like RDS, S3, EBS) do NOT always need IAM policies for encryption** because they often **use the key on your behalf**, not as an IAM principal.

### ✅ When IAM policy is needed

If your **IAM principal itself calls KMS**, for example:

* CLI (`aws kms encrypt`)
* SDK (`kms:Decrypt`)
* Lambda function encrypts/decrypts using KMS
* EC2 instance app decrypts data

Then you need:
  1. Key policy: allow use
  2. IAM policy: allow use

Because KMS evaluates both.

### ✅ When IAM policy is **NOT** needed

When a **managed AWS service** integrates with KMS to use the CMK on your behalf.

Example services:

* RDS
* S3
* EBS
* DynamoDB
* Secrets Manager
* SNS
* SQS
* CloudWatch

These services use the key via **their internal KMS principal**, not the identity of your app/user.

So if RDS performs encryption/decryption, it’s not “you” calling KMS — it's **RDS calling KMS for you**.

Thus: ✅ Key policy alone is sufficient.

# Example ecnrypting and decrypting using IAM user with proper IAM (identity-based) policy via CLI

Create a symetric customer managed key `catrobot` first

```bash
# Create file to encrypt
echo "find all the doggos, distract them with the yumz" > battleplans.txt

# Encrypt file
aws kms encrypt \
    --key-id alias/catrobot \
    --plaintext fileb://battleplans.txt \
    --output text \
    --query CiphertextBlob \
    | base64 --decode > not_battleplans.enc 

# Decrypt file
aws kms decrypt \
    --ciphertext-blob fileb://not_battleplans.enc \
    --output text \
    --query Plaintext | base64 --decode > decryptedplans.txt
```
