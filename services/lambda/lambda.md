# Ways to call Lambda

## ✅ 1) **From another AWS service**

(Recommended within backend)

You can directly call Lambda from:

* Another Lambda
* SQS
* SNS
* EventBridge
* Step Functions
* DynamoDB streams
* S3 events

➡️ No API Gateway needed.

---

## ✅ 2) **From your backend (server → Lambda)**

Example: Your own server (Node, Go, NestJS, etc.) uses AWS SDK:

```js
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const client = new LambdaClient({ region: "eu-central-1" });

const res = await client.send(new InvokeCommand({
  FunctionName: "myFunction",
  Payload: JSON.stringify({ message: "hi" }),
}));
```

➡️ No API Gateway needed.
But your server must use AWS credentials.

---

## 3) **From a client (browser / mobile app → Lambda)**

### ✅ Option A — Use **API Gateway**

Client → API Gateway → Lambda

- Easy to authorize requests via JWT tokens using Cognito
- Most common. Recommended

### ✅ Option B — Use **Cognito Identity Pool + AWS SDK**

Client → Cognito Identity Pool → temporary IAM credentials -> AWS SDK → Lambda

- The client logs in (via Google, Facebook, or Cognito User Pools) and receives an ID Token (JWT)
- The client sends that JWT to the Cognito Identity Pool
  - Cognito verifies the token is valid. It then looks at the IAM Role you’ve attached to that Identity Pool
  - Cognito calls AWS STS (Security Token Service) to generate a temporary Access Key, Secret Key, and Session Token
  - These keys are sent back to the browser/app
- The AWS SDK inside your app uses those keys to "sign" a request to the Lambda Invoke API
- AWS checks the signature, sees the IAM Role has lambda:InvokeFunction permission, and runs your code

---

- Common Use Case: This is rarely used for standard web apps. It is more common for internal tools or mobile apps that need to interact directly with other AWS services (like uploading a file straight to an S3 bucket)

---

- Con
  - It isn't necessarily "less secure" if configured correctly, but it is highly coupled. Your frontend code becomes "heavy" because it has to manage AWS-specific logic and the full SDK.
  - You are essentially moving your Cloud Infrastructure logic into the Frontend. If you want to change which Lambda is called, or add a validation step, you have to update and redeploy your client app, not just your server.
- Pro
  - This is the fastest way to give a mobile app direct access to AWS services (like uploading a file to S3 or reading a specific DynamoDB row) without writing "pass-through" code in a backend

### ✅ Option C — Expose lambda url without auth check

- Anyone can call your lambda
- Best for simple webhooks or small projects where you don't need the advanced features (like request validation or custom domains) of API Gateway

---

# ⭐ Recommended Pattern

```
Client (web/mobile)
       ↓  (JWT)
API Gateway —(invoke)→ Lambda
```

Why this is best:
✅ No AWS keys on client
✅ Easy Auth (Cognito Authorizer)
✅ Middleware / validation
✅ Rate limiting + throttling
✅ Logging
✅ Custom domains

---

# ✅ Summary Table

| Caller                          | API Gateway required? | Good idea? |
| ------------------------------- | --------------------- | ---------- |
| AWS service → Lambda            | ❌                     | ✅          |
| Backend server → Lambda         | ❌                     | ✅          |
| Client (web/mobile) → Lambda    | ✅ (recommended)       | ✅          |
| Client → Lambda (Identity Pool) | ❌                     | ⚠️ Avoid   |

---

# 🔥 If using Cognito as auth provider

Best architecture:

```
App → Cognito → API Gateway → Lambda
```

**API Gateway uses Cognito User Pool Authorizer, so Lambda only runs for authenticated users.**
