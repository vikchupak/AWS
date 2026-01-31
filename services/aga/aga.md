# AWS Global Accelerator (AGA)

- [Doc](https://aws.amazon.com/global-accelerator/)
- Use Private AWS global network to speed up data transfer
  - Improve performance by up to 60% compared to the public internet
- AGA uses `AGA edge locations` as entery/exit points to Private AWS global network
- Works on 4 OSI layer
  - Can be used for non http(s)

# TODO: Compare later with

- CloudFront
- S3 Transfer Acceleration
  - uses **CloudFront edge locations** and CloudFront Edge Network to send data faster
  - HTTP/HTTPS only as uses CloudFront
