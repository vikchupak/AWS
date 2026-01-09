# Launch Configurations & Launch Templates

- Both define EC2 in advance
- Both are NOT editable
  - LT has versions
- LT is recommended to use over LC
  - LT is superset of LC. That is LT includes all LC features and has its own extra features
- LC has one use. Is is used as part of Auto-Scaling Group
- LT can be used as part of Auto-Scaling Group, like LC
  - But additionally, it can be used to run EC2 directly from console UI/CLI
