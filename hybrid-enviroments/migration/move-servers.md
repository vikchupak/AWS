# Move servers(virtual machines + hard drive + OS + applications) to EC2s

## AWS Application Migration Service (AWS MGN) + AWS Replication Agent

#### AWS Application Migration Service (AWS MGN) - prev name "AWS Transform MGN" (MGN = Migration)

**AWS Application Migration Service (AWS MGN)** is the primary migration service recommended for **lift-and-shift** migrations to AWS. AWS encourages customers who are currently using AWS Elastic Disaster Recovery to switch to AWS MGN for future migrations. AWS MGN enables organizations to move applications to AWS without having to make any changes to the applications, their architecture, or the migrated servers.

It minimizes time-intensive, error-prone manual processes by automatically converting your source servers from physical, virtual machines, and cloud infrastructure to run natively on AWS.

The service simplifies your migration by enabling you to use the same automated process for a wide range of applications. By launching non-disruptive tests before migrating, you can be confident that your most critical applications such as SAP, Oracle, and SQL Server, will work seamlessly on AWS.

#### AWS Replication Agent

Implementation begins by installing the **AWS Replication Agent** on your source servers. When you launch Test or Cutover instances, AWS Application Migration Service automatically converts your source servers to boot and runs natively on AWS.

## AWS Application Discovery Service (ADS) + AWS Migration Hub (Migration Hub)

#### AWS Application Discovery Service

**AWS Application Discovery Service** helps you plan your migration to the AWS cloud by collecting usage and configuration data about your on-premises servers. Application Discovery Service is integrated with AWS Migration Hub, which simplifies your migration tracking as it aggregates your migration status information into a single console. You can view the discovered servers, group them into applications, and then track the migration status of each application from the Migration Hub console in your home region.

#### AWS Migration Hub (Migration Hub)

**AWS Migration Hub (Migration Hub)** provides a single place to discover your existing servers, plan migrations, and track the status of each application migration. The Migration Hub provides visibility into your application portfolio and streamlines planning and tracking. You can visualize the connections and the status of the servers and databases that make up each of the applications you are migrating.

Migration Hub gives you the choice to start migrating right away and group servers while the migration is underway or to first discover servers and then group them into applications.

<img width="1918" height="650" alt="image" src="https://github.com/user-attachments/assets/d5fc0876-b2ce-4033-aee5-1ad6361426e3" />

# AWS MGN + Replication Agent vs AWS Application Discovery Service + Migration Hub

These two toolsets serve **different phases** of the migration journey and are **complementary**, not competing alternatives.

### 🔍 At a Glance

| **Dimension**       | **AWS MGN + Replication Agent**                 | **AWS ADS + Migration Hub**                          |
| ------------------- | ----------------------------------------------- | ---------------------------------------------------- |
| **Primary Purpose** | **Execute** the actual migration (lift & shift) | **Discover, plan & track** migrations                |
| **Phase**           | Migration execution                             | Pre-migration assessment + tracking                  |
| **What it moves**   | Entire server OS + data (block-level)           | Nothing — collects metadata only                     |
| **Agent role**      | Replicates data continuously to AWS             | Collects config, performance & network data          |
| **Output**          | Running EC2 instances on AWS                    | Inventory reports, dependency maps, migration status |

## 🚀 AWS Application Migration Service (MGN) + Replication Agent

### What it does

* Performs the **actual lift-and-shift migration** of servers to AWS.
* Uses **block-level replication** to continuously sync source servers to AWS.
* Converts physical, virtual, or cloud servers into native EC2 instances.
* Minimizes downtime with a **near-zero RPO** and **minutes-level RTO** during cutover.

### Key capabilities

* ✅ Supports Windows & Linux (x86).
* ✅ Application-agnostic (SAP, Oracle, SQL Server, etc.).
* ✅ Non-disruptive testing before final cutover.
* ✅ Automated post-launch actions.
* ✅ Free for the first 90 days per server.
* ✅ Integrates with IAM, CloudTrail, CloudWatch.

### Limitations

* ❌ Does not support NAS, shared drives, or clustered shared storage.
* ❌ High data-change-rate systems (e.g., OLTP DBs) may need special handling.
* ❌ Requires sufficient network bandwidth (no offline shipping option).

### Migration lifecycle stages

1. **Not Ready** → Ready for Testing
2. **Test in Progress** → launch test EC2
3. **Ready for Cutover**
4. **Cutover in Progress**
5. **Cutover Complete**

## 🗺️ AWS Application Discovery Service (ADS) + Migration Hub

### What it does

* **Discovers and inventories** your on-premises environment before migration.
* Collects server configuration, utilization metrics, and network dependencies.
* **Migration Hub** provides a single pane of glass to **track migration progress** across tools.

### Discovery methods

| **Method**              | **Best For**                                                   |
| ----------------------- | -------------------------------------------------------------- |
| **Agentless Collector** | VMware vCenter environments — no agent installation needed     |
| **Discovery Agent**     | Detailed OS-level data, network connections, running processes |
| **File-based Import**   | Manual import of existing inventory data                       |

### Key capabilities

* ✅ Maps application dependencies.
* ✅ Groups servers into logical applications.
* ✅ Tracks migration status across AWS and partner tools.
* ✅ Integrates with AWS MGN, DMS, and partner solutions.
* ✅ Exports data as CSV or feeds into Migration Hub.

### Limitations

* ❌ Does **not** perform any actual data migration.
* ❌ Discovery Agent must be installed per server for detailed data.
* ❌ Home Region must be set before use — data is stored only there.

### 🔗 How They Work Together

These tools can be used **in sequence**:

```text
[ADS] Discover & Inventory
        ↓
[Migration Hub] Plan, group apps, track dependencies
        ↓
[AWS MGN + Replication Agent] Execute the migration
        ↓
[Migration Hub] Monitor cutover progress across all servers
```

**Migration Hub Orchestrator** can automate migration workflows by coordinating discovery, replication, and cutover activities.

### 🧭 When to Use What

| **Scenario**                                               | **Recommended Tool**                       |
| ---------------------------------------------------------- | ------------------------------------------ |
| You need to understand what's in your data center          | **ADS**                                    |
| You want to map server dependencies before migrating       | **ADS**                                    |
| You want a single dashboard to track all migrations        | **Migration Hub**                          |
| You're ready to actually move servers to AWS               | **AWS MGN**                                |
| You want continuous replication with minimal downtime      | **AWS MGN + Replication Agent**            |
| You want end-to-end automation of a large VMware migration | **ADS + Migration Hub Orchestrator + MGN** |

### 📌 Quick Summary

* **ADS + Migration Hub** = **"plan and track"** layer.
* **MGN + Replication Agent** = **"execute and cut over"** layer.
* Together, they provide a **complete migration pipeline** from discovery to production on AWS.
