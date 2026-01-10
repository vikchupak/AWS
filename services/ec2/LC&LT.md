# Launch Configurations & Launch Templates

- Both define EC2 in advance
- Both are NOT editable
  - LT has versions
- **LT is recommended to use over LC**
  - LT is superset of LC. That is LT includes all LC features and has its own extra features
- LC has one use. Is is used as part of Auto-Scaling Group
- LT can be used as part of Auto-Scaling Group, like LC
  - But additionally, it can be used to run EC2 directly from console UI/CLI

---

### ASG refs to TL

CloudFormation file
```yml
# ...
WEBLaunchTemplate:
  Type: AWS::EC2::LaunchTemplate
  Properties: 
    LaunchTemplateData: 
      InstanceType: "t3.micro"
      CreditSpecification:
        CpuCredits: unlimited
      ImageId: !Ref LatestAmiId
      IamInstanceProfile: 
        Name: !Ref WEBInstanceProfile
      SecurityGroupIds: 
        - !Ref SGWEB
ASG: 
  Type: AWS::AutoScaling::AutoScalingGroup
  Properties: 
    VPCZoneIdentifier:
      - !Ref SubnetPUBLICA
      - !Ref SubnetPUBLICB
      - !Ref SubnetPUBLICC
    LaunchTemplate:
      LaunchTemplateId: !Ref WEBLaunchTemplate
      Version: "1"
    MaxSize: !Ref WebAsgMax
    MinSize: !Ref WebAsgMin
    DesiredCapacity: !Ref WebAsgDesired
    Tags:
      - Key: "Name"
        Value: "CATWEB"
        PropagateAtLaunch: true
    HealthCheckType: ELB
    HealthCheckGracePeriod: 300
    TargetGroupARNs:
      - !Ref ALBTG
# ...
```
