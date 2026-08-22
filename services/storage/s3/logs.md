# CloudTrail and Server access logging

Both can be used for logging.

### CloudTrail captures a subset of API calls for Amazon S3

- By default, CloudTrail captures management events (bucket-level actions) only
- Object-level actions (e.g., GetObject, PutObject) require explicitly enabling CloudTrail Data Events — they are NOT on by default
- Even with data events enabled, CloudTrail does not capture certain HTTP-level fields

### Server access logging

S3 Server Access Logging captures HTTP-level request details including:
- Referrer, User-Agent, TLS version, Cipher suite
- Turn-around time, Total time
- Bytes sent, Object size
- Error codes, HTTP status

<img width="817" height="421" alt="image" src="https://github.com/user-attachments/assets/ad7c0097-2c48-4426-b653-2e123134d686" />
