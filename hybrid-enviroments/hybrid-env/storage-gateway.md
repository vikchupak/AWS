## AWS Storage Gateway

- AWS hybrid storage service
- Connect on-premises with AWS cloud storage
  - Keep applications on-prem, but use AWS for storage, backup, or archiving
- Integrates with AWS S3, EBS, Glacier
- Usually run as a VM on-premises
  - Act as a bridge between local on-prem storage and AWS storage
  - Connection. Storage Gateway VM (on-prem) -> Storage Gateway Endpoint (AWS) 
- Represents storage using protocols
  - Internet Small Computer Systems Interface (iSCSI)
    - Block-level storage protocol
    - Presents `Raw Block Storage` (Raw disk)
    - Used by **Volume Gateway**
  - Network File System (NFS) (Linux/Unix)
    - File-level storage protocol
    - Used by **File Gateway**
  - Server Message Block (SMB) (Windows)
    - File-level storage protocol
    - Used by **File Gateway**

### Deploy options

<img width="447" height="256" alt="image" src="https://github.com/user-attachments/assets/2fc6cfac-1234-4a04-a6a0-f9fb18366936" />

The AWS Storage Gateway **Hardware Appliance** is a physical, standalone server that comes pre-loaded with AWS Storage Gateway software. It is designed for organizations that need on-premises compute resources without relying on virtualization (no VMware, Hyper-V, or KVM required).

### Volume Gateway

Let on-premises applications use block storage (disk volumes) while the data is stored in Amazon S3

- **Stored volumes (just for buckups in AWS)**
  - **Primary Storage is Gateway VM on-prem locally**
    - Store the entire set of volume data on-premises and store periodic point-in-time backups (snapshots) in AWS
  - Data is automatically asynchronously copied to **AWS S3** as EBS snapshots
  - Pros & Corns
    - Pros
      - Primary storage copy is on-prem local -> Low latency
      - Full disk backups
      - Create EBS volumes in AWS for Disaster Recovery
    - Corns
      - Primary storage copy is on-prem local -> Need to have storage capacity locally
  - Limitations
    - 32 Volumes per Gateway
    - 16TB per volume
    - 512TB per Gateway

- **Cached volumes**
  - The same as Stored volumes setup, but
    - **Primary storage is Amazon S3**
      - Store volume data in AWS, with a small portion of recently accessed data in the cache on-premises
    - Frequently accessed data is cached on Storage Gateway VM on-prem locally
    - Known as Data Center Extension architecture
      - Storage appears on-promises, but it is actually in AWS
    - Pros & Corns
      - Pros
        - Create EBS volumes in AWS for Disaster Recovery
        - Save local storage capacity
    - Limitations
      - 32 Volumes per Gateway
      - 32TB per volume
      - 1PB per Gateway

### Tape Gateway or Virtual Tape Library (VTL)

Let on-premises backup software store data on virtual tape library backed by Amazon S3

- Emulates a physical tape library on-premises so legacy backup software can store backups in AWS S3 and Glacier without changing workflows
  - A software-based tape library that looks like a real tape library to your backup software
- "Traditional" Tape Library consists of `Media Changer` + `Tape Drive` + `Tape Library`
- Backup server connects to tape library via `iSCSI` protocol
- On-prem runs a VM to emulate a tape library physical "interface" (Media Changer + Tape drive)
  - **Primary storage is Amazon S3**
  - Data is async copied to AWS VTL (backed by S3, Glacier)
  - Data actively used is cached on VM on-prem locally
  - Connection. Backup server -> VM (On-prem) with emulated VTL "inteface" -> Storage Gateway Endpoint (AWS) -> VTL

### Amazon S3 File Gateway

Let on-premises applications use file storage while the files are stored in Amazon S3

- You deploy a Storage Gateway VM on-prem
  - It exposes shares
    - NFS (Linux/Unix)
    - SMB (Windows)
- On-premises servers mount shares exposed by the Storage Gateway VM using standard NFS or SMB protocols
- Storage Gateway (VM)
  - Stores all files as objects in S3
    - **Primary storage is Amazon S3**
    - Traffic between the gateway and AWS uses HTTPS
    - Each file becomes an S3 object
  - Caches frequently accessed data locally
  - Syncs metadata automatically
- Files in S3 are visible in AWS
- Bucket share = Link `AWS bucket <-> On-prem file share`
- Connection. On-prem server -> NFS/SMB protocol -> Storage Gateway VM (with shares) -> AWS Storage Gateway Endpoint -> Amazon S3

---

Local SMB Share: The AWS Storage File Gateway virtual machine runs inside your on-premises data center and exposes an SMB share over your local network. Your on-premises servers map that SMB share (e.g., \\file-gateway\backups)

- You decide local cache size - files accessed instantly
- There is some delay accessing non cached files

Stage 1: The Local Write (Instant)

1. Your server sends the file to the SMB share (\\file-gateway\backups).
2. The File Gateway saves the file directly onto its **local cache** disk in your on-premises data center.
3. Once it is safely written to the local disk, the gateway immediately tells your server: "Write complete!"

Stage 2: The S3 Upload (Asynchronous)

1. Immediately after saving to the local cache, the File Gateway begins uploading the file to your Amazon S3 bucket over the internet/VPN in the background.
2. It uses optimized, parallel multipart uploads and HTTPS encryption.
3. Once the upload finishes, the file is fully backed up and durable in AWS S3.
