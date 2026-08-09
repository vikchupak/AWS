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

### Custom domain

With AWS AppSync, you can use custom domain names to configure a single, memorable domain that works for both your GraphQL and real-time APIs. Associate an SSL certificate to the AWS AppSync API using the AWS Certificate Manager (ACM) service to enable HTTPS communication.

### Note

AWS AppSync is often compared to Amazon API Gateway

- **Use API Gateway → For REST or HTTP APIs**
- **Use AppSync → For GraphQL APIs**, especially when you need real-time subscriptions or multiple data sources in a single query

## Example

AppSync pipeline resolvers offer an elegant server-side solution to address the common challenge faced in web applications—aggregating data from multiple database tables. Instead of invoking multiple API calls across different data sources, which can degrade application performance and user experience, AppSync pipeline resolvers enable easy retrieval of data from multiple sources with just a single call. By leveraging Pipeline functions, these resolvers streamline the process of consolidating and presenting data to end-users.

<img width="992" height="981" alt="image" src="https://github.com/user-attachments/assets/5f7ad9cb-5581-4be7-a283-d8fb2413fc16" />

AWS AppSync is a managed service that makes it easy to build scalable APIs that connect applications to data. Developers use AppSync every day to build GraphQL APIs that interact with data sources like Amazon DynamoDB, AWS Lambda, and HTTP APIs. With AppSync, developers can write their resolvers using JavaScript, and run their code on AppSync’s APPSYNC_JS runtime.
