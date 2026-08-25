# SSM Automation

Automation is the SSM capability/service feature that executes automated operational tasks.

# SSM Automation Document (Runbook)

An SSM Automation Document (also called a Runbook) is essentially a predefined script or workflow written in YAML or JSON that defines a series of steps/actions to be executed automatically on AWS resources.

```yml
schemaVersion: '0.3'
description: Encrypt an unencrypted EBS volume
parameters:
  VolumeId:
    type: String
    description: The ID of the unencrypted EBS volume
mainSteps:
  - name: CreateSnapshot
    action: aws:executeAwsApi
    ...
  - name: CopyEncryptedSnapshot
    action: aws:executeAwsApi
    ...
  - name: CreateEncryptedVolume
    action: aws:executeAwsApi
    ...
  - name: ReplaceVolume
    action: aws:executeAwsApi
    ...
```

| Concept                           | Think of it as               |
| --------------------------------- | ---------------------------- |
| **SSM Automation**                | Engine/execution mechanism   |
| **Automation Document / Runbook** | Recipe/instructions          |
| **Automation execution**          | One actual run of the recipe |

#### AWS Pre-Built Documents

WS provides ready-made automation documents for common tasks.
