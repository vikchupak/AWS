# AWS pricing

- https://aws.amazon.com/pricing

# `on-demand` and `pay-as-you-go` pricing models

AWS offers **pay-as-you-go** and **on-demand** pricing models, which provide flexibility and cost efficiency.

### **1. Pay-as-You-Go Model**
- You **pay only for what you use**, similar to utility billing (electricity, water, etc.).
- Covers a range of services like compute, storage, networking, and databases.
- Helps avoid over-provisioning and reduces upfront infrastructure costs.

🔹 Example: **AWS Lambda**  
- Charged **only when your function runs** (per request and execution time).  
- No charge for idle time.

### **2. On-Demand Pricing**
- You **pay for compute or database capacity per hour or second** (depending on the service).
- No long-term commitments or upfront payments.
- Ideal for **short-term, unpredictable workloads** that cannot be interrupted.

🔹 Example: **EC2 On-Demand Instances**  
- You pay per second or per hour for the exact amount of compute power used.
- No upfront fees—just start and stop instances as needed.

### **Comparison: On-Demand vs. Pay-as-You-Go**
| Feature            | On-Demand | Pay-as-You-Go |
|--------------------|----------|--------------|
| Pricing Model     | Per usage time (hour/second) | Based on actual consumption |
| Commitment       | None | None |
| Best For        | Compute & databases | Serverless, storage, APIs, and more |
| Example Services | EC2, RDS | Lambda, S3, API Gateway |

# Relation between `on-demand` and `pay-as-you-go`

- On-Demand is a subset of Pay-as-You-Go.
- Think of Pay-as-You-Go as the overall billing strategy, while On-Demand is just one way AWS applies it to **specific compute services** like EC2 and RDS.
