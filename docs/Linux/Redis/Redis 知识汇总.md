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

`PREFIX` 要大写，安装后的文件列表如下

- `redis-benchmark`  性能测试工具

- `redis-check-aof`  日志文件检测工(比如断电造成日志损坏,可以检测并修复)

- `redis-check-dump`  快照文件检测工具,效果类上

- `redis-cli`  客户端

- `redis-server` 服务端

```shell
make PREFIX=/usr/local/redis install
// 复制到指定地方
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

### 常用命令

  [知识点](https://www.cnblogs.com/Jtianlin/p/10259062.html)

登陆使用密码

```sh
./redis-cli
auth "123456"
或者
./redis-cli -h 127.0.0.1 -p 6379 -a myPassword
选择数据库
select 10
```

展现列表，可以使用通配符：

```sh
keys mykey*
```
删除  del key1 key2

- 字符串类型：

   ttl key
   EXPIRE key 30

```sh
 // 单个get、set
 set key value ex 60
 get key
 
```

- [bitmap](https://www.jianshu.com/p/305e65de1b13)




### 高并发下的问题

- 缓存穿透

  直接请求没有命中符合的数据，频繁的直接查数据库。解决方案一是直接把空对象缓存起来，设置好 ttl，二是使用布隆过滤器，核心就是 bitmap 这个数据结构，使用位表示是否存在。
  
- 缓存击穿

  如果缓存中的数据在某个时刻批量过期，导致大部分用户的请求都会直接落在数据库上，这种现象就叫作缓存击穿

  解决一是动态设置ttl过期时间，二是使用分布式锁保证每个key同时只有一个线程去查询后端服务。

- 缓存雪崩

  如果在某一时刻缓存集中失效，或者缓存系统出现故障，所有的并发流量就会直接到达数据库。数据存储层的调用量就会暴增，用不了多长时间，数据库就会被大流量压垮，这种级联式的服务故障，就叫作缓存雪崩。

  解决一是保证 redis 集群高可用，二是控制好限流操作。比如 nginx 限流。

