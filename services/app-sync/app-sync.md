# AWS AppSync

- **Fully managed**, **serverless** service
- Build **GraphQL and Pub/Sub APIs** to securely connect applications to data and events
- Lets you **access, manipulate, and combine data from multiple data sources** through a single API endpoint

```txt
Client App (Web/Mobile)
        ↓  GraphQL Query/Mutation/Subscription
AWS AppSync (GraphQL API Endpoint)
        ↓
Resolvers (JavaScript / TypeScript / VTL)
        ↓
Data Sources (DynamoDB, Lambda, RDS, HTTP, etc.)
```

<img width="559" height="272" alt="image" src="https://github.com/user-attachments/assets/f6d990e5-6264-4bca-a33f-fc16eec1eebd" />

### Note

AWS AppSync is often compared to Amazon API Gateway

- Use API Gateway → For REST or HTTP APIs
- Use AppSync → For GraphQL APIs, especially when you need real-time subscriptions or multiple data sources in a single query

