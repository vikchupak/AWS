# Cognito

`Amazon Cognito` is a user identity and authentication service.
- allows your app’s users to sign up, sign in
- allows access AWS resources securely
- **It’s often compared to Firebase Authentication or Auth0**

## ⚙️ Two Main Components

### 1. **User Pools**

A **User Pool** is basically a **user directory** (a managed database of users) that handles:

* ✅ User registration (sign-up)
* 🔑 Authentication (sign-in)
* 🔒 Password reset, email/SMS verification
* 🪪 OAuth2 / OpenID Connect (OIDC) / SAML federation
* 🧍 Social logins (Google, Facebook, Apple, etc.)
* 📧 Built-in email/SMS delivery for confirmations and MFA

👉 Think of a **User Pool** as the *"authentication layer."*
It returns a **JWT token (ID, access, refresh)** when a user logs in.

---

### 2. **Identity Pools (Federated Identities)**

An **Identity Pool** provides **temporary AWS credentials** (via IAM roles) to authenticated users so they can access AWS services directly.

For example:

- Your app’s user logs in via Cognito `User Pool` (or Google/Facebook)
- Cognito Identity Pool obtains additional REMPORARY SHORT-LIVED **AWS credentials(keys)** via `Security Token Service (STS)`
  - ```
    AccessKeyId: ...
    SecretAccessKey: ...
    SessionToken: ...
    Expiration: ...
    ```
  - ***These credentials can access AWS based on IAM policy attached to the Identity Pool role***
    - You may need to update **Identity Pool IAM role** policy
- The user can now safely upload a file to **S3** or access **API Gateway** without exposing your AWS keys

👉 Think of an **Identity Pool** as the *"authorization bridge"* between users and AWS resources.

---

## 🔐 Typical Flow

Here’s a standard setup for an app using Cognito:

1. **User signs up or logs in** via your app UI (email/password, Google, etc.)
2. **User Pool** verifies credentials → returns **JWT tokens**
   * `id_token` → user info
   * `access_token` → access to protected APIs
   * `refresh_token` → renew access without logging in again
3. Optionally, your **Identity Pool** obtains additional **temporary AWS credentials**
4. User can now call:
   * Your backend API (authenticated via JWT)
   * AWS resources directly (S3, AppSync, etc.)

---

## 🧠 Key Concepts

| Concept            | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| **App Client**     | Represents your app; defines OAuth flows, secret, callback URLs             |
| **Hosted UI**      | Ready-made login/signup web page Cognito provides                           |
| **Triggers**       | Lambda functions that run during auth events (e.g., post-signup validation) |
| **Groups / Roles** | Used for user access control                                                |
| **MFA**            | Multi-factor authentication via SMS or TOTP apps                            |

---

## 🧰 Common Use Cases

* ✅ Web or mobile app authentication (React, Flutter, iOS, Android)
* ✅ Single Sign-On (SSO)
* ✅ Federated login (Google, Facebook, Apple)
* ✅ Serverless app with secure access to AWS (S3 uploads, DynamoDB, etc.)
* ✅ Backend API protection (e.g., API Gateway + Lambda + Cognito JWT)

---

## 🪄 Example Architecture

```
[ User ] 
   ↓
[ Cognito User Pool ]  ← handles sign-in/sign-up
   ↓
[ Cognito Identity Pool ]  ← obtains AWS credentials using JWT
   ↓
[ AWS Services (S3, API Gateway, DynamoDB, etc.) ]
```

---

## 💬 Example: Verify Token in Backend (Node.js)

```js
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import axios from 'axios';

const region = 'eu-central-1';
const userPoolId = 'eu-central-1_AbCdEf123';

const verifyCognitoToken = async (token) => {
  const url = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
  const { data } = await axios.get(url);
  const pems = {};
  data.keys.forEach(key => {
    pems[key.kid] = jwkToPem(key);
  });

  const decoded = jwt.decode(token, { complete: true });
  const pem = pems[decoded.header.kid];
  if (!pem) throw new Error('Invalid token');

  return jwt.verify(token, pem);
};
```
