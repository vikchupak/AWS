# Private distributions/behaviours

- Secure "viewer - CF" protocol
- Privite "distributions/behaviours" means to access data behind distribution, you must be alowed/authorized
  - Athority is checked by request signature (url or cookies)
    - "Trusted key group" - Modern (recommended) method to sign requersts
    - "CloudFront key" with "Trusted Signer" account - Legacy method to sign requersts
    - CF distribution/behaviour validates the signature
- Either whole distribution or only some behaviours can be private
