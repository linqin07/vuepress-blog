

#### 1.下载

[下载二进制包](http://kafka.apache.org/downloads)

![1551084352010.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1551084352010.png)

#### 2.解压

> tar -zxvf kafka_2.11-2.1.1.tgz



#### 3.配置

基本上都使用默认，修改一下kafka自身的地址，zk连接的地址即可。

> listeners=PLAINTEXT://:9092
>
> zookeeper.connect=localhost:2181



#### 4.使用默认的zk

ps：最好不要用kafka自带的，可以先搭建好zookeeper集群

启动：

```shell
./bin/zookeeper-server-start.sh config/zookeeper.properties & 
```



#### 5.配置详解

具体参考：https://www.orchome.com/12

###### 常规配置

这些参数是 kafka 中最基本的配置

- broker.id

每个 broker 都需要有一个标识符，使用 broker.id 来表示。它的默认值是 0，它可以被设置成其他任意整数，在集群中需要保证每个节点的 broker.id 都是唯一的。

- port

如果使用配置样本来启动 kafka ，它会监听 9092 端口，修改 port 配置参数可以把它设置成其他任意可用的端口。

- zookeeper.connect

用于保存 broker 元数据的地址是通过 zookeeper.connect 来指定。localhost:2181 表示运行在本地 2181 端口。该配置参数是用逗号分隔的一组 hostname:port/path 列表，每一部分含义如下：

hostname 是 zookeeper 服务器的服务名或 IP 地址

port 是 zookeeper 连接的端口

/path 是可选的 zookeeper 路径，作为 Kafka 集群的 chroot 环境。如果不指定，默认使用跟路径

- log.dirs

Kafka 把消息都保存在磁盘上，存放这些日志片段的目录都是通过 `log.dirs` 来指定的。它是一组用逗号分隔的本地文件系统路径。如果指定了多个路径，那么 broker 会根据 "最少使用" 原则，把同一分区的日志片段保存到同一路径下。要注意，broker 会向拥有最少数目分区的路径新增分区，而不是向拥有最小磁盘空间的路径新增分区。

- num.recovery.threads.per.data.dir

对于如下 3 种情况，Kafka 会使用可配置的线程池来处理日志片段

服务器正常启动，用于打开每个分区的日志片段；

服务器崩溃后启动，用于检查和截断每个分区的日志片段；

服务器正常关闭，用于关闭日志片段

默认情况下，每个日志目录只使用一个线程。因为这些线程只是在服务器启动和关闭时会用到，所以完全可以设置大量的线程来达到井行操作的目的。特别是对于包含大量分区的服务器来说，一旦发生崩愤，在进行恢复时使用井行操作可能会省下数小时的时间。设置此参数时需要注意，所配置的数字对应的是 log.dirs 指定的单个日志目录。也就是说，如果 num.recovery.threads.per.data.dir 被设为 8，并且 log.dir 指定了 3 个路径，那么总共需要 24 个线程。

- auto.create.topics.enable

默认情况下，Kafka 会在如下 3 种情况下创建主题

当一个生产者开始往主题写入消息时

当一个消费者开始从主题读取消息时

当任意一个客户向主题发送元数据请求时

- delete.topic.enable

如果你想要删除一个主题，你可以使用主题管理工具。默认情况下，是不允许删除主题的，delete.topic.enable 的默认值是 false 因此你不能随意删除主题。这是对生产环境的合理性保护，但是在开发环境和测试环境，是可以允许你删除主题的，所以，如果你想要删除主题，需要把 delete.topic.enable 设为 true。

### 主题默认配置

Kafka 为新创建的主题提供了很多默认配置参数，下面就来一起认识一下这些参数

- num.partitions

num.partitions 参数指定了新创建的主题需要包含多少个分区。如果启用了主题自动创建功能（该功能是默认启用的），主题分区的个数就是该参数指定的值。该参数的默认值是 1。要注意，我们可以增加主题分区的个数，但不能减少分区的个数。

- default.replication.factor

这个参数比较简单，它表示 kafka保存消息的副本数，如果一个副本失效了，另一个还可以继续提供服务default.replication.factor 的默认值为1，这个参数在你启用了主题自动创建功能后有效。

- **log.retention.ms**

Kafka 通常根据时间来决定数据可以保留多久。默认使用 log.retention.hours 参数来配置时间，默认是 168 个小时，也就是一周。除此之外，还有两个参数 log.retention.minutes 和 log.retentiion.ms 。这三个参数作用是一样的，都是决定消息多久以后被删除，推荐使用 log.retention.ms。

- **log.retention.bytes**

另一种保留消息的方式是判断消息是否过期。它的值通过参数 `log.retention.bytes` 来指定，作用在每一个分区上。也就是说，如果有一个包含 8 个分区的主题，并且 log.retention.bytes 被设置为 1GB，那么这个主题最多可以保留 8GB 数据。所以，当主题的分区个数增加时，整个主题可以保留的数据也随之增加。

- log.segment.bytes

上述的日志都是作用在日志片段上，而不是作用在单个消息上。当消息到达 broker 时，它们被追加到分区的当前日志片段上，当日志片段大小到达 log.segment.bytes 指定上限（默认为 1GB）时，当前日志片段就会被关闭，一个新的日志片段被打开。如果一个日志片段被关闭，就开始等待过期。这个参数的值越小，就越会频繁的关闭和分配新文件，从而降低磁盘写入的整体效率。

- log.segment.ms

上面提到日志片段经关闭后需等待过期，那么 `log.segment.ms` 这个参数就是指定日志多长时间被关闭的参数和，log.segment.ms 和 log.retention.bytes 也不存在互斥问题。日志片段会在大小或时间到达上限时被关闭，就看哪个条件先得到满足。

- message.max.bytes

broker 通过设置 `message.max.bytes` 参数来限制单个消息的大小，默认是 1000 000， 也就是 1MB，如果生产者尝试发送的消息超过这个大小，不仅消息不会被接收，还会收到 broker 返回的错误消息。跟其他与字节相关的配置参数一样，该参数指的是压缩后的消息大小，也就是说，只要压缩后的消息小于 mesage.max.bytes，那么消息的实际大小可以大于这个值

这个值对性能有显著的影响。值越大，那么负责处理网络连接和请求的线程就需要花越多的时间来处理这些请求。它还会增加磁盘写入块的大小，从而影响 IO 吞吐量。





### 维护 kafka 消费者信息

kafka 中有一个队列 __consumer_offsets 默认没有副本，一旦数据有问题就会导致分区消费不平均、消费不下去、分区不消费等各种奇怪问题。下面是给这个 topic 增加副本并 assignment 分配好。kafka-manager 没法直接没有副本的topic。

生成相关 json 信息字符脚本，注意新增 id 这个文件，里面放 brokerId，每个换行。

```sh
for a in `seq 0 49` # 49表示__consumer_offsets topic的分区数-1
do
    while true
    do
        NUM1=`expr $RANDOM % 11` #11表示kafka节点数+1
        if [ $NUM1 != 0 ];then
       while true
    do
                NUM2=`expr $RANDOM % 11` #11表示kafka节点数+1
                if [ $NUM1 = $NUM2 -o $NUM2 = 0 ];then
         continue
     else
         break
        fi
    done
    break
        else
          continue
      fi
    done
  echo '{"topic":"__consumer_offsets","partition":'$a',"replicas":['`sed -n ${NUM1}p id`','`sed -n ${NUM2}p id`']},' #新增id这个文件，文件内容为broker的id
done
```

生成后新建文件 increase-replication-factor.json

```json
{"version":1,
"partitions":[
# 粘贴刚才生成的字符串，去掉最后逗号
]
}
```

执行命令

```sh
/data/kafka/bin/kafka-reassign-partitions.sh --zookeeper 192.168.100.31:2181 --reassignment-json-file increase-replication-factor.json --execute
```