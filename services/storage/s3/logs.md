# CloudTrail and Server access logging

Both can be used for logging.

### CloudTrail captures a subset of API calls for Amazon S3

- [CloudTrail](https://github.com/vikchupak/AWS/blob/main/services/cloudtrail/CloudTrail.md)
- By default, CloudTrail captures management events (bucket-level actions) only
- Object-level actions (e.g., GetObject, PutObject) require explicitly enabling CloudTrail Data Events — they are NOT on by default
- Even with data events enabled, CloudTrail does not capture certain HTTP-level fields

### Server access logging

<img width="1055" height="712" alt="image" src="https://github.com/user-attachments/assets/8f370363-6b42-4983-a539-ec22b13e0447" />

S3 Server Access Logging captures HTTP-level request details including:
- Referrer, User-Agent, TLS version, Cipher suite
- Turn-around time, Total time
- Bytes sent, Object size
- Error codes, HTTP status

<img width="817" height="421" alt="image" src="https://github.com/user-attachments/assets/ad7c0097-2c48-4426-b653-2e123134d686" />
