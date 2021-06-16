### linux常用命令：

###### 远程下载文件：`wget`

```shell
wget [url] -P [下载目录]
```
###### curl

-L 重定向发送请求

-O 使用URL中默认的文件名保存文件到本地

-o 下载，需要指定下载文件名

-i  显示全部信息（头信息，返回内容）

-s 去掉所有状态信息的输出（如一些连接不上等额外信息）

-k 发送https请求的时候，不做认证
（当用https请求出错的时候，可以试下加-k）

-c：继续执行上次终端的任务(断点续传)

```shell
curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-6.6.2-linux-x86_64.tar.gz
```

```
curl -L -o xxx.tar.gz https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-6.6.2-linux-x86_64.tar.gz
```



###### post发送xml

```shell
curl -X POST -H 'Content-type:application/xml' -d @/tmp/data.xml https://apitest.mch.weixin.qq.com/sandboxnew/pay/getsignkey
```

-d :--data参数后面 @为路径
-X :指定什么类型请求get/post/put。。。
-H :--hearder增加头信息 

![xml信息](F:\hexo\vuepress\docs\.vuepress\picBak\1552463476139.png)

###### post发送json

```shell
curl -i -X POST -H 'Content-type':'application/json' -d '{json}' http://wx.sp-hicard.com/publicCount/menu/messageNotify
```

###### 两个主机传输文件(需要密码)scp

```shell
scp -P 22 -r tomcat7 root@192.168.1.110:/home
// 多个文件推出去
scp /localfold1/file1 /localfold2/file2  remoteuser@remotehost:/remotefold/ 
// 多个文件拉过来
scp remoteuser@remotehost:"/remotefold1/file1 /remotefold2/file2" /localfold/
```

两个机器都要支持scp命令
-P是 对面机器的ssh端口
-r是目录 
root对方用户@ip:/目录
其实不管文件或者目录加 -r 都可以

###### md5sum file1 [file2]

生成md5字符串，比较内容的

###### 查看负载

`w`、`uptime`、`top`

top -i 实时显示进程
top
    P：按%CPU使用率排行
　T：按时间+排行
　M：按%MEM排行

交互命令：

- s     改变两次刷新之间的延迟时间（单位为s）
- k     kill PID
- u     输入用户名

###### 查看机器几核

理论上认为 平均负载 除以 总核心数 <= 0.7 认为正常

```shell
cat /proc/cpuinfo |grep "cores"|uniq
// 查看CPU的总核心数
grep -c 'model name' /proc/cpuinfo 
```

###### 查看内存

free -m

free -g

ps -aux | sort -k4,4nr | head -5 倒排序使用内存数目

###### sort

sort -k 4 -r ：k指定那列 -r倒序

sort -k 1,1 -n :第一列开始到第一列结束，排序 -n 去重

###### 查看文件大小

> du -sh *



###### 同步系统时间

> yum install ntpdate
>
> ntpdate -u ntp.api.bz  上海时间
>
> 手动修改时间
>
> date -s "2007/04/14 13:58:00"