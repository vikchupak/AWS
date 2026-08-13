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

- **Scale ECS cluster (when High CPU) -> add more EC2 / Container instances**
- **Scaling ECS Service (when High Memory) -> spin up more containers (ECS Tasks)**

---

```text
+--------------------------------------------------------------------------------------------------+
|                                           ECS CLUSTER                                            |
|                                                                                                  |
|  +--------------------------------------------------------------------------------------------+  |
|  |                     CONTAINER INSTANCE (1 EC2 Instance: e.g., 4 vCPUs, 16 GB RAM)          |  |
|  |                                                                                            |  |
|  |  +--------------------------------------------------------------------------------------+  |  |
|  |  |  TASK 1 (Running instance of Task Definition A)                                      |  |  |
|  |  |  [Task Role Security | Shared Network | Total allocated CPU/Mem for Task 1]          |  |  |
|  |  |                                                                                      |  |  |
|  |  |  +-----------------------------------+      +-----------------------------------+    |  |  |
|  |  |  | CONTAINER A (from Container Def)  |      | CONTAINER B (from Container Def)  |    |  |  |
|  |  |  | Image: Node.js | Port: 3000       |      | Image: Redis | Port: 6379         |    |  |  |
|  |  |  | Limits: 0.5 vCPU, 1 GB RAM        |      | Limits: 0.5 vCPU, 1 GB RAM        |    |  |  |
|  |  |  +-----------------------------------+      +-----------------------------------+    |  |  |
|  |  +--------------------------------------------------------------------------------------+  |  |
|  |                                                                                            |  |
|  |  +--------------------------------------------------------------------------------------+  |  |
|  |  |  TASK 2 (Running instance of Task Definition B)                                      |  |  |
|  |  |                                                                                      |  |  |
|  |  |  +-----------------------------------+                                               |  |  |
|  |  |  | CONTAINER C (from Container Def)  |                                               |  |  |
|  |  |  | Image: Python | Port: 8000        |                                               |  |  |
|  |  |  | Limits: 1 vCPU, 2 GB RAM          |                                               |  |  |
|  |  |  +-----------------------------------+                                               |  |  |
|  |  +--------------------------------------------------------------------------------------+  |  |
|  |                                                                                            |  |
|  |  [ Remaining Idle Capacity on EC2 Instance: 2 vCPUs, 12 GB RAM ]                           |  |
|  +--------------------------------------------------------------------------------------------+  |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
                             ^                                      ^
                             |======= MANAGED & SCALED BY ==========|
                                                |
                              +------------------------------------+
                              |            ECS SERVICE             |
                              | Ensures Task 1 & Task 2 stay alive |
                              +------------------------------------+

```

### The Cheat Sheet: "What Contains What?"

1. **The Container Definition** is contained inside the **Task Definition** (as a blueprint configuration).
2. **The Container** runs inside a **Task** (as an isolated process sharing the task's network/security).
3. **The Tasks** are placed inside a **Container Instance (EC2)** based on available CPU/RAM.
4. **The Container Instances** are grouped inside the **ECS Cluster**.
5. **The ECS Service** lives at the cluster level, looking down at everything to ensure the desired count of **Tasks** is running across your **Container Instances**.
