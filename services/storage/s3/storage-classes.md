# S3 Storage Classes

- [Official doc](https://aws.amazon.com/s3/storage-classes/)
- [Pricing](https://aws.amazon.com/s3/pricing/)

---

<img width="913" height="785" alt="image" src="https://github.com/user-attachments/assets/fe87c158-4213-427d-864c-50aa384f0923" />

Minimum Storage Duration = A BILLING Concept.

❌ It does NOT mean your files are locked and cannot be deleted. ✅ It means you will be charged as if the files were stored for that minimum period, even if you delete them earlier.

---

- S3 Standard (Better for frequently accessed important/non-replaceable data)
  - Replicated across at least 3 AZs in a region
  - **"Milliseconds" first byte latency**
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
  - **"Milliseconds" first byte latency**
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
    - **"Milliseconds" first byte latency**
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
    - **No "Milliseconds" first byte latency**
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
    - **No "Milliseconds" first byte latency**
      - Access time
        - Standard (12 hours)
        - Bulk (up to 48 hours)
       
    <img width="654" height="263" alt="image" src="https://github.com/user-attachments/assets/58d0c476-e6ef-4fe5-97b2-e032834aa648" />

---

- Amazon S3 Intelligent-Tiering
  - Automatically moves your data to the most cost-effective storage class (Machine lerning is used for that)
