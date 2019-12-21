## Spring Boot 中使用 AOP 统一处理 Web 请求日志

AOP：面向切面编程，通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术。AOP是Spring框架中的一个重要内容，它通过对既有程序定义一个切入点，然后在其前后切入不同的执行内容，比如常见的有：打开数据库连接/关闭数据库连接、打开事务/关闭事务、记录日志等。基于AOP不会破坏原来程序逻辑，因此它可以很好的对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

### 准备工作

------

###### 1.依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

###### 2.新增一个控制器请求

```java
@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String hello() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "hello world";
    }
}
```

睡眠等待可以更明显看到结果。

启动类不用增加`@EnableAspectJAutoProxy`，AOP的默认配置属性，其中`spring.aop.auto`属性默认是开启的。

###### 3.实现Web层的日志切面

实现AOP的切面主要有以下几个要素：

- 使用`@Aspect`注解将一个java类定义为切面类
- 使用`@Pointcut`定义一个切入点，可以是一个规则表达式，比如下例中某个package下的所有函数，也可以是一个注解等。
- 根据需要在切入点不同位置的切入内容
  - 使用`@Before`在切入点开始处切入内容
  - 使用`@After`在切入点结尾处切入内容
  - 使用`@AfterReturning`在切入点return内容之后切入内容（可以用来对处理返回值做一些加工处理）
  - 使用`@Around`在切入点前后切入内容，并自己控制何时执行切入点自身的内容
  - 使用`@AfterThrowing`用来处理当切入内容部分抛出异常之后的处理逻辑

```java
@Aspect
@Component
public class WebLogAspect {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    ThreadLocal<Long> startTime = new ThreadLocal<>();
    @Pointcut("execution(public * com.controller.*.*(..))")
    public void webLog(){
    }

    @Order(2)
    @Before("webLog()")
    public void doBefore(JoinPoint joinPoint) throws Throwable {
        // 接收到请求，记录请求内容
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        // 记录下请求内容
        logger.info("URL : " + request.getRequestURL().toString());
        logger.info("HTTP_METHOD : " + request.getMethod());
        logger.info("IP : " + request.getRemoteAddr());
        logger.info("CLASS_METHOD : " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());
        logger.info("ARGS : " + Arrays.toString(joinPoint.getArgs()));
        startTime.set(System.currentTimeMillis());
    }

    @AfterReturning(returning = "ret", pointcut = "webLog()")
    public void doAfterReturning(Object ret) throws Throwable {
        // 处理完请求，返回内容
        logger.info("RESPONSE : " + ret);
        logger.info("处理时间：" + (System.currentTimeMillis() - startTime.get())/1000);
    }
}
```

可以用`order`注解排顺序。

- 在切入点前的操作，按order的值由`小到大`执行
- 在切入点后的操作，按order的值由大到小执行

由于多个请求存在并发问题。需要把时间设置为`ThreadLocal`，避免并发时间参数多线程冲突。



## 切入点指示符

参考：https://blog.csdn.net/qq_23167527/article/details/78623639

@target(com.service.interface)
表示实现了括号里面的接口或者是继承了对应的类都会被匹配的到

@annotation(com.xxx.RequestMapper)
表示匹配@RequestMapper这个注解

execution(public * com.controller.*.*(..))
匹配路径

within：使用“within(类型表达式)”匹配指定类型内的方法执行



1) JoinPoint：提供访问当前被通知方法的目标对象、代理对象、方法参数等数据

```java
public interface JoinPoint {  
    String toString();         //连接点所在位置的相关信息  
    String toShortString();     //连接点所在位置的简短相关信息  
    String toLongString();     //连接点所在位置的全部相关信息  
    Object getThis();         //返回AOP代理对象  
    Object getTarget();       //返回目标对象  
    Object[] getArgs();       //返回被通知方法参数列表  
    Signature getSignature();  //返回当前连接点签名  
    SourceLocation getSourceLocation();//返回连接点方法所在类文件中的位置  
    String getKind();        //连接点类型  
    StaticPart getStaticPart(); //返回连接点静态部分  
}
```

2.获取目标对象(cast Object)

```java
RequestHandle handle = (RequestHandle)joinPoint.getTarget();
```

3.获取注解

```java
// 获取注解
AccessLimit annotation = ((MethodSignature) joinPoint.getSignature()).getMethod().getAnnotation(AccessLimit.class);
```