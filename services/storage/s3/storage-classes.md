# S3 Storage Classes

- [Official doc](https://aws.amazon.com/s3/storage-classes/)
- [Pricing](https://aws.amazon.com/s3/pricing/)

---

<img width="700" alt="image" src="https://github.com/user-attachments/assets/db9affb9-0e6a-468a-a442-89fa12d8c361" />

- **`Minimum Storage Duration`** and `Minimum Duration Charge` are the same thing.
  - A BILLING Concept
  - **Minimum Storage Duration - AWS documentation term**
  - Minimum Duration Charge - the billing/cost perspective of the same concept
  - ❌ It does NOT mean your files are locked and cannot be deleted
  - ✅ It means you will be charged as if the files were stored for that minimum period, even if you delete them earlier

---

- S3 Express One Zone (**NEW**)
  - 1 AZ
  - **"Single-digit milliseconds" first-byte latency (10x faster than Standard)**
  - Billed for
    - GB data stored (higher storage cost than S3 Standard)
    - 1000 requests (lower request cost than S3 Standard)
- S3 Standard (Better for frequently accessed important/non-replaceable data)
  - Replicated across at least 3 AZs in a region
  - **"Milliseconds" first-byte latency**
  - Billed for
    - GB data stored
    - GB transfer OUT
    - 1000 requests
- S3 Standard-IA (Infrequent Access) (Better for infrequent accessed important/non-replaceable data)
  - Replicated across at least 3 AZs in a region
  - "Milliseconds" first byte latency
  - Billed for
    - GB data stored (cheaper than S3 Standard)
    - GB transfer OUT (cheaper than S3 Standard)
    - 1000 requests (cheaper than S3 Standard)
    - GB retrival
    - **Min duration charge of 30 days**
    - Min size/capacity charge of 128KB per object
  <img width="737" height="331" alt="image" src="https://github.com/user-attachments/assets/7bbcf0b6-1a2d-4555-bb39-5ac03617cb29" />

- S3 One Zone-IA (Better for infrequent accessed non-important/replaceable data)
  - Like S3 Standard-IA
  - Replicated within 1 AZ
  - **"Milliseconds" first-byte latency**
  - Billed for
    - GB data stored (costs about 20% less than Standard-IA)
    - GB transfer OUT (costs about 20% less than Standard-IA)
    - 1000 requests (costs about 20% less than Standard-IA)
    - GB retrival
    - **Min duration charge of 30 days**
    - Min size/capacity charge of 128KB per object

---

Archive classes

- S3 Glacier Instant Retrieval
  - Like S3 Standard
    - Replicated across at least 3 AZs in a region
    - **"Milliseconds" first-byte latency**
    - Billed for
      - GB data stored
      - GB transfer OUT
      - 1000 requests
  - But
    - Data accessed once per quarter
    - GB data storing is cheaper
    - **Longer Min duration charge of 90 days**
    - More expensive retrieval
  
  <img width="652" height="280" alt="image" src="https://github.com/user-attachments/assets/790fbb21-d96f-46f5-9754-59c492da4cb0" />

- S3 Glacier Flexible Retrieval **(S3 Glacier)**
  - Like S3 Standard
  - But
    - **No "Milliseconds" first-byte latency**
      - Access time
        - Expedited (1-5 min)
          - Supports **Provisioned capacity**
            - Each unit of capacity provides that at least three expedited retrievals can be performed every five minutes and provides up to 150 MB/s of retrieval throughput
        - Standard (3-5 hours)
        - Bulk (5-12 hours)
    - Objects can't be public
    - **Longer Min duration charge of 90 days**
    - Min size/capacity charge of 40 KB per object
- S3 Glacier Deep Archive
  - Like S3 Glacier Flexible Retrieval
  - But
    - **Longer Min duration charge of 180 days**
    - **No "Milliseconds" first-byte latency**
      - Access time
        - Standard (12 hours)
        - Bulk (up to 48 hours)
       
    <img width="654" height="263" alt="image" src="https://github.com/user-attachments/assets/58d0c476-e6ef-4fe5-97b2-e032834aa648" />

---

- S3 Intelligent-Tiering
  - Automatically moves your data to the most cost-effective storage class (Machine lerning is used for that)

# Transition constraints

### Minimum Time Constraints (Days)

There is a time constraint in transitioning objects from **S3 Standard storage class**.

<img width="359" height="212" alt="image" src="https://github.com/user-attachments/assets/a8611bcf-7ef6-4187-aac1-e8a8d74af28f" />

### Allowed vs. Not Allowed Transitions

Not all transitions between storage classes are supported:

<img width="461" height="207" alt="image" src="https://github.com/user-attachments/assets/c8f75de3-ae9b-4136-b150-ad49806caefe" />

### Minimum Storage Duration Charges

<img width="328" height="180" alt="image" src="https://github.com/user-attachments/assets/c0e56827-8180-46fa-b6b6-5b1995af49ea" />

### Minimum Object Size Constraint

By default, objects smaller than 128 KB cannot be transitioned to most storage classes. This is because the overhead costs outweigh the savings.

- Default behavior: Objects < 128 KB are blocked from transitioning to any storage class
- Exception: Glacier Flexible Retrieval and Glacier Deep Archive can accept objects < 128 KB
- Override: You can customize this by adding an ObjectSizeGreaterThan or ObjectSizeLessThan filter to your lifecycle rule

### One-Way Transition Rule (No Going Back)

Transitions can only go "downward" in the storage hierarchy — you cannot transition back to a higher-tier storage class via lifecycle rules:

```txt
S3 Standard → Standard-IA → One Zone-IA → Glacier IR → Glacier Flexible → Deep Archive
                                                                              ⬆️ NO going back
```

- ❌ You cannot transition from Glacier back to Standard via lifecycle
- ❌ You cannot transition from Deep Archive to Glacier Flexible via lifecycle
- ✅ To restore, you must use a restore request, not a lifecycle rule

If you want to permanently change the storage class back to S3 Standard, you need to:

- Restore the object first
  - What "Restore" Actually Means
    - A temporary copy is made available in S3 Standard for a **specified number of days**
    - The original object remains in Glacier/Deep Archive
    - After the restore period expires, the temporary copy is deleted automatically
- Once restored, re-upload or copy the object and explicitly set the storage class to S3 Standard
