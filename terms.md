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
