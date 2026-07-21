# Equal-Cost Multi-Path (ECMP)

ECMP (Equal-Cost Multi-Path) is a networking technique where a router can use multiple routes with the same “cost” (metric) to reach the same destination—and send traffic across all of them instead of picking just one.

Instead of one road → traffic jam, you use multiple identical roads → traffic is split → higher throughput + resilience.

### How ECMP works (conceptually)
- Router learns multiple routes to the same destination
- All routes have equal cost (same priority)
- Router installs all of them in routing table
- Traffic is distributed across paths using hashing (per flow)
