## ALB targets health check

Your Application Load Balancer periodically sends requests to its registered targets to test their status. These tests are called health checks. Each load balancer node routes requests only to the healthy targets in the enabled Availability Zones for the load balancer. Each load balancer node checks the health of each target, using the health check settings for the target group with which the target is registered. After your target is registered, it must pass one health check to be considered healthy. After each health check is completed, the load balancer node closes the connection that was established for the health check.

## NLB targets health check

Many people assume NLB only does TCP health checks, but that is not true since November 2022.

### ✅ NLB Supported Health Check Protocols

| **Protocol** | **Supported?** | **Notes**                                           |
| ------------ | -------------- | --------------------------------------------------- |
| **TCP**      | ✅ Yes          | Default — checks if the port is open                |
| **HTTP**     | ✅ Yes          | Checks a specific path and expects an HTTP response |
| **HTTPS**    | ✅ Yes          | Same as HTTP, but over TLS                          |

### TCP vs HTTP Health Check — Key Difference

```text
TCP Health Check:
    NLB → "Is port 80 open?" → YES → Target is healthy ✅
    (Doesn't care about application errors — only the connection)

HTTP Health Check:
    NLB → "GET /health" → 200 OK → Target is healthy ✅
    NLB → "GET /health" → 500 Error → Target is UNHEALTHY ❌
```
