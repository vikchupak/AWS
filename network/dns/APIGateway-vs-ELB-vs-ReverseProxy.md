# Api gateway vs elb vs reverse proxy

### **1. API Gateway**

**Purpose:** Acts as a **single entry point** for client requests to your backend services, especially in a **microservices or serverless architecture**.

**Key features:**

* Request routing to multiple services (REST, WebSocket, gRPC).
* Protocol translation (HTTP → WebSocket, HTTP → Lambda, etc.).
* Rate limiting, throttling, and quotas.
* Authentication/authorization (JWT, OAuth, API keys).
* Request/response transformations (mapping templates, headers, etc.).
* Caching.

**Use case:**

* You have many microservices and want a unified interface for clients.
* You need fine-grained control over API traffic, security, and monitoring.

**Example:**
AWS API Gateway + Lambda: a request to `/users` → triggers Lambda → returns JSON.

---

### **2. ELB (Elastic Load Balancer in AWS)**

**Purpose:** Distributes incoming traffic across multiple instances or services to **ensure high availability and scalability**.

**Types:**

* **ALB (Application Load Balancer):** Layer 7 (HTTP/HTTPS), can do path-based routing.
* **NLB (Network Load Balancer):** Layer 4 (TCP/UDP), high performance, static IPs.
* **CLB (Classic Load Balancer):** Legacy, supports L4/L7, not recommended for new projects.

**Key features:**

* Health checks for targets (EC2, ECS, Lambda).
* SSL/TLS termination.
* Sticky sessions (session affinity).
* Basic path or host-based routing (ALB).

**Use case:**

* You have multiple instances or containers and want **automatic traffic distribution**.
* You don’t need advanced API-level features like rate limiting or request transformation.

**Example:**
Clients hit `https://myapp.com` → ALB routes traffic to EC2 instances in different AZs → balances load.

---

### **3. Proxy / Reverse Proxy**

**Purpose:** Acts as an **intermediary between clients and servers**, usually for security, caching, or routing.

**Types:**

* **Forward proxy:** Hides client details from the server (used by clients to access the internet).
* **Reverse proxy:** Hides server details from clients, usually sits in front of web servers.

**Key features:**

* SSL termination.
* Request/response modification.
* Load balancing (basic).
* Caching and compression.
* Security features: WAF, IP filtering, rate limiting.

**Popular software:** NGINX, HAProxy, Traefik, Envoy.

**Use case:**

* You want to serve multiple backend services under a single domain (`/app1`, `/app2`).
* You want caching, compression, or TLS offloading.

**Example:**
NGINX reverse proxy: `example.com/app1` → `http://localhost:8080`, `example.com/app2` → `http://localhost:8081`.

---

### **Comparison Table**

| Feature                       | API Gateway                  | ELB / Load Balancer          | Reverse Proxy / Proxy       |
| ----------------------------- | ---------------------------- | ---------------------------- | --------------------------- |
| Layer                         | 7 (HTTP/HTTPS, WebSocket)    | 4 (TCP) / 7 (HTTP/HTTPS)     | 4 (TCP) / 7 (HTTP/HTTPS)    |
| Routing                       | Path, method, headers, query | Path, host (ALB), port       | Path, host, headers         |
| Authentication & Authz        | ✅ OAuth/JWT/API keys         | ❌ (limited TLS client certs) | ✅ with plugins/modules      |
| Rate limiting / Throttling    | ✅                            | ❌                            | ✅ with modules              |
| Caching / Response transforms | ✅                            | ❌                            | ✅ (with NGINX, Varnish)     |
| Load balancing                | Limited (can route traffic)  | ✅ primary function           | ✅ (basic)                   |
| Integration with serverless   | ✅ (Lambda, Functions)        | ❌                            | ❌                           |
| Security / WAF                | ✅                            | ✅ via AWS WAF integration    | ✅ via NGINX/Traefik modules |

---

### **When to use what**

1. **API Gateway:** Microservices/serverless APIs, need auth, rate limits, transformations.
2. **ELB:** Auto-scaling instances, basic routing/load distribution, high availability.
3. **Reverse Proxy:** Traditional web apps, caching, SSL termination, or internal service routing.

---

**💡 TL;DR:**

* **API Gateway:** API-focused, auth & throttling, microservices/serverless.
* **ELB:** Load balancer, instance-level, high availability.
* **Reverse Proxy:** Flexible, sits in front of servers for routing, caching, SSL, or security.

# Is it common to use api gateway and loadbalancer at the same time?

Yes, in **AWS it’s actually quite common** to use **API Gateway and a Load Balancer together**, but it depends on your architecture and traffic patterns. Here’s how it typically works and why people do it:

---

### **Common scenarios**

#### **1. API Gateway → Lambda**

* **No load balancer needed.**
* API Gateway directly triggers Lambda functions.
* Typical for serverless microservices.

---

#### **2. API Gateway → ALB → EC2 / ECS**

* **When your backend is not serverless**, e.g., containerized microservices running on ECS or EC2.
* Flow:

```
Client → API Gateway → ALB → ECS service / EC2 instances
```

* **Why use both:**

  1. **API Gateway** handles:

     * Authentication/authorization (JWT, OAuth, API keys)
     * Rate limiting / throttling
     * Request/response transformations
  2. **ALB (Application Load Balancer)** handles:

     * Load balancing across multiple backend instances or ECS tasks
     * Health checks
     * Path-based routing inside your cluster

* This separation allows **API Gateway to focus on API management**, while **ALB focuses on scalability and high availability**.

---

#### **3. Direct ALB without API Gateway**

* You skip API Gateway and let ALB expose your services directly.
* Works fine if:

  * You don’t need API-level features like auth, throttling, request transformations.
  * Clients are internal or trusted.

---

### **Why you might combine them**

* **Fine-grained API control + backend scalability**
* **Microservices / monolithic hybrid**
  Some APIs go through API Gateway (public API), while other traffic goes directly to ALB (internal services).
* **Security boundary**
  API Gateway can sit in front of ALB to enforce auth, logging, and quotas before hitting the backend.

---

✅ **Rule of thumb in AWS:**

* **Serverless backend → API Gateway only**
* **EC2/ECS backend → ALB only**
* **EC2/ECS + need API-level control → API Gateway + ALB**
