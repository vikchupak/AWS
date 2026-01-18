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
