# Deploy lambda

2 ways to upload lambda, as
- **zip file**
  - Lambda does the following under the hood
    - Receives the zip file via AWS CLI, console, or SDK
    - Unpacks it into the Lambda execution environment
    - Creates a new Firecracker microVM (or reuses a warm one)
    - Mounts your function code into the environment
    - Starts the runtime (Node.js, Python, etc.)
    - Calls the handler function
- **docker image**
  - Lambda does the following under the hood
    - Pulls image from ECR
    - Starts container
      - Starts runtime inside container
    - Calls the handler function
---

- Regardless of upload method, Lambda is run as container in any case
- Under the hood, Lambda does not use standard Docker containers
  - It runs on "MicroVM" (Firecracker), which is an open-source virtualization technology built by AWS
 
---

- The AWS Lambda Console allows you to adjust function code only for ZIP-based functions
- If your Lambda was deployed as a .zip file, the console provides an inline code editor for supported runtimes (Node.js, Python, Java, etc.).
- You can
  - Edit the handler code directly
  - Add small helper functions or update logic
  - Adjust environment variables, memory, timeout, and triggers
  - After saving changes, Lambda automatically updates the function without requiring CLI or ECR

---

Creating image-based lambda

- You create an image form special base image
  ```Dockerfile
  FROM public.ecr.aws/lambda/nodejs:18

  # Copy your code
  COPY app/ ${LAMBDA_TASK_ROOT}

  # Set the handler
  CMD ["index.handler"]
  ```
- build the image
  ```bash
  docker build -t my-lambda .
  ```
- push it to Amazon ECR
  ```bash
  aws ecr create-repository --repository-name my-lambda
  docker tag my-lambda:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-lambda:latest
  docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-lambda:latest
  ```
- Create/deploy lambda
  ```bash
  aws lambda create-function \
  --function-name myLambda \
  --package-type Image \
  --code ImageUri=<account-id>.dkr.ecr.us-east-1.amazonaws.com/my-lambda:latest \
  --role arn:aws:iam::<account-id>:role/lambda-role
  ```
- Update lambda
  ```bash
  # Update Lambda
  aws lambda update-function-code \
  --function-name myLambda \
  --image-uri <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-lambda:latest
  ```
