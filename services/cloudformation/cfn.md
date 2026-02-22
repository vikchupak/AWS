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
  - By default, CNF tries to run things in parallel when possible and tries to detect things order implicitly
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
      - Call `cfn-signal` tool(installed on EC2) from a helper script to send an actual signal

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

### DeletionPolicy

- An attribute
- Define actions to take when/before resources are deleted
  - Action list
    - Delete (default)
      - Delete resource completelly
    - Retain
      - Delete logical resource, but keep physical
    - Snapshot
      - Make data snapshot before delete

### Stack Roles

- CFN uses indentity permission who creates stack
  - This means you need both
    - Permissions to create/update/delete stacks
    - Permissions to create/update/delete resources defined in stack
- CFN can assume a role to gain needed permissions to create/update/delete resources
  - Using Indentity permissions (if identity has them)
  - Using Identity PassRole (if identity doesn't have permissions itself, but has PassRole to grant permissions to CNF)
    - **Useful to enforce IAM users to be able to manage resources via CFN, but not directly themselves**
  - A role gets attached to stack

### cfn-init

- cfn-init is native CNF feature. UserData is EC2 feature
- **Bootstaping feature - runs only once**
- It is configuration **directives** stored in template as part of logical resource
- **UserData is imperative. CFN-INIT is declarative (idempotent)**
- Call `cnf-init` tool(installed on EC2) from helper script(passed via UserData)

<img width="1277" height="723" alt="image" src="https://github.com/user-attachments/assets/2bc42b07-23e4-4b5d-bbf9-06a59422c075" />

### cfn-hup

- hup stands for Hook UPdater
- CNF-hup listens for resource metadata changes and runs user-specified actions when a change is detected
  - Can be used to calls CFN-INIT to re-apply the changes

### CreationPolicy & UserData & cfn-signal & cfn-init & cfn-hup example

- [Example template](https://github.com/vikchupak/AWS/blob/main/services/cloudformation/creationpolicy-cfn-init-hub-signal.yaml)

### Change sets

- A Change Set is like a “terraform plan” for AWS CloudFormation
  - Only shows what CloudFormation intends to do, without applying the changes unless confirmed

### Custom Resources

- CFN doesn't support everything natively out-of-the-box
  - Example: CFN can't cleanup S3 bucket before deleting it. Without the cleanup, CFN will fail to delete the bucket
  - We can create a Custom Resource that makes cleanup before delete
- Custom resources enable you to write custom provisioning logic in templates
  - [Example template with S3 Custom Resource to provision and cleanup bucket](https://github.com/vikchupak/AWS/blob/main/services/cloudformation/customresource.yaml)
