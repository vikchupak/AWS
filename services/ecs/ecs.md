# ECS

- Container Definition
  - Defines the image and settings for a Single Container
  - Image & ports
  - CPU/memory limits for that specific container, environment variables
- Task Definition
  - Is the blueprint that groups Container Definitions
  - Security (**Task Role**)
  - Total CPU/memory for the entire task
- Task
  - Is a running instance of a Task Definition
- Service
  - Manages and scales multiple Tasks
  - It ensures that a specific number of Tasks are running at all times

---

- 1 Container Instance = 1 EC2 Instance

```txt
+-------------------------------------------------------------+
|                  1 EC2 / Container Instance                 |
|  (e.g., 4 vCPUs, 16 GB RAM)                                 |
|                                                             |
|  +-----------------+  +-----------------+  +-------------+  |
|  |   Container A   |  |   Container B   |  | Container C |  |
|  |  (0.5 vCPU/1GB) |  |  (0.5 vCPU/1GB) |  | (1 vCPU/2GB)|  |
|  +-----------------+  +-----------------+  +-------------+  |
|                                                             |
|  [ Remaining Idle Capacity: 2 vCPUs, 12 GB RAM ]            |
+-------------------------------------------------------------+
```
