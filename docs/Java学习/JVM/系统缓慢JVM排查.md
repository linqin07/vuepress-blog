### **jstack 指令**

###### 1.线上linux性能排查

查内存

```shell
free -m
```

查负载 `M`按内存排序，`top` 然后`P`按使用率排序。或者

```
top -c
```

查磁盘

```shell
df -h
```

###### 2.得到负载最高的进程`PID`

使用命令查看子线程负载情况，查看进程数 `ps -eLf | grep PID | wc -l`

```shell
top -Hp PID
```

获取线程最高负载的线程`pid`，转化为16进制 xxxx，对应堆栈打印的应该就是`tid=0x00xx`

```shell
printf "%x\n" pid
00xx
```

###### 3.使用`jstack`查看堆栈信息

打印对应堆栈信息关键字后20行，`-l`表示打印额外的锁信息。

```shell
jstack -l pid | grep '00xx' -A 20 >> dump
```

###### 4.查看子线程数目

-`L`显示具体的子线程信息，配合`wc -l`命令查看子线程数目可以很直观的看到效果。一般暴增子线程数都是线上的批量操作操作资源没有关闭导致的。

```shell
ps -eLf|grep pid
```



### jmap 命令

```sh
[root@ivory-81 ivory]# jmap
Usage:
    jmap [option] <pid>
        (to connect to running process)
    jmap [option] <executable <core>
        (to connect to a core file)
    jmap [option] [server_id@]<remote server IP or hostname>
        (to connect to remote debug server)

where <option> is one of:
    <none>               to print same info as Solaris pmap
    -heap                to print java heap summary
    -histo[:live]        to print histogram of java object heap; if the "live"
                         suboption is specified, only count live objects
    -clstats             to print class loader statistics
    -finalizerinfo       to print information on objects awaiting finalization
    -dump:<dump-options> to dump java heap in hprof binary format
                         dump-options:
                           live         dump only live objects; if not specified,
                                        all objects in the heap are dumped.
                           format=b     binary format
                           file=<file>  dump heap to <file>
                         Example: jmap -dump:live,format=b,file=heap.bin <pid>
    -F                   force. Use with -dump:<dump-options> <pid> or -histo
                         to force a heap dump or histogram when <pid> does not
                         respond. The "live" suboption is not supported
                         in this mode.
    -h | -help           to print this help message
    -J<flag>             to pass <flag> directly to the runtime system
```

导出 dump 文件：

```sh
jmap -dump:live,file=dump.bin,format=b  9667
```

查看堆 heap 的情况

```sh
jmap -heap 9667
```

打印 jvm heap 的直方图。其输出信息包括类名，对象数量，对象占用大小。

```sh
[root@ivory-81 data2]# jmap -histo:live 9667 |head -n 10

 num     #instances         #bytes  class name
----------------------------------------------
   1:          8924      175292816  [B
   2:        144536       20573344  [C
   3:        420675       13461600  com.shsnc.elasticsearch.analyzer.cnsegmet.PreFixTree$TreeNode
   4:        420676        9094392  [Lcom.shsnc.elasticsearch.analyzer.cnsegmet.PreFixTree$TreeNode;
   5:         35315        5387808  [Ljava.lang.Object;
   6:         49435        4350280  java.lang.reflect.Method
   7:        110358        3531456  java.util.concurrent.ConcurrentHashMap$Node
```

