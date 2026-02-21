# AWS CloudFormation (CNF)

- [AWS CloudFormation](https://aws.amazon.com/cloudformation/)

---

 - Templates define logical resources and create stacks
   - Declarative
   - The same template can be used to create different stacks
   - Have name you define
 - Stacks create physical resources from logical ones

---

- Non-portable(static) templates
  - Templates with hadcoded values like AMI (specific to region) or S3 bucket name
    - Often can't be re-applied multiple times because the hadcoded values cause conflicts
 - Portable(dynamic) templates
   - Use different features to avoid hardcoding and dynamically define values
   - Features
     - Template parameters
       - Accept input via console UI, CLI, API
       - Supports default values, parameter type, allowed values and validation patterns
      - Pseudo parameters
        - Parameters populated automatically by AWS like AWS::Region and can be accessed/referenced in templates
      - [Intrinsic Functions](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference.html)
        - Built-in functions that let you dynamically generate values inside a CloudFormation template
        - They’re evaluated by CloudFormation at **deploy time**, not at runtime
          - Example
            - Ref
            - Fn::Join
            - Fn::GetAtt
            - Fn::Equals
       - Mappings
         - Map of key - value pairs
         - Use !FindInMap intrinsic function to get value by key
       - Outputs
         - Values that your stack exposes after it is created or updated
         - Value required
         - Used to
           - Return/print useful information (like URLs, ARNs, IDs)
           - **Export values for other stacks**
             - Export.Name + !ImportValue
- Conditions
  - Conditions are evaluated before creating logical resources
  - If a condition present for a logical resource, the resource is only created when the condition is true
  - Nested conditions are supported
- DependsOn
  - By default, CNF tries to run things in parallel when possible
  - DependsOn allows **explicitly** seting things order
  - When you add a DependsOn attribute to a resource, that resource is created only after the creation of the resource specified in theDependsOn attribute
