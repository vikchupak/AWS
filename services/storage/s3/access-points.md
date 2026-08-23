# S3 Access Points

### Access Points (AP)

- Create custom access endpoints for a single S3 bucket that allow you to define different permissions and network controls for different users, teams, or applications
- S3 Access Points solve complex permission management problem
  - Instead of managing one large bucket policy, you create multiple access points — each with its own
    - Unique DNS address
    - Network restrictions - set access to access points
      - Internet-accessible Access point vs VPC-only Access point
      - When you choose VPC-only Access point, **the access point** becomes reachable only from a specific VPC
        - **This requires a VPC endpoint (Gateway Endpoint for S3) in that VPC**
          - The Access Point and the VPC endpoint must be connected
          - Requests from outside that VPC are automatically denied, even if the requester has valid IAM credentials
    - Access point (resource) policy
      - Congiture who/what is allowed when using this access point (is functionally equivalent to a bucket policy)
        - Access point policy permissions must match with bucket policy permissions
          - In other words, the Access Point policy cannot grant more permissions than the bucket policy allows
          - Alternatively, you can use delegation (This is common permissions architecture)
            - Bucket policy grants wide-open access via access point (when the access point is used, any action on bucket is allowed)
            - Define permissions only on the access poit

### Multi-Region Access Points (MRAP)

- Create a single global endpoint that provides access to S3 buckets in multiple AWS regions
  - Instead of pointing your application to multiple bucket URLs in different regions, you use one MRAP DNS name
  - MRAP automatically routes requests to the closest available bucket (based on network and health)
     - Important: MRAP don’t automatically replicate data between buckets in different regions
       - To solve this, MRAP is usually combined with Cross-Region Replication (CRR)
         - Replication is eventual, so there may be slight delays before objects appear in all regions
  - Policies, delegation, and VPC restrictions still apply per bucket even with MRAP

### Can MRAP point to AP?

- Multi-Region Access Point (MRAP) can point to multiple S3 Access Points, not just buckets directly
  - This is actually the recommended way in many architectures, because it allows you to combine all the benefits of Access Points (policies, VPC-only restrictions, delegation) with MRAP global routing
