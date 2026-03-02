# Cold Start. Standard (On-Demand) Concurrency vs Provisioned Concurrency vs SnapStart

## 1. Standard (On-Demand) Concurrency

By default, Lambda is "on-demand." When a request comes in, AWS checks if an idle instance (a "warm" one) is available. If not, it creates a new one.

* **The Problem: Cold Starts.** Creating a new instance involves downloading your code, starting the runtime, and running your initialization code (like database connections). This delay is called a **Cold Start**.
* **The Behavior:** It scales automatically. If you get 100 simultaneous requests, AWS spins up 100 instances.
* **Cost:** You only pay for the exact time your code is running (per millisecond).

## 2. Provisioned Concurrency

Provisioned Concurrency is like "pre-ordering" your capacity. You tell AWS, "I always want 10 instances ready and waiting."

* **The Solution: No Cold Starts.** AWS initializes those 10 instances immediately. When a request hits one of them, it’s already "warm"—the code is loaded, the DB is connected, and it responds instantly.
* **The Behavior:** It provides a floor of "ready-to-go" capacity.
* **Inside the limit:** Requests stay fast.
* **Exceeding the limit:** If you have 10 provisioned instances but get 15 requests, the extra 5 will scale using **On-Demand Concurrency** and will experience a cold start.


* **Cost:** You pay a **fixed hourly rate** for the "provisioned" capacity, regardless of whether you use it, plus the standard request fee.

## 3. SnapStart

**SnapStart** is essentially the "cheat code" for cold starts.

### How SnapStart Works

When you publish a new version of your code with SnapStart enabled:

1. **Initialization:** Lambda runs your function's initialization code (everything outside the handler) **once**.
2. **Snapshot:** It takes a "snapshot" of the entire memory and disk state of that initialized environment.
3. **Restoration:** When a request comes in, instead of starting from scratch, Lambda simply **restores** that snapshot. This is much faster than a full cold start.
   - 1 snapshot is used to quickly make many lambda copies from that snapshot

### SnapStart vs Provisioned Concurrency

- The main reason SnapStart exists is that **Provisioned Concurrency is expensive** — you pay for those "warm" instances 24/7
- SnapStart is significantly cheaper (often effectively free) because it doesn't keep instances running

| Feature | SnapStart | Provisioned Concurrency |
| --- | --- | --- |
| **Speed** | **Fast** (Sub-second startup) | **Instant** (Double-digit ms) |
| **Cost** | **Low/Zero** (Pay for snapshot storage/restoration) | **High** (Fixed hourly fee) |
| **Best For** | Spiky, infrequent traffic | Constant, mission-critical traffic |
| **Runtimes** | Java (11+), Python (3.12+), .NET (8+) | **All** Runtimes |
| **Architecture** | x86 only | x86 and ARM (Graviton) |

---

### The "Catch" (Compatibility)

1. **Limited Runtimes:** It was built primarily for heavy runtimes like **Java**, **Python**, and **.NET** where cold starts are notoriously slow (often 5+ seconds). Lightweight runtimes like Node.js or Go don't support it yet because their cold starts are already fast.
2. **Mutually Exclusive:** You **cannot** use SnapStart and Provisioned Concurrency on the same function version. You have to pick one.
3. **The "Uniqueness" Problem:** Because the snapshot is a literal copy of memory, things like **random number seeds** or **unique database connection IDs** might be identical across multiple instances if they were generated during the "snapshot" phase. You have to use "Runtime Hooks" to refresh these values upon restoration.

### When to use which?

* **Use SnapStart** if you are using Java/Python/.NET and want to kill 90% of your cold start delay without paying the high monthly bill of Provisioned Concurrency.
* **Use Provisioned Concurrency** if your app is so sensitive that even a 200ms "SnapStart" delay is too long, or if you are using a runtime like Node.js.
