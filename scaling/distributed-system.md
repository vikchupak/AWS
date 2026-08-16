# Distributed cache

ElastiCache clusters running the Memcached engine supports Auto Discovery - the ability for client programs to automatically identify all of the nodes in a cache cluster, and to initiate and maintain connections to all of these nodes.

One distributed cache cluster spans multiple AZs, with one or more cache nodes in each AZ.

<img width="1497" height="711" alt="image" src="https://github.com/user-attachments/assets/0fe91f1b-9a5e-4e60-a0b0-bfef629f8d92" />

```txt
Region
│
├── AZ A
│   ├── EC2 A
│   └── Memcached Node A
│
└── AZ B
    ├── EC2 B
    └── Memcached Node B
```

The cache is logically one cluster, even though its nodes are physically distributed across AZs.

- EC2 A can access Node A or Node B.
- EC2 B can access Node A or Node B.
- The key determines which node stores the value.
- Auto Discovery lets clients discover the cluster's nodes.
- If a cache node fails, ElastiCache can replace it automatically.

Important caveat: Memcached distributes data; it doesn't replicate the same data to every AZ/node. So if Node A fails, data that was on Node A can be lost.

### Auto discovery

Suppose you start with:

```txt
Cache A
Cache B
```

The client discovers both.

Later AWS replaces a failed node:

```txt
Cache A
Cache B (failed)
Cache C (replacement)
```

Auto Discovery allows the client to learn about the new cluster topology instead of you having to hardcode/cache-manage the node endpoints.
