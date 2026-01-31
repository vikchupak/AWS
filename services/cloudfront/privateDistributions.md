# Private distributions/behaviours

- Secure "viewer - CF" protocol
- Privite "distributions/behaviours" means to access "private" data behind a distribution, you must be authorized
  - Athority is checked by request signature (url or cookies)
    - Ways to sign requersts
      - "Trusted key group" - Modern (recommended)
      - "CloudFront key" with "Trusted Signer" account - Legacy
    - **CF distribution/behaviour validates the request signature**
- Either whole distribution or only some behaviours can be private
