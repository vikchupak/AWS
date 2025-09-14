### "AWS service account" & k8s service account

AWS and Kubernetes both use the term **"Service Account"**, but they are completely different concepts. Let’s compare:  

## **AWS Service Account vs. Kubernetes Service Account**

| Feature            | **AWS Service Account** ⚡ (IAM User/Role) | **Kubernetes Service Account** 🐳 (K8s Object) |
|------------------|----------------------------------|----------------------------------|
| **Where it Exists?** | AWS IAM                         | Kubernetes Cluster |
| **Purpose** | Provides credentials to access AWS services. | Assigns permissions to Pods inside a K8s cluster. |
| **How it Works?** | Uses **IAM Users** (long-lived) or **IAM Roles** (temporary credentials). | A Kubernetes object that is **linked to Pods** for API access. |
| **Authentication** | Uses **Access Keys** (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) OR IAM Role via STS. | Uses **ServiceAccount Token** stored inside the Pod. |
| **Used By?** | AWS services (EC2, Lambda, EKS worker nodes). | Kubernetes Pods. |
| **Example Use Case** | EC2 instance needs to access S3. | A Pod needs to talk to Kubernetes API. |

---

### **Example of Each**
#### ✅ **AWS IAM Role (AWS Service Account Equivalent)**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```
- This IAM Role allows access to **S3**.
- It can be assumed by an **EC2 instance, Lambda, or EKS Pod** (via IRSA).

---

#### ✅ **Kubernetes Service Account**
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-service-account
  namespace: default
```
- This ServiceAccount is used **inside Kubernetes**.  
- If assigned to a Pod, the Pod can **interact with the K8s API**.

---

## **How IRSA Bridges AWS & Kubernetes**
- **IRSA (IAM Role for Service Account) allows a K8s Service Account to assume an AWS IAM Role**.
- So, **a Kubernetes Pod** can get AWS permissions **securely, without static credentials**.

# IAM Role for Service Account (IRSA) in EKS

- IAM Role is AWS entity
- Service Account is k8s entity

### **Key Concepts:**
| **Entity**            | **Scope**            | **Purpose** |
|----------------------|--------------------|------------|
| **IAM Role**        | **AWS**            | Grants permissions to AWS resources (EC2, Auto Scaling, etc.). |
| **Service Account** | **Kubernetes**     | Assigns permissions to Pods within the cluster. |

---

### **How IRSA (IAM Role for Service Account) Connects AWS and Kubernetes**
✅ **IAM Role** (AWS) → Controls access to AWS services (EC2, ASG, etc.).  
✅ **Service Account** (Kubernetes) → Is used by Pods for authentication.  
✅ **IRSA** (IAM Role for Service Account) → Bridges them, so Pods can assume IAM roles **without static credentials**.

---

Here’s how the **IAM Role for Service Account (IRSA)** mechanism works in EKS:  

---

### **1️⃣ Pod (Service) Uses a Service Account**  
- In your **Deployment**, you specify:  
  ```yaml
  serviceAccountName: cluster-autoscaler
  ```  
- This means the **Pod** runs under the **ServiceAccount** named `cluster-autoscaler`.

---

### **2️⃣ Service Account is Mapped to an IAM Role**  
- The ServiceAccount (`cluster-autoscaler`) is **linked** to an **IAM Role** using an annotation:  
  ```yaml
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/ClusterAutoscalerRole
  ```
- This annotation tells AWS **which IAM role** to assume **when the Pod runs**.

---

### **3️⃣ IAM Role Provides Temporary AWS Credentials**  
- When the Pod starts, Kubernetes requests AWS STS (Security Token Service) to assume the **IAM Role**.  
- AWS STS then provides **temporary credentials** to the Pod **dynamically**.  
- The Pod **never needs static AWS keys** (`AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY`).

---

### **4️⃣ Pod Uses AWS APIs Securely**  
- The Cluster Autoscaler **uses these credentials** to:  
  - **List and modify Auto Scaling Groups (ASG)**  
  - **Monitor EC2 instances**  
  - **Scale nodes dynamically**  
- The credentials are **rotated automatically**, improving security.

---

## **Summary**
✔ **Pod** → Uses `ServiceAccount`.  
✔ **ServiceAccount** → Is linked to an **IAM Role**.  
✔ **IAM Role** → Grants temporary **AWS credentials**.  
✔ **Pod** → Uses credentials to interact with AWS **securely**.  

🔥 **This is the best practice in EKS!** No static AWS keys required. 🚀  

### k8s

https://github.com/vikchupak/Kubernetes/blob/main/AuthAndPermissions/index.md

- In AWS, there is NO service accounts(roles instead), but IAM users.
- In k8s, there is service accounts, but NO 'classic' users.
