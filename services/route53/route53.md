# Route 53 Routing Policies

- [Simple](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-simple.html)
  - Route all traffic to a single resource
- [Failover](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html)
  - Route traffic to a primary resource, and if it becomes unhealthy, Route 53 automatically switches traffic to a secondary (backup) resource
    - Requires Health Checks
- [Multi-Value](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-multivalue.html)
  - Return multiple **healthy** IP addresses (up to 8) in response to a single DNS query
    - The client (browser, OS) then chooses which IP to connect to
- [Weighted](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html)
  - Split traffic between multiple resources based on assigned weights
- [Latency](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html)
  - Directs users to the AWS Region that provides the lowest network latency for them
    - It is based on AWS network measurements, not your application metrics
- [Geolocation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geo.html)
  - Route traffic based on the user’s geographic location (country, continent, or US state)
    - It is rule-based, not performance-based routing
- [Geoproximity](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geoproximity.html)
  - Route traffic based on the geographic distance between users and your resources, and lets you shift traffic using a bias value

### Adding records to Route53

- [Record types](https://github.com/vikchupak/Network/blob/main/dns/RecordTypes.md)

To route traffic to ELB, AWS uses aliases.
- Alias with a type "A" record set for **IPv4**
- Alias with a type "AAAA" record set for **IPv6**

### Rules evaluation

- Rules are evaluated in priority order, and the first matching rule wins

# Route 53 Hosted zones

- [Hosted zones](https://github.com/vikchupak/AWS/blob/main/network/dns/zones.md)

# AWS VPC DNS resolver

- [AWS VPC DNS resolver](https://github.com/vikchupak/AWS/blob/main/network/dns/vpcDnsResolver.md)
