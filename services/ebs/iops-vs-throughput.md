# IOPS

- IOPS stands for Input/Output Operations Per Second
  - It tells you how many individual read or write tasks the storage volume can handle in one single second
  - Read and Write counts as an "Operation"

# IOPS vs Throughput (measured in MiB/s)

It's easy to confuse IOPS with Throughput
- IOPS is about frequency (how many small transactions can happen at once). This is critical for transactional databases (like MongoDB, PostgreSQL, or MySQL) where thousands of users are making tiny, rapid reads and writes.
- Throughput is about volume (how much total data is moving per second). This matters for streaming a single massive 4K video file or processing large, sequential data logs.

# Volume queue length

The volume queue length is the number of pending I/O requests for a device. Latency is the true end-to-end client time of an I/O operation, in other words, the time elapsed between sending an I/O to EBS and receiving an acknowledgment from EBS that the I/O read or write is complete. Queue length must be correctly calibrated with I/O size and latency to avoid creating bottlenecks either on the guest operating system or on the network link to EBS.
