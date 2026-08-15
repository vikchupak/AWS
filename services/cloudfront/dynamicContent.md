# CDN for dynamic content - REST API

CDNs Do More Than Just Cache Static Content.

The Common Misconception: most people think CDNs = static content caching only (images, videos, CSS, JS). That's the primary use case, **but it's not the only one**.

When you route a dynamic REST API through Amazon CloudFront, you simply **turn off caching** for those endpoints, and CloudFront switches from acting like a "file cache" to acting like a smart, high-speed network proxy.

<img width="692" height="322" alt="image" src="https://github.com/user-attachments/assets/ae05873b-168f-4775-9564-9b464b0c787c" />

## Dynamic Behavior Settings (How to turn off caching)

CloudFront lets you control caching down to the exact URL path using **Cache Behaviors**:

| Path Pattern | Behavior | Caching Config | Typical Use Case |
| --- | --- | --- | --- |
| `/api/v1/players/*` | **No Caching** | Set to `CachingDisabled` | Dynamic user profile, inventory, real-time game actions |
| `/api/v1/leaderboard` | **Short TTL Caching** | Cache for 5–10 seconds | Offloads millions of database reads for high-traffic leaderboards |
| `/assets/*` | **Aggressive Caching** | Cache for 1 year | Game textures, updates, static patch manifests |

For dynamic paths, CloudFront proxies `GET`, `POST`, `PUT`, `DELETE`, and `PATCH` requests straight to your API without storing a single byte in cache, while ensuring headers like `Authorization` and `Cookie` pass through intact.
