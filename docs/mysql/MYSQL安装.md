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

![image-20210610214141823.png](https://gitee.com/linqin07/pic/raw/master/image-20210610214141823.png)

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

![1581351778874.png](https://gitee.com/linqin07/pic/raw/master/1581351778874.png)

  7. 修改密码

     如果忘记原始密码可以设置 /etc/my.cnf 文件，增加配置`skip-grant-tables`，再重启无需密码登陆，后面改好再把配置改回来即可。

     查看 mysql 初始的密码策略
     
     ```sql
SHOW VARIABLES LIKE 'validate_password%'; 
     ```

![1581413220671.png](https://gitee.com/linqin07/pic/raw/master/1581413220671.png)
     

 修改安全级别，密码长度
     	
     
     ```sql
     set global validate_password_policy=LOW;
set global validate_password_length=6;

     ```

     ```

     修改密码，为了提高安全性 mysql5.7 中 user 表的 password 字段已被取消，取而代之的事 authentication_string 字段
     
     ```sql
     ALTER USER USER() IDENTIFIED BY '123456';
     // 或则
     ALTER USER 'root'@'localhost' IDENTIFIED by '123456';
     // 或则
     set password for 'root'@'localhost'=password('123456');
     // 或则
update  mysql.user set authentication_string = password('123456') where User='root' and Host = '%';
     ```
     
     


​	

​	

   8. 允许远程登录

      ```sql
      use mysql;
      desc user;
      select host, user from user;
      ```

![1581493230599.png](https://gitee.com/linqin07/pic/raw/master/1581493230599.png)

​	

​	

​       修改 root 的登录权限，允许远程登录。此外，对应的防火墙端口一样要放开 3306 端口。

```sql
    update user set host = '%' where user = 'root';
    // 刷新权限
    flush privileges;
```