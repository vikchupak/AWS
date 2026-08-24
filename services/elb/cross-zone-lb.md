## Cross-Zone Load Balancing

- By default, ELB routes trafic to TG targets in its AZ, which can cause uneven trafic distribution between targes.
- With Cross-Zone ENABLED, ELB can route trafic to TG targets in other AZs for even trafic distribution between targes.

| Cross-Zone ENABLED | Cross-Zone DISABLED |
| :---: | :---: |
| <img width="392" alt="Czlb enabled" src="https://github.com/user-attachments/assets/ba9f4e6f-9fd0-45c4-bb35-921267b6748b" /> | <img width="392" alt="Czlb disabled" src="https://github.com/user-attachments/assets/6f05b361-1380-468a-a0a3-3d6d86de6986" /> |

| **Load Balancer** | **Supported?** | **Default**    | **Can Change?**                  | **Cross-AZ Data Transfer Cost?** |
| ----------------- | -------------- | -------------- | -------------------------------- | -------------------------------- |
| **ALB**           | ✅ Yes          | ✅ **ON**       | ✅ Yes (at target group level)    | ❌ No extra charge                |
| **NLB**           | ✅ Yes          | ❌ **OFF**      | ✅ Yes (LB or target group level) | ✅ **Yes — extra charge**         |
| **CLB**           | ✅ Yes          | ⚠️ **Depends** | ✅ Yes                            | ❌ No extra charge                |
| **GWLB**          | ✅ Yes          | ❌ **OFF**      | ✅ Yes                            | ✅ **Yes — extra charge**         |
