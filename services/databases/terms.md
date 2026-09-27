# Recovery Point Objective (RPO) and Recovery Time Objective (RTO)

- Recovery Point Objective (RPO) -> Data Loss Tolerance
  - How much data (in time) you can afford to lose in a crash
- Recovery Time Objective (RTO) -> Downtime Tolerance
  - How long it takes to restore service and get the database back online after a failure

---

- Point-in-Time Recovery (PITR)
  - Restoring the database state back to a specific timestamp. Usually, PITR precision is down to the second
- Failover / Restoration Speed
  - Time required to detect failure and make the DB available again
