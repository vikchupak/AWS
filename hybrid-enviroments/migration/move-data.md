## Move data(storage) to S3/EFS/FSx/EBS

### Snowball family

Move large amount of data IN and OUT of AWS **offline**

- **Snowball (legacy)**
  - Physical storage units
  - Data encrypted using KMS
  - Storage ONLY
  - 50TB or 80TB 1 unit/device capacity
  - 10TB - 10PB data range transfer is economically reasonable to use snowball over internet
- **Snowball edge**
  - **RETIRING, Dec 31, 2026**
  - Physical storage units
  - Data encrypted using KMS
  - BOTH Storage and Compute
  - Larger Storage capacity and transfer speed than in Snowball
  - Types
    - Storage-Optimized
      - 80TB, 24vCPU, 32Gib RAM
    - Storage-Optimized with EC2
      - The same as Storage-Optimized, but with 1TB SSD
    - Compute-Optimized
      - 100TB+7.68 NVME, 52vCPU, 208Gib RAM
    - Compute-Optimized with GPU
      - The same as Compute-Optimized, but with a GPU
- **Snowmobile**
  - Literally a truck
  - When more than 10PB data to transfer

### AWS Data Transfer Terminal

- YOU bring your storage device TO an AWS facility
- You plug in and upload directly via 100 Gbps fiber
- You leave with your device
- Data is already in AWS instantly

```txt
┌──────────────────────────┬──────────────────────────┬───────────────────────────┐
│ Feature                  │ AWS Snowball Edge        │ AWS Data Transfer         │
│                          │                          │ Terminal                  │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ How it works             │ AWS ships device to you  │ You go to AWS facility    │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Data transfer method     │ Physical device shipping │ Direct fiber connection   │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Network speed            │ N/A (physical shipping)  │ Up to 100 Gbps fiber      │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Time to data in AWS      │ Days (shipping + upload) │ Minutes to hours          │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Storage capacity         │ Up to 210 TB per device  │ Limited by your device    │
│                          │ Cluster: up to 16 devices│ and session duration      │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Edge compute             │ ✅ YES                   │ ❌ NO                      │
│                          │ Run EC2, Lambda, K8s     │ Upload only               │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Works offline            │ ✅ YES                   │ ❌ NO                      │
│ (no internet needed)     │ Fully disconnected       │ Needs facility access     │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ You keep your device     │ ❌ NO                    │ ✅ YES                     │
│                          │ AWS device, return it    │ Bring your own device     │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Device custody           │ You lose custody         │ You keep custody          │
│                          │ during shipping          │ throughout                │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Destinations             │ Amazon S3                │ Amazon S3, Amazon EFS     │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Availability             │ Ships to your location   │ Physical locations only   │
│                          │ (most regions)           │ SF, LA, NYC, Munich,      │
│                          │                          │ London, Paris, Sydney,    │
│                          │                          │ Tokyo, Seattle, Phoenix   │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Who can use it           │ Any AWS customer         │ AWS Enterprise Support    │
│                          │                          │ customers only            │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Billing model            │ Per job + device days    │ Per hour (on-demand)      │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ Current status           │ ⚠️ RETIRING              │ ✅ ACTIVE & EXPANDING      │
│                          │ Dec 31, 2026             │ (launched re:Invent 2024) │
└──────────────────────────┴──────────────────────────┴───────────────────────────┘
```

### Alternatives to AWS Snowball Edge

```txt
┌─────────────────────────────────────────────────────────────┐
│  ⚠️  AWS Snowball Edge will NO LONGER accept new customers   │
│      after December 31, 2026                                │
│                                                             │
│  AWS recommends alternatives:                               │
│  → AWS DataSync        (online transfers)                   │
│  → AWS Data Transfer Terminal (physical transfers)          │
│  → AWS Outposts        (edge computing)                     │
│  → AWS Partner solutions (edge computing)                   │
└─────────────────────────────────────────────────────────────┘
```

### AWS DataSync

Move large amount of data IN and OUT of AWS **online**

- [Doc](https://aws.amazon.com/datasync/)
- 10Gibs
- Cost is per 1GB for data moved
- Encryption in-transit (TLS)
- Architecture
  - Run DataSync **Agent** on-prem
  - [Exam question](https://portal.tutorialsdojo.com/courses/aws-certified-solutions-architect-associate-practice-exams/lessons/practice-exams-review-mode-4/quizzes/aws-certified-solutions-architect-associate-practice-exam-review-mode-set-4/)
  - Use NFS or SMB protocol to connect to on-prem storage
  - On-prem DataSync Agent connects to DataSync Endpoint in AWS
  - Connection. Storage (on-prem) -> NFS or SMB protocol -> DataSync Agent (on-prem) -> TLS -> DataSync Endpoint (AWS) -> EFS, FSx, or S3 (AWS)
-  You can configure DataSync to make an initial copy of your entire dataset and **schedule subsequent incremental transfers of changing data toward Amazon S3**
-  AWS DataSync is primarily used to migrate existing data to Amazon S3
-  Enabling S3 Object Lock prevents your existing and future records from being deleted or overwritten
