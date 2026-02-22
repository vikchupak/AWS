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
- `Conditions`
  - **Resource attribute**
  - Conditions are evaluated before creating logical resources
  - If a condition present for a logical resource, the resource is only created when the condition is true
  - Nested conditions are supported
- `DependsOn`
  - **Resource attribute**
  - By default, CNF tries to run things in parallel when possible
  - DependsOn allows **explicitly** seting things order
  - When you add a DependsOn attribute to a resource, that resource is created only after the creation of the resource specified in theDependsOn attribute
- Check readiness for advanced scenarios
    - `WaitCondition` (legacy) + `Signal (cfn-signal)`
      - **Logical Resource**
      - Pause stack creation until an external signal is received
        - Signal can be **either cfn-signal or HTTP request to pre-signed URL**
      - Can `DependsOn` other resources and vice versa
    - `CreationPolicy` (recommended) + `Signal (cfn-signal)`
      - **Resource attribute**
      - Wait for a resource itself to signal it is ready using cfn-signal
    - `cfn-signal`
      - Helper script/toolt to send signal

### Single Stacks

- Resources in a single stack share lifecycle
- Stack resorce limit is 500 resources
- Stacks are designed to be isolated and self-contained by default
- Outputs are not visible from other stacks by default
  - Nested stacks can reference outputs. This is because stacks are linked
    - `Ref`
  - Outputs can be exported to be visible in other stacks
    - Export & `Fn::ImportValue`

### Multi-stack architecture

- Nested stacks
  - Nested stacks allow for a hierarchy of related templates to be combined to form a single product
  - `Type: AWS::CloudFormation::Stack`
  - Root/Parent stack on the top
    - First stack to create, manually or via software
  - **You reuse templates**
    - **Each template(NOT stack or resource) can be reused separately - code reuse** (modular templates)
    - All stacks form one solutions - they have **linked lifecycle**
      - Nested stacks are creted by the root stack
  - Nested stack outputs are returned to ROOT STACK (bypassing immediate stacks)
    - Root user can pass the outputs to other stacks as parameters
  - We can use `DependsOn` between nested stacks
- Cross-stacks references
  - **You reuse logical and physical resources from different stacks** - stack reuse and their resources
  - Cross region/accout referencing is NOT supported

### StackSets

- Deploy stacks accross many regions/accounts from one place
- StackSets are containers for stack instnces
  - A stack instance is an ONE reference to (or container for) an actual stack in specific region/account
  - StackSets can contain many Stack instances
 - Admin account - an account which created/manages StackSets
   - Target account - an account where stack instances & stacks are created
- Each stack = 1 region in 1 account
- Template for StackSet is a normal template
