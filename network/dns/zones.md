# Hosted zone

- DNS records DB for a domain
- Hosted zone is a set of Authoritative Nameservers. See [here](https://github.com/vikchupak/AWS/blob/main/network/dns/dns.md)

# Public hosted zone

- A Public Hosted Zone is for domains that must be reachable from the public internet & VPCs

```
mycompany.com
  ├── www.mycompany.com  -> CloudFront
  ├── api.mycompany.com  -> Public ALB
```

# Private hosted zone

- A Private Hosted Zone is only resolvable inside your VPC(s).

```
internal.mycompany.local
  ├── db.internal.mycompany.local -> RDS private IP
  ├── auth.internal.mycompany.local -> Internal ALB
```

### 🔦 Key Differences

| Feature                  | Public Hosted Zone         | Private Hosted Zone |
| ------------------------ | -------------------------- | ------------------- |
| Resolvable from internet | ✅ Yes                      | ❌ No                |
| Resolvable inside VPC    | ✅ Yes                      | ✅ Yes               |
| Needs domain registrar   | ✅ Yes (if external domain) | ❌ No                |
| Typical use              | Websites, public APIs      | Internal services   |
| Associated with VPC      | ❌ No                       | ✅ Required          |
| Cost                     | Same pricing               | Same pricing        |

# Split-view Hosted Zone

- The same domain in both public and private zones

You can have:

* Public zone: `mycompany.com`
* Private zone: `mycompany.com`

Route 53 will resolve based on **where the request comes from**:

* Inside VPC → private records
* Outside → public records
