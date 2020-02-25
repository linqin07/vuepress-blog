## RPM 安装

1. 查看是否已经安装 Mysql，如果有结果返回，则执行 `rpm -e xxx`删除掉(xxx 是文件全名)

   ```sh {1}
   rpm -qa | grep mysql
   ```


  2. 下载官方 Mysql 包，没有安装 wget 的可以先安装一下 `yum -y install wget`，-c 参数断点续传

     ```sh
     wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
     ```

  3. 安装 Mysql 包

     ```sh
     yum -y install mysql57-community-release-el7-10.noarch.rpm
     ```

     ![1581351596328](https://i.loli.net/2020/02/25/kfTJyGu618LAZFq.png)

4. 安装 Mysql（这一步需要几分钟，静等安装）

   ```sh
   yum -y install mysql-community-server
   ```

5. 启动 Mysql 服务，没有权限，执行下面语句赋予权限 `chown mysql:mysql -R /var/lib/mysql`

   ```sh
   systemctl start  mysqld.service
   ```

   ```sh
   service mysqld status
   ```

  6. 查看初始密码

     ```sh
     grep 'password' /var/log/mysqld.log
     ```

     ![1581351778874](https://i.loli.net/2020/02/25/DLh2O8YoJHTQf3y.png)

  7. 修改密码

     查看 mysql 初始的密码策略

     ```sql
     SHOW VARIABLES LIKE 'validate_password%'; 
     ```

     ![1581413220671](https://i.loli.net/2020/02/25/hcKAFsg8DI5HOtl.png)

      修改安全级别，密码长度
     	

     ```sql
     set global validate_password_policy=LOW;
     set global validate_password_length=6;
     ```

     修改密码

     ```sql
     ALTER USER USER() IDENTIFIED BY '123456';
     ```

     


​	

​	

   8. 允许远程登录

      ```sql
      use mysql;
      desc user;
      select host, user from user;
      ```

      ![1581493230599](https://i.loli.net/2020/02/25/NriRopsdCkJ25X6.png)

​	

​	

​       修改 root 的登录权限，允许远程登录。此外，对应的防火墙端口一样要放开 3306 端口。

```sql
    update user set host = '%' where user = 'root';
    flush privileges;
```
