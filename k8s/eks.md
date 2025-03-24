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


### 2

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

### 3

https://github.com/vikchupak/Kubernetes/blob/main/AuthAndPermissions/index.md
