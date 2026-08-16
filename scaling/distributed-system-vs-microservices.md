# Distributed system vs microservices

They are **related, but not the same**.

### Distributed system

A **distributed system** is a system where multiple independent computers/processes work together over a network.

For example:

```text
          Application
              │
     ┌────────┼────────┐
     │        │        │
   Node A   Node B   Node C
```

Examples include:

* Distributed databases
* Kubernetes clusters
* Kafka
* Redis clusters
* Microservices
* CDN
* Distributed caches

The key idea is **multiple machines/processes cooperating**.

### Microservices

**Microservices is an architectural style** where an application is split into multiple relatively independent services.

```text
              Application
                   │
       ┌───────────┼───────────┐
       │           │           │
    Users API   Orders API   Payments API
       │           │           │
     DB/Cache    DB/Cache    DB/Cache
```

Each service can potentially run on multiple machines:

```text
Users Service
├── Instance A
├── Instance B
└── Instance C
```

Therefore, a microservices application is **usually a distributed system**.

### But distributed system ≠ microservices

For example, this is a distributed system but **not necessarily microservices**:

```text
             PostgreSQL Cluster
            /        |        \
         Node A    Node B    Node C
```

It's one database system distributed across multiple nodes.

And this could be microservices without much distribution:

```text
          One server
              │
    ┌─────────┼─────────┐
    │         │         │
  Users     Orders   Payments
  Service   Service  Service
```

You could technically run all three services on one machine.

### The easiest way to remember

> **Distributed system = multiple computers/processes cooperating.**

> **Microservices = application architecture split into independent services.**

So **microservices commonly create distributed systems**, but **distributed systems are much broader than microservices**.
