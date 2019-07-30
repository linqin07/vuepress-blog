# SSH免密

1. 生成密钥对，`-t`表示使用加密算法为 rsa

   ```sh
   ssh-keygen [-t rsa]
   ```
   生成文件`id_rsa`
   ，`id_rsa.pub`

   /home/用户名/.ssh/id_rsa          私钥   600  一定为600

   /home/用户名/.ssh/id_rsa.pub    公钥  644

2. 分发公钥到客户端，`-i`表示复制到指定文件名称，也可以使用`scp`复制到客户端再修改名字为`authorized_keys`

   ```sh
   ssh-copy-id [-i id_rsa.pub] root@192.168.152.128
   ```
   客户端路径对应关系如下：
   |   用户   |            客户端路径             |
   | :------: | :-------------------------------: |
   |   root   |    /root/.ssh/authorized_keys     |
   | 其他用户 | /home/用户名/.ssh/authorized_keys |

   

