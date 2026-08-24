# AWS Proton

AWS Proton **will be deprecated on October 7, 2026**. After this date, you will no longer be able to access the AWS Proton console or resources. Your deployed infrastructure will remain intact — only the Proton management layer is removed. AWS recommends migrating to alternative services like AWS Service Catalog, AWS CDK, or Terraform for similar functionality.

---

AWS Proton allows you to deploy any serverless or container-based application with increased efficiency, consistency, and control. You can define infrastructure standards and effective continuous delivery pipelines for your organization. Proton breaks down the infrastructure into environment and service (“infrastructure as code” templates).

As a developer, you select a standardized service template that AWS Proton uses to create a service that deploys and manages your application in a service instance. An AWS Proton service is an instantiation of a service template, which normally includes several service instances and a pipeline.

<img width="2122" height="968" alt="image" src="https://github.com/user-attachments/assets/a3592640-de6f-4858-b6ea-eacdc9de1751" />

The diagram above displays the high-level overview of a simple AWS Proton workflow.

In AWS Proton, administrators define standard infrastructure that is used across development teams and applications. However, development teams might need to include additional resources for their specific use cases, like Amazon Simple Queue Service (Amazon SQS) queues or Amazon DynamoDB tables. These application-specific resources might change frequently, particularly during early application development. Maintaining these frequent changes in administrator-authored templates might be hard to manage and scale—administrators would need to maintain many more templates without real administrator-added value. The alternative—letting application developers author templates for their applications—isn’t ideal either because it takes away administrators’ ability to standardize the main architecture components, like AWS Fargate tasks. This is where components come in.

With a component, a developer can add supplemental resources to their application, above and beyond what administrators defined in the environment and service templates. The developer then attaches the component to a service instance. AWS Proton provisions infrastructure resources defined by the component just like it provisions resources for environments and service instances.

### Summary

* **AWS Proton** = managed service for deploying and managing **container-based and serverless applications** using standardized infrastructure.
* Helps organizations achieve **consistency, efficiency, and control** across development teams.
* Infrastructure is defined using **Infrastructure as Code (IaC) templates**:
  * **Environment template** → defines shared infrastructure.
  * **Service template** → defines the application infrastructure.
* **Developer** selects a standardized service template → Proton creates a **service**.
* A **service** is an instance of a service template and typically contains:
  * One or more **service instances**
  * A **deployment pipeline**
* **Administrators** control the standard architecture (e.g., Fargate configuration).
* **Components** let developers add **application-specific resources** without modifying administrator-managed templates.
  * Examples: **SQS queues, DynamoDB tables**, etc.
  * Developer attaches a component to a **service instance**.
  * Proton provisions the component's infrastructure alongside the service.
* **Key idea:**
  > **Admins define the standard infrastructure; developers extend it with application-specific resources using components.**
