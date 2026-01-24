# AWS Step Functions

- [AWS Step Functions](https://aws.amazon.com/step-functions/) - workflow orchestration
- Standard Step Functions can run for up to one year
- Allows to create "State Machines" - Long-running serverles workflows
  - "States" are decision points
- Lambda is the "worker" that does the job, while Step Functions is the "manager" that organizes the workers.
- It doesn't "run code" itself; instead, it coordinates multiple Lambdas (and other AWS services) into a sequence.
- It is "stateful," meaning it remembers the output of Step 1 and passes it as the input to Step 2.

---

- If you have a task that takes longer than the 15-minute Lambda limit, you shouldn't try to force Lambda to do it. Instead, you use Step Functions to orchestrate **other services that don't have that time limit**.
- Here is how Step Functions can solves this, and this is the most common solution:
  - The "Job Poller" Pattern (Using ECS/Fargate)
    - You move the code into a container (Amazon ECS or AWS Fargate).
    - Step Functions starts an ECS task. The state machine then enters a "Wait" state.
    - Step Functions will sit and wait for the container to finish, whether it takes 20 minutes or 10 hours.

---

# Why "function" in name

- ***If "AWS Step Function" don't run the code why it is named "function"?***
- The name Step Functions comes from the mathematical and computer science concept of a "State Machine," not from "Functions" as in "Lines of Code."
- In mathematics, a Step Function is a function that increases or decreases abruptly from one constant value to another (like a staircase).
- In AWS, the service is based on State Machines. Each "Step" in your workflow is technically a State. The "Function" part of the name refers to the logic that moves you from State A to State B.

# Step Function Definition

- AWS Step Functions uses a specialized, JSON-based language called **Amazon States Language (ASL)**
  - Even though it is called a "language," it is declarative rather than imperative

ASL Example
 ```json
{
  "Comment": "Pet Cuddle-o-Tron - using Lambda for email.",
  "StartAt": "Timer",
  "States": {
    "Timer": {
      "Type": "Wait",
      "SecondsPath": "$.waitSeconds",
      "Next": "Email"
    },
    "Email": {
      "Type" : "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "FunctionName": "EMAIL_LAMBDA_ARN",
        "Payload": {
          "Input.$": "$"
        }
      },
      "Next": "NextState"
    },
    "NextState": {
      "Type": "Pass",
      "End": true
    }
  }
}
```

# Step Function Call

- One `Step Function` has one `State Machine Definition` (SM "blueprint")
- We can run multiple **simultaneous** `Step Function` executions/instances with different parameters
  - You can think of your State Machine definition as a Class in programming, and each start_execution call as creating a new Object (instance) of that class. You can have as many as you need, all running in parallel with their own unique data

Step Function Call Example
```py
import boto3, json, os, decimal

SM_ARN = 'YOUR_STATEMACHINE_ARN'

sm = boto3.client('stepfunctions')

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event))

    data = json.loads(event['body'])
    data['waitSeconds'] = int(data['waitSeconds'])
    
    checks = []
    checks.append('waitSeconds' in data)
    checks.append(type(data['waitSeconds']) == int)
    checks.append('message' in data)

    if False in checks:
        response = {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin":"*"},
            "body": json.dumps( { "Status": "Fail", "Reason": "Input failed validation" }, cls=DecimalEncoder )
        }
    else:
        # Start the state machine execution
        sm.start_execution( stateMachineArn=SM_ARN, input=json.dumps(data, cls=DecimalEncoder) )
        response = {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin":"*"},
            "body": json.dumps( {"Status": "Success"}, cls=DecimalEncoder )
        }
    return response
```
