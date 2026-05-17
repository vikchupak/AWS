# Lambda@edge

- Lambda@edge - **lightweight** Lambda at **cloudfront edge locations**
- Used to adjust data between viewer & origin
- Can be run
  - After CF receives a request from a viewer
  - Before CF forwards the request to an origin
  - After CF receives the response from the origin
  - Before CF forwards the response to the viewer


# CloudFront Functions vs Lambda@Edge

- CloudFront Functions = ultra-fast, simple logic at edge
- Lambda@Edge = powerful, flexible logic at edge

| Feature          | CloudFront Functions    | Lambda@Edge           |
| ---------------- | ----------------------- | --------------------- |
| 🚀 Latency       | **Ultra-low (<1 ms)**   | Low (but higher)      |
| 💰 Cost          | **Very cheap**          | More expensive        |
| 🧠 Complexity    | Simple logic only       | Complex logic         |
| ⏱ Execution time | ~1 ms                   | Up to seconds         |
| 🧩 Language      | JavaScript (limited)    | Node.js / Python      |
| 🌐 Network calls | ❌ Not allowed           | ✅ Allowed             |
| 📦 AWS SDK       | ❌ No                    | ✅ Yes                 |
| 🔄 Event types   | Viewer request/response | All (viewer + origin) |
| 🧪 Use cases     | Redirects, headers      | Auth, dynamic logic   |
