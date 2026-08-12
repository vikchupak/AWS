# S3 is Global

S3 is a global service with regional data placement

Why people call S3 “global”
- Global control plane
  - You can access S3 from anywhere in the world
- APIs like ListBuckets are global (per account)
  - Globally unique namespace
- Bucket names must be unique across all AWS accounts and regions
  - `my-app-logs-123` → only one in the entire world
- So it feels global

But where data actually lives
- Each bucket is
  - Created in one specific region
  - Data stored in that region
  - Automatically replicated across multiple AZs inside that region
