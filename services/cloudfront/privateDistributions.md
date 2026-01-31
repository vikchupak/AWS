# Private distributions/behaviours

- Configure only authorized users can access "protected/private" data via CF
  - Athority is checked by request signature (url or cookies)
    - Ways to sign requersts
      - "Trusted key group" - Modern Recommended
      - "CloudFront key" with "Trusted Signer" account - Legacy
    - **CF distribution/behaviour validates the request signature**
- Either whole distribution or only some behaviours can be private
