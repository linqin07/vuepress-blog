### **阿尔萨斯**

[github](https://github.com/alibaba/arthas)

### 查找类和方法

```sh
sc *ServiceInstallService
// 子方法
sm com.base.service.serviceinstall.ServiceInstallService saveAndSend*
```

```sh
[arthas@19572]$ sc *ServiceInstallService
com.base.service.serviceinstall.ServiceInstallService
com.base.service.serviceinstall.ServiceInstallService$$EnhancerBySpringCGLIB$$8de8d2d6
Affect(row-cnt:2) cost in 158 ms.
[arthas@19572]$ sm com.base.service.serviceinstall.ServiceInstallService saveAndSend*
com.base.service.serviceinstall.ServiceInstallService saveAndSendConfig(Ljava/util/Map;Ljava/util/ArrayList;I)V
Affect(row-cnt:1) cost in 27 ms.
[arthas@19572]$ watch com.base.service.serviceinstall.ServiceInstallService saveAndSendConfig "{params}" -x 3
```

### 观察方法出参和返回值

```shell
$ watch demo.MathGame primeFactors "{params,returnObj}" -x 3
Press Ctrl+C to abort.
Affect(class-cnt:1 , method-cnt:1) cost in 44 ms.
ts=2018-12-03 19:16:51; [cost=1.280502ms] result=@ArrayList[
    @Object[][
        @Integer[535629513],
    ],
    @ArrayList[
        @Integer[3],
        @Integer[19],
        @Integer[191],
        @Integer[49199],
    ],
]
```

### 调整`-x`的值，观察具体的方法参数值

```
$ watch demo.MathGame primeFactors "{params,target}" -x 3
```

- `-x`表示遍历深度，可以调整来打印具体的参数和结果内容，默认值是1。

### 观察异常信息的例子

```shell
$ watch demo.MathGame primeFactors "{params[0],throwExp}" -e -x 2
Press Ctrl+C to abort.
Affect(class-cnt:1 , method-cnt:1) cost in 62 ms.
ts=2018-12-03 19:38:00; [cost=1.414993ms] result=@ArrayList[
    @Integer[-1120397038],
    java.lang.IllegalArgumentException: number is: -1120397038, need >= 2
    at demo.MathGame.primeFactors(MathGame.java:46)
    at demo.MathGame.run(MathGame.java:24)
    at demo.MathGame.main(MathGame.java:16)
,
]
```

- `-e`表示抛出异常时才触发
- express中，表示异常信息的变量是`throwExp`



### 查询服务调用耗时 trace

trace com.syncore.nebula.service.chatflowbackend.service.chatflow.impl.ChatflowServiceImpl nluToNluEntry  -n 5 --skipJDKMethod false 

- --skipJDKMethod false  跳过 JDK 方法，默认 true 跳过
- -n 表示处理多少次请求

触发方法执行，可通过swagger或postman等工具触发方法，即可显示整条链路具体执行时间，最耗时代码会标记**红色**

```sh
$ trace --skipJDKMethod false demo.MathGame run
Press Q or Ctrl+C to abort.
Affect(class-cnt:1 , method-cnt:1) cost in 60 ms.
`---ts=2019-12-04 00:44:41;thread_name=main;id=1;is_daemon=false;priority=5;TCCL=sun.misc.Launcher$AppClassLoader@3d4eac69
    `---[1.357742ms] demo.MathGame:run()
        +---[0.028624ms] java.util.Random:nextInt() #23
        +---[0.045534ms] demo.MathGame:primeFactors() #24 [throws Exception]
        +---[0.005372ms] java.lang.StringBuilder:<init>() #28
        +---[0.012257ms] java.lang.Integer:valueOf() #28
        +---[0.234537ms] java.lang.String:format() #28
        +---[min=0.004539ms,max=0.005778ms,total=0.010317ms,count=2] java.lang.StringBuilder:append() #28
        +---[0.013777ms] java.lang.Exception:getMessage() #28
        +---[0.004935ms] java.lang.StringBuilder:toString() #28
        `---[0.06941ms] java.io.PrintStream:println() #28

`---ts=2019-12-04 00:44:42;thread_name=main;id=1;is_daemon=false;priority=5;TCCL=sun.misc.Launcher$AppClassLoader@3d4eac69
    `---[3.030432ms] demo.MathGame:run()
        +---[0.010473ms] java.util.Random:nextInt() #23
        +---[0.023715ms] demo.MathGame:primeFactors() #24 [throws Exception]
        +---[0.005198ms] java.lang.StringBuilder:<init>() #28
        +---[0.006405ms] java.lang.Integer:valueOf() #28
        +---[0.178583ms] java.lang.String:format() #28
        +---[min=0.011636ms,max=0.838077ms,total=0.849713ms,count=2] java.lang.StringBuilder:append() #28
        +---[0.008747ms] java.lang.Exception:getMessage() #28
        +---[0.019768ms] java.lang.StringBuilder:toString() #28
        `---[0.076457ms] java.io.PrintStream:println() #28

```

