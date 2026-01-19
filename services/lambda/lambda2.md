# Lambda

- 2 Modes
  - Public
    - Default
    - **Outside any VPC**
    - Can access public AWS services and internet
    - Cannot access recources in a VPC unless resources are configured to be public
  - Private
    - Inside VPC, inside (private) subnet
    - Can access resources in the VPC
    - Cannot access public AWS services and internet unless additionally configured
      - VPC endoint can be used to provide access to public services
      - NATGW can be used to provide access to internet
    - It is not really inside your VPC, but in `AWS Lambda Service VPC` and linked to your VPC by adding ENI to you VPC
- Security
  - Lambda resource policy controles WHAT services and accounts can INVOKE the function
  - Lambda execution roles defines what permissions the function receives
- Logs
  - Uses CloudWatch(for metrics), CloudWatchLogs(for logs), X-Ray
- Invocation
  - sunchronious
  - asynchronious
  - event source mappings
  
