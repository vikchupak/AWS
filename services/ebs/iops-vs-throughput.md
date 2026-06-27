# IOPS

- IOPS stands for Input/Output Operations Per Second
  - It tells you how many individual read or write tasks the storage volume can handle in one single second
  - Read and Write counts as an "Operation"

# IOPS vs Throughput (measured in MiB/s)

It's easy to confuse IOPS with Throughput
- IOPS is about frequency (how many small transactions can happen at once). This is critical for transactional databases (like MongoDB, PostgreSQL, or MySQL) where thousands of users are making tiny, rapid reads and writes.
- Throughput is about volume (how much total data is moving per second). This matters for streaming a single massive 4K video file or processing large, sequential data logs.
