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

![image-20210610214141823.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20210610214141823.png)

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

![1581351778874.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1581351778874.png)

  7. 修改密码

     如果忘记原始密码可以设置 /etc/my.cnf 文件，增加配置`skip-grant-tables`，再重启无需密码登陆，后面改好再把配置改回来即可。

     查看 mysql 初始的密码策略
     
     ```sql
     SHOW VARIABLES LIKE 'validate_password%'; 
     ```

![1581413220671.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1581413220671.png)
     

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

![1581493230599.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1581493230599.png)

​	

​	

​       修改 root 的登录权限，允许远程登录。此外，对应的防火墙端口一样要放开 3306 端口。

```sql
    update user set host = '%' where user = 'root';
    // 刷新权限
    flush privileges;
```





## [win安装mysql](https://blog.csdn.net/qq_41848006/article/details/88295973)<Badge text="转载"/>

- 1.下载 myql zip 包
  https://dev.mysql.com/downloads/mysql/

  https://downloads.mysql.com/archives/community/
  
- 2.解压出来，在解压目录下面新建 my.ini 文件

  ```json
  [mysqld]
  # 设置3306端口
  port=3306
  # 设置mysql的安装目录
  basedir=E:\\mysql-5.7.22-winx64
  # 设置mysql数据库的数据的存放目录
  datadir=E:\\mysql-5.7.22-winx64\\data
  # 允许最大连接数
  max_connections=200
  # 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
  max_connect_errors=10
  # 服务端使用的字符集默认为UTF8
  character-set-server=utf8
  # 创建新表时将使用的默认存储引擎
  default-storage-engine=INNODB
  [mysql]
  # 设置mysql客户端默认字符集
  default-character-set=utf8
  [client]
  # 设置mysql客户端连接服务端时默认使用的端口
  port=3306
  default-character-set=utf8
  ```

- 3.配置系统环境变量，把解压目录下面 bin 添加到 PATH 中

- 4.以`管理员`的身份打开cmd窗口

  - 初始化命令 mysqld --initialize --user=mysql --console (记住一定要进行初始化，很多人不进行初始化，就出现了1067错误，怎么弄都搞不了，初始化完成之后，会生成一个临时密码这里需要注意把临时密码记住）

  - 接着就是输入mysqld -install 进行服务的添加

  - 输入net start mysql启动服务

  -  输入mysql -u root -p进行登录数据库，这时提示需要密码，然后就是用你上面的密码登录

  - 修改密码语句：ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
    刷新：FLUSH PRIVILEGES;

    

- 备注：8.0之前版本，忘记密码修改方法

  -  找到bin目录：mysqld --skip-grant-tables
  - 重新在开一个cmd窗口， 找到bin目录：mysql就进入登陆状态了
    5.7.22修改密码语句：update user set authentication_string=password('123456') where user='root' and host='localhost';
    5.6.修改密码语句：update user set password=password('123456') where user='root' and host='localhost';  (我没有实验过，网上都是这么写的)