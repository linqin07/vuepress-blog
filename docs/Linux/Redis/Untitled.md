## Redis 知识总结

### 安装

#### 1.下载源码并解压

```shell
wget http://download.redis.io/releases/redis-4.0.10.tar.gz
tar -xzf redis-4.0.10.tar.gz
cd redis-4.0.10
```

#### 2.编译

```shell
yum -y install gcc gcc-c++ kernel-devel
make
```

等待编译完成

#### 3.安装

```shell
make PREFIX=/usr/local/redis install
mkdir /usr/local/redis/etc/
cp redis.conf /usr/local/redis/etc/
cd /usr/local/redis/bin/
cp redis-benchmark redis-cli redis-server /usr/bin/
```

#### 4.更改配置

```
vim /usr/local/redis/etc/redis.conf

# 修改一下配置
# redis以守护进程的方式运行
# no表示不以守护进程的方式运行(会占用一个终端)  
daemonize yes

# 客户端闲置多长时间后断开连接，默认为0关闭此功能                                      
timeout 300

# 设置redis日志级别，默认级别：notice                    
loglevel verbose

# 设置日志文件的输出方式,如果以守护进程的方式运行redis 默认:"" 
# 并且日志输出设置为stdout,那么日志信息就输出到/dev/null里面去了 
logfile stdout
# 设置密码授权
requirepass <设置密码>
# 监听ip
bind 127.0.0.1 
```

### 命令

  [知识点](https://www.cnblogs.com/Jtianlin/p/10259062.html)

```sh
./redis-cli
auth "123456"

```

