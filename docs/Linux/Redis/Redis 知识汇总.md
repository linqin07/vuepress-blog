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

```shell
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
port 6379
```

### 启停

```shell
#启动
./redis-server redis.conf

#停止
./redis-cli -h 127.0.0.1 -p 6379 shutdown
```

## Cluster 集群搭建

### 1.复制6份

复制上面单机配置6份（bin下面所有文件），分别定义为 redis01~redis06，修改端口为 7001~7006 , 注意要删除掉日志、rbd 文件、如果重置 redis 集群也要把生成的 node.conf 删除掉。

### 2.用脚本启动

```shell
cd redis01
./redis-server redis.conf
cd ..
cd redis02
./redis-server redis.conf
cd ..
cd redis03
./redis-server redis.conf
cd ..
cd redis04
./redis-server redis.conf
cd ..
cd redis05
./redis-server redis.conf
cd ..
cd redis06
./redis-server redis.conf
cd ..
```

查看进程可以知道已经启动了 ps -ef|grep redis

```
root      32149      1  0 20:47 ?        00:00:00 ./redis-server 192.168.233.128:7001 [cluster]
root      32151      1  0 20:47 ?        00:00:00 ./redis-server 192.168.233.128:7002 [cluster]
root      32159      1  0 20:47 ?        00:00:00 ./redis-server 192.168.233.128:7003 [cluster]
root      32164      1  0 20:47 ?        00:00:00 ./redis-server 192.168.233.128:7004 [cluster]
root      32166      1  0 20:47 ?        00:00:00 ./redis-server 192.168.233.128:7005 [cluster]
root      32171      1  0 20:47 ?        00:00:00 ./redis-server 192.168.233.128:7006 [cluster]
```

### 3.节点握手

```shell
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7001 cluster meet 192.168.233.128 7001
OK
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7001 cluster meet 192.168.233.128 7002
OK
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7001 cluster meet 192.168.233.128 7003
OK
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7001 cluster meet 192.168.233.128 7004
OK
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7001 cluster meet 192.168.233.128 7005
OK
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7001 cluster meet 192.168.233.128 7006
OK
```

查看节点信息

```json
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7001 cluster nodes
d8d281eb8ee004bd8815eb4c716b62a224ba4894 192.168.233.128:7005@17005 master - 0 1650286224000 0 connected
60ba0e2ad7c165b9fb174afadb1c2c75f2a69f72 192.168.233.128:7003@17003 master - 0 1650286226164 5 connected
1a21b9407d2ad75836c803f9aa927036f60f51c4 192.168.233.128:7001@17001 myself,master - 0 1650286225000 1 connected
532f83128e65e006954b43c6cb4be59c93dbe645 192.168.233.128:7002@17002 master - 0 1650286225157 2 connected
a9def6e64b78e0b205876783fa62065dca307ea3 192.168.233.128:7006@17006 master - 0 1650286224000 4 connected
12ebb0e51c956f6f7d0335add17c21b42f5a7add 192.168.233.128:7004@17004 master - 0 1650286224150 3 connected
```



### 4.分配槽

我们把 7001、7003、7005 端口的节点作为主节点，负责处理槽和相关数据；7002、7004、7006 端口的节点分别作为从节点，负责故障转移。先把16384个槽平均分配给6380、6382、6384端口的节点，为节点分配槽是通过`cluster addslots` 命令实现：

```shell
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7001 cluster addslots {0..5461}     
OK
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7003 cluster addslots {5462..10922}
OK
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7005 cluster addslots {10923..16383}
OK
```

```json
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7001 cluster nodes
700616e39189f9eb2ad8f4e01677fd0d6e66a52e 192.168.233.128:7006@17006 master - 0 1650286775000 5 connected
37b63b1cf822420c231ce512196e8161a53b2b78 192.168.233.128:7003@17003 master - 0 1650286774000 2 connected 5462-10922
d437d0c43c9eb6d4753269ae9774ea3dc9c6b189 192.168.233.128:7002@17002 master - 0 1650286776691 4 connected
4d11ed7dff78760368281927092e36bb10249237 192.168.233.128:7001@17001 myself,master - 0 1650286773000 1 connected 0-5461
e98628877ddb0b27dfdbdda96e45d0e9e690b7f8 192.168.233.128:7005@17005 master - 0 1650286775685 0 connected 10923-16383
a6a1e1655b315b6dafaead630ef6ecbadc20ac01 192.168.233.128:7004@17004 master - 0 1650286774000 3 connected
```

再使用cluster replicate命令把一个节点变成从节点.，这个命令必须在从节点上运行，它的语法是：

cluster replicate 主节点ID

