# Lifecycle rules

There are two types of actions:

- **Transition actions** — define when objects transition to another storage class
  <img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/42bb7967-4a4e-4b61-a25d-39731c292524" />
- **Expiration actions** — define when objects can be deleted by Amazon S3 on your behalf. The exact time for when objects are actually deleted is not guaranteed but storage cost is incurred only up to set expiration.
  - You can implement an S3 Lifecycle policy to automatically delete the objects after a specified period.
