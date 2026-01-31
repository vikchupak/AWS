# Cache Invalidation

- On distribution
  - Applies to all distribution edge locations (takes time)
  - Billing for invalidated **paths**
    - Request with `/index.html` and `/logo.png` counts as 2 path invalidations
    - Request with `/*` counts as 1 path invalidation
- Using versioned file names
  - App points to new file name like img_v1, img_v2
