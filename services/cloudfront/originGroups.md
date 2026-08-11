# Origin Groups

<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/91a7a397-a7db-4ed0-b846-38a84ebb7e83" />

- Origin Groups per Distribution: 10 (Default, adjustable)
- Origins within a Single Group: **Exactly 2** (1 Primary + 1 Secondary)

An origin group may contain two origins: a primary and a secondary. If the primary origin is unavailable or returns specific HTTP response status codes that indicate a failure, CloudFront automatically switches to the secondary origin. To set up origin failover, you must have a distribution with at least two origins.
