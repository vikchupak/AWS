| Term         | Meaning              | Example              |
| ------------ | -------------------- | -------------------- |
| **Global**   | Not tied to a region | Amazon Route 53, IAM |
| **Regional** | Scoped to one region | ALB, EC2, RDS        |
| **Zonal**    | Tied to one AZ       | EBS volume           |

- Globally Resilient
  - A service remain functioning despite a region outage
- Regional Resilient
  - A service operates in one region
  - A service remain functioning despite a AZ outage
- AZ resilient
  - A service operates in one AZ
  - If AZ fails, the service fails

---

- Globally Resilient = Стійкість забезпечується на глобальному рівні. (Система переживе падіння регіону, бо розгорнута в кількох).
- Regional Resilient = Стійкість забезпечується всередині одного регіону. (Система переживе падіння однієї чи кількох AZ, але якщо впаде весь регіон — вона «помре»).
- AZ Resilient = Стійкість обмежена однією зоною. (Якщо падає компонента всередині AZ, сервіс може вистояти, але падіння самої AZ його знищить).

See [11:55](https://learn.cantrill.io/courses/1820301/lectures/41301618)

### Fault Tolerance (FT) vs High Availability (HA) vs Disaster Recovery (DR)

- **Fault tolerance**: Property that enables a system to continue operating properly in the event of the failure of one or more components
  - FT is about continue to work properly even system has faults. Operate properly despite failures.
  - [Exam question](https://portal.tutorialsdojo.com/courses/aws-certified-solutions-architect-associate-practice-exams/lessons/practice-exams-review-mode-4/quizzes/aws-certified-solutions-architect-associate-practice-exam-review-mode-set-4/)
- **High availability**: Refers to systems that are durable and likely to operate continuously without failure for a long time
  - HA is about keeping a system operational, about fast or automatic recovery of issues. It is not preventing user disruption. Maximizing uptime.
- **Disaster Recovery** is about bringing system back to work properly when the system completely crashed.

### Failover strategies

- **Active-Active Failover**
- **Active-Passive Failover**

#### Active-Active

In **Active-Active**, multiple Regions are serving traffic **simultaneously**.

```text
                    Route 53
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
        Region A              Region B
        ACTIVE                ACTIVE
           │                     │
        Resources             Resources
           ▲                     ▲
           │                     │
        Serving               Serving
        traffic               traffic
```

Route 53 performs health checks:

```text
                    Route 53
                   /         \
             HEALTHY       UNHEALTHY
                │               X
                ▼
           Return Region A   Remove Region B
           in DNS response   from response
```

If Region B goes down, Route 53 detects that its endpoint is unhealthy and **stops returning it in DNS responses**. Region A continues serving users.

If both are healthy, **both can receive traffic**.

#### Active-Passive

With **Active-Passive**, one Region is the primary and the other is essentially a **standby**.

```text
                    Route 53
                       │
                       ▼
                  Region A
                   ACTIVE
                     │
                  Traffic
                     
                  Region B
                  PASSIVE
                  (standby)
```

If Region A fails:

```text
Region A ❌
    │
    ▼
Route 53 detects failure
    │
    ▼
Region B
ACTIVE
    │
    ▼
Traffic
```

So Active-Passive is primarily about **failover**, not using all resources continuously.

### Side-by-side

| | **Active-Active** | **Active-Passive** |
|---|---|---|
| Normal state | Both Regions serve traffic | One serves traffic |
| Standby Region | ❌ No | ✅ Yes |
| Utilizes both Regions | ✅ | ❌ |
| Failure handling | Remove unhealthy Region | Switch to standby |
| Availability | **Highest** | High |
| Typical use | Global applications | DR / backup Region |
