# UserData and cfn-init | CreationPolicy and cfn-signal | DependsOn | cfn-hup

The key difference is **what each one controls**

| **Feature** | **What it does** | **Who/what it controls** | **Typical purpose** |
|---|---|---|---|
| **`UserData`** | Runs commands when EC2 launches | EC2 instance | Install packages, start services, bootstrap |
| **`cfn-init`** | Configures an EC2 instance from CloudFormation metadata | EC2 instance | Install packages, create files, run commands, configure services |
| **`cfn-signal`** | Sends success/failure back to CloudFormation | CloudFormation | Tell CFN that instance setup finished |
| **`CreationPolicy`** | Makes CloudFormation **wait** for a signal | CloudFormation resource | Don't mark resource as created until initialization succeeds |
| **`cfn-hup`** | Watches CloudFormation metadata for changes | EC2 instance | Re-run configuration when CFN metadata changes |
| **`DependsOn`** | Controls **resource creation order** | CloudFormation resources | Ensure resource A is created before resource B |

### The important distinction: `CreationPolicy` vs `DependsOn`

They both affect CloudFormation's creation process, but in completely different ways:

```text
DependsOn
─────────
Resource B
    │
    │ "Don't start until A is created"
    ▼
Resource A ─────────► Resource B
```

`DependsOn` answers:

> **"WHEN can CloudFormation start creating this resource?"**

---

```text
CreationPolicy
──────────────
Create EC2
    │
    ▼
EC2 starts UserData
    │
    ▼
cfn-init
    │
    ▼
cfn-signal ─────────► CloudFormation
                         │
                         ▼
                  "Creation complete"
```

`CreationPolicy` answers:

> **"When can CloudFormation consider this resource successfully created?"**

### How they work together

Imagine:

```yaml
MyInstance:
  Type: AWS::EC2::Instance

  CreationPolicy:
    ResourceSignal:
      Count: 1
      Timeout: PT10M

  Metadata:
    AWS::CloudFormation::Init:
      # configuration...

  UserData:
    # calls cfn-init
    # then calls cfn-signal
```

The flow is:

```text
CloudFormation
     │
     ├── CreationPolicy → "WAIT for signal"
     │
     ▼
Create EC2
     │
     ▼
UserData runs
     │
     ▼
cfn-init
     │
     ├── install packages
     ├── create files
     ├── run commands
     └── start services
     │
     ▼
cfn-signal
     │
     ▼
CloudFormation
     │
     ▼
Creation succeeds
```

And if you have another resource:

```yaml
MyApp:
  Type: AWS::...
  DependsOn: MyInstance
```

then:

```text
MyInstance
    │
    │ CreationPolicy waits for
    │ cfn-signal
    ▼
MyInstance = CREATED
    │
    │ DependsOn
    ▼
MyApp starts creating
```

### `cfn-init` vs `UserData`

A useful way to remember it:

```text
UserData
   = HOW EC2 starts bootstrapping

cfn-init
   = WHAT configuration EC2 should apply
```

For example:

```text
UserData
   │
   ├── install cfn-init / call cfn-init
   │
   ▼
cfn-init
   │
   ├── packages
   ├── files
   ├── commands
   └── services
```

`cfn-init` gets its instructions from:

```yaml
Metadata:
  AWS::CloudFormation::Init:
```

### `cfn-hup`

This is for **later changes**, after the instance already exists:

```text
Initial creation:

UserData → cfn-init → cfn-signal → CreationPolicy
                                      ↓
                                   DONE


Later:

CloudFormation Metadata changes
              │
              ▼
           cfn-hup
              │
              ▼
           cfn-init
              │
              ▼
       Instance reconfigured
```

### 🧠 SAA mental model

```text
USERDATA
  ↓
"Run bootstrap commands"

CFN-INIT
  ↓
"Configure the EC2 instance"

CFN-SIGNAL
  ↓
"I'm finished / failed"

CREATIONPOLICY
  ↓
"I'll wait for that signal"

CFN-HUP
  ↓
"Watch for future metadata changes"

DEPENDSON
  ↓
"Create this resource after that resource"
```

The **two pairs worth memorizing** are:

```text
CreationPolicy + cfn-signal
→ Wait for initialization to finish

DependsOn
→ Control creation ORDER
```

And:

```text
UserData + cfn-init
→ Bootstrap/configure EC2

cfn-hup
→ Reconfigure EC2 when CloudFormation metadata changes
```
