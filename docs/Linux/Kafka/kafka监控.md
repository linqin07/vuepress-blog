

#### 1.下载源码

kafka-manager[github地址](https://github.com/yahoo/kafka-manager/releases/tag/1.3.3.22)，找到对应的releases版本。

![1551164365553.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1551164365553.png)


```shell
weget https://github.com/yahoo/kafka-manager/archive/1.3.3.22.tar.gz
```

**解压**

```shell
tar -zxfv 1.3.3.18.tar.gz
```



#### 2.编译

```shell
./sbt clean dist
```

如果提示没有安装 sbt，安装一下。`yum install sbt` 再次编译。开启漫长等待。

编译好的文件`kafka-manager-1.3.3.22.zip`在生成在目录`target/universal`里。



#### 3.解压目标文件

修改一下 conf 的 zk 地址即可

```shell
Skafka-manager.zkhosts="127.0.0.1:2181"
```



#### 4.启动

后台启动命令

```shell
nohup bin/kafka-manager & 2>&1 
```

查看后台任务命令：

```shell
jobs
```

对应杀死

```shell
kill -9 %1	
```



页面访问默认9000端口 [http://193.112.10.38:9000/](http://193.112.10.38:9000/)

![1551168572056.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1551168572056.png)