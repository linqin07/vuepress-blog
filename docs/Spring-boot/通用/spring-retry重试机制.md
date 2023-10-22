## **重试机制**

### spring-retry

#### 依赖



```xml
        <!-- spring retry-->
        <dependency>
            <groupId>org.springframework.retry</groupId>
            <artifactId>spring-retry</artifactId>
            <version>1.2.2.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.9.1</version>
        </dependency>
```



启动类加上注解  [@EnableRetry ]() 



###### [@EnableRetry ]() 



- 此注解用于开启重试框架，可以修饰在SpringBoot启动类上面，也可以修饰在需要重试的类上
- proxyTargetClass：Boolean类型，用于指明代理方式【true：cglib代理，false：jdk动态代理】默认使用jdk动态代理



#### 具体方法



```java
@Slf4j
@Service
public class Demo {

    @Retryable(maxAttempts = 2, backoff = @Backoff(value = 1000L))
    public boolean doingSomeThing() {
        int i = RandomUtils.nextInt(0, 2);
        log.info("随机数是: {}", i);
        int i1 = i / 0;
        return true;
    }

    @Recover
    public boolean doingSomeThing(RuntimeException e) {
        log.info("达到最大重试次数,或抛出了一个没有指定进行重试的异常:", e);
        return false;
    }
}
```



###### [@Recover ]() 



- 当重试次数耗尽依然出现异常时，执行此异常对应的@Recover方法。
- 异常类型需要与Recover方法参数类型保持一致。
- recover方法返回值需要与重试方法返回值保证一致。



###### @Retryable注解



被注解的方法发生异常时会重试



- value：Class[]类型，指定发生的异常进行重试
- include：Class[]类型，和value一样，默认空，当exclude也为空时，所有异常都重试
- exclude：Class[]类型，指定异常不重试，默认空，当include也为空时，所有异常都重试
- maxAttemps：int类型，重试次数，默认3
- backoff：Backoff类型，重试补偿机制，默认没有



#### 测试类



```java
@Slf4j
@SpringBootTest
class CanalApplicationTests {
    @Autowired
    private Demo demo;

    @Test
    void contextLoads() {
        System.out.println("--------------");
        boolean abc = demo.doingSomeThing();
        log.info("--结果是:{}--",abc);
    }
}
```



结果：重试了两次，并调用 recover 里面的方法。



![img](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20231008154254913.png)



如果抛出的错误不是 value 或者 include 指定的异常类型，不会重试。



### Guava-Retry



#### 依赖



```xml
<dependency>
  <groupId>com.google.guava</groupId>
  <artifactId>guava</artifactId>
  <version>27.0.1-jre</version>
</dependency>
<dependency>
  <groupId>com.github.rholder</groupId>
  <artifactId>guava-retrying</artifactId>
  <version>2.0.0</version>
</dependency>
```



```java
public static void main(String[] args) throws ExecutionException, RetryException {
    // RetryerBuilder 构建重试实例 retryer,可以设置重试源且可以支持多个重试源，可以配置重试次数或重试超时时间，以及可以配置等待时间间隔
    Retryer<Boolean> retryer = RetryerBuilder.<Boolean> newBuilder()
    .retryIfExceptionOfType(RemoteAccessException.class)//设置异常重试源
    .retryIfResult(res-> res==false)  //设置根据结果重试
    .withWaitStrategy(WaitStrategies.fixedWait(3, TimeUnit.SECONDS)) //设置等待间隔时间
    .withStopStrategy(StopStrategies.stopAfterAttempt(3)) //设置最大重试次数
    .build();
    retryer.call(() -> retryTask("123"));
}



/**
     * 重试方法
     * @return
     */
public static boolean retryTask(String param) {
log.info("收到请求参数:{}", param);

int i = RandomUtils.nextInt(9);
log.info("随机生成的数:{}", i);
if (i < 2) {
    log.info("为0,抛出参数异常.");
    throw new IllegalArgumentException("参数异常");
} else if (i < 5) {
    log.info("为1,返回true.");
    return true;
} else if (i < 7) {
    log.info("为2,返回false.");
    return false;
} else {
    //为其他
    log.info("大于2,抛出自定义异常.");
    throw new RemoteAccessException("大于2,抛出自定义异常");
}
}
```



可以指定返回结果进行重试。