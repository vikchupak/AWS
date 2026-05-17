# Edge locations

Edge locations reduce latency in two ways

- Clients get **cahed** response from closest edge location
  - `User → Edge → User`
- Clients get response from origin via closest edge location
  - `User → Warsaw (edge) → Frankfurt (origin) → Warsaw (edge) → User`
  - Traffic between Amazon CloudFront edge locations and your origin (if it’s in AWS) uses the AWS global backbone network, which is faster and more reliable than the public Internet