```shell
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7002 cluster replicate 4d11ed7dff78760368281927092e36bb10249237  
OK
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7004 cluster replicate 37b63b1cf822420c231ce512196e8161a53b2b78
OK
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7006 cluster replicate e98628877ddb0b27dfdbdda96e45d0e9e690b7f8
OK
```

```json
[root@localhost redis_cluster]# ./redis01/redis-cli -h 192.168.233.128 -p 7001 cluster nodes
700616e39189f9eb2ad8f4e01677fd0d6e66a52e 192.168.233.128:7006@17006 slave e98628877ddb0b27dfdbdda96e45d0e9e690b7f8 0 1650286933763 5 connected
37b63b1cf822420c231ce512196e8161a53b2b78 192.168.233.128:7003@17003 master - 0 1650286931751 2 connected 5462-10922
d437d0c43c9eb6d4753269ae9774ea3dc9c6b189 192.168.233.128:7002@17002 slave 4d11ed7dff78760368281927092e36bb10249237 0 1650286931000 4 connected
4d11ed7dff78760368281927092e36bb10249237 192.168.233.128:7001@17001 myself,master - 0 1650286931000 1 connected 0-5461
e98628877ddb0b27dfdbdda96e45d0e9e690b7f8 192.168.233.128:7005@17005 master - 0 1650286930000 0 connected 10923-16383
a6a1e1655b315b6dafaead630ef6ecbadc20ac01 192.168.233.128:7004@17004 slave 37b63b1cf822420c231ce512196e8161a53b2b78 0 1650286932755 3 connected
```

亲测分配槽 7001 7002 7003，无法设置从节点 7004 7005 7006，但是间隔可以成功。

上面分配槽 7001 7003 7005，可以设置从节点 7002 7004 7006

### 5.停止

```shell
./redis-cli -h 192.168.233.128 -p 7001 shutdown
./redis-cli -h 192.168.233.128 -p 7002 shutdown
./redis-cli -h 192.168.233.128 -p 7003  shutdown
./redis-cli -h 192.168.233.128 -p 7004 shutdown
./redis-cli -h 192.168.233.128 -p 7005 shutdown
./redis-cli -h 192.168.233.128 -p 7006  shutdown
```

或则直接kill掉进程



## 常用命令

  [知识点](https://www.cnblogs.com/Jtianlin/p/10259062.html)

登陆使用密码， 集群模式不可以选择数据库，默认使用0数据库， 同时登录命令需要加上`-c`参数

```sh
./redis-cli
auth "123456"
或者
./redis-cli -h 127.0.0.1 -p 6379 -a myPassword
选择数据库
select 10

集群模式
./bin/redis-cli -c -h 192.168.33.60 -p 7000 -a pwd123456
```

展现列表，可以使用通配符：

```sh
keys mykey*

集群模式,不能去掉\;换成你redis集群的一个节点的ip和端口，需要在只能分片的槽上面才可以看keys
./redis-cli -c -a pwd123456 --cluster call 192.168.168.161:7001 keys \*
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

## Redis键(key)操作

```
set k1 a` --->`key:k1 ; value:a
set k2 b
```

- `keys *` 	查看当前库所有skey

- `exists key`	 判断某个key是否存在  -->`exists k1`

- `type key` 		查看你的key是什么类型  -->`type k1` 

- `del key` 	删除指定的key数据 -->`del k1` 

- `unlink key`根据value选择非阻塞删除仅将keys从keyspace元数据中删除，真正的删除会在后续异步操作。

- `expire key 10` 	10秒钟：为给定的key设置过期时间 -->`expire k2 10` 

- `ttl key `		查看还有多少秒过期，-1表示永不过期，-2表示已过期  -->`ttl k2 `	

  

```shell
// 不存在就设置成功，否则设置失败
setnx key value
expire key 30
// 不存在设置，顺便设置过期时间，等同于上面两条的原子操作
set lock:168 1 nx ex 30


```



## 高并发下的问题

- 缓存穿透

  直接请求没有命中符合的数据，频繁的直接查数据库。解决方案一是直接把空对象缓存起来，设置好 ttl，二是使用布隆过滤器，核心就是 bitmap 这个数据结构，使用位表示是否存在。
  
- 缓存击穿

  如果缓存中的数据在某个时刻批量过期，导致大部分用户的请求都会直接落在数据库上，这种现象就叫作缓存击穿

  解决一是动态设置ttl过期时间，二是使用分布式锁保证每个key同时只有一个线程去查询后端服务。

- 缓存雪崩

  

  。数据存储层的调用量就会暴增，用不了多长时间，数据库就会被大流量压垮，这种级联式的服务故障，就叫作缓存雪崩。
  
  解决一是保证 redis 集群高可用，二是控制好限流操作。比如 nginx 限流。

