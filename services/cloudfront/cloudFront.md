# Cloud Front

## Edge location vs Regional edge cache

| Feature | Edge Location (POP) | Regional Edge Cache (REC) |
| --- | --- | --- |
| **Hierarchy** | First point of contact for users. | Intermediate layer between Edge and Origin. |
| **Quantity** | 600+ globally (as of 2024/2025). | 13+ globally (located in major AWS regions). |
| **Cache Size** | Smaller; stores only the most popular content. | Much larger; stores a wider "tail" of content. |
| **Retention** | Content is evicted quickly if not popular. | Content stays cached much longer. |
| **Purpose** | Minimizes latency (milliseconds). | Increases cache hit ratio and protects the origin. |

### How They Work Together (The Request Flow)

When a user requests a file (like an image or video), CloudFront follows this logic:

1. **Step 1: Edge Location (PoP)** – The request goes to the physically closest Edge Location. If the file is there (a **Cache Hit**), it’s served immediately.
2. **Step 2: Regional Edge Cache** – If it’s not at the Edge (a **Cache Miss**), the Edge Location looks in the Regional Edge Cache. Because RECs have massive storage, there is a high chance the file is still there even if it has expired from the local Edge.
3. **Step 3: Origin** – Only if the REC also doesn’t have the file does CloudFront go all the way back to your Origin (e.g., S3 or EC2) to fetch the master copy.

### Why do Regional Edge Caches exist?

Before RECs were introduced, every "Cache Miss" at a local edge went straight to your origin server. This could cause massive "thundering herd" traffic spikes to your origin if a piece of content became semi-popular.

**Regional Edge Caches** act as a buffer. They "collapse" multiple requests from different local edge locations into a single request to your origin, saving you money on data transfer and reducing server stress.

## CloudFront Distribution

- A Distribution is a **logical configuration file/resource** you create in the AWS Console. It tells AWS, "If someone visits cdn.example.com, use these Origins and apply these Behaviors (how to cache them)
  - Distributions contain configurations deployed to edge locations

**Purpose:**

* Defines **how** CloudFront behaves for your content
* Connects your content to CloudFront’s global network

**What it contains:**

* Origin (S3, ALB, EC2, API Gateway, custom origin)
* Cache behaviors (paths, TTLs, headers, cookies, query strings)
* Viewer protocol policy (HTTP/HTTPS)
* Security (WAF, geo restriction, signed URLs/cookies)
* Logging, compression, HTTP/3, IPv6, etc.

**Key point:** A distribution is **not a server** and **not a location**. It’s a **logical configuration**

```
You create:
CloudFront Distribution
        ↓
User requests:
https://d123.cloudfront.net
        ↓
DNS routes user to nearest Edge Location
        ↓
Edge Location uses your Distribution rules
        ↓
Content served from cache or fetched from origin
```
