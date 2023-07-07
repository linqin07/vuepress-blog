# SpringBoot 缓存之 @Cacheable 

### 一、简介

#### 1、缓存介绍

Spring 从 3.1 开始就引入了对 Cache 的支持。定义了 `org.springframework.cache.Cache` 和 `org.springframework.cache.CacheManager` 接口来统一不同的缓存技术。并支持使用 `JCache（JSR-107）`注解简化我们的开发。

其使用方法和原理都类似于 Spring 对事务管理的支持。Spring Cache 是作用在方法上的，其核心思想是，当我们在调用一个缓存方法时会把该方法参数和返回结果作为一个键值对存在缓存中。

使用场景：一些慢接口的优化查询：如数据库关联查询，或者非常复杂的业务处理流程，但最终结果很少变化。再如接口内有非实时需要的第三方接口请求等。



#### 2、Cache 和 CacheManager 接口说明



- Cache 接口包含缓存的各种操作集合，你操作缓存就是通过这个接口来操作的。
- Cache 接口下 Spring 提供了各种 xxxCache 的实现，比如：RedisCache、EhCache、ConcurrentMapCache
- CacheManager 定义了创建、配置、获取、管理和控制多个唯一命名的 Cache。这些 Cache 存在于 CacheManager 的上下文中。



**小结：**

每次调用需要缓存功能的方法时，Spring 会检查指定参数的指定目标方法是否已经被调用过，如果有就直接从缓存中获取方法调用后的结果，如果没有就调用方法并缓存结果后返回给用户。下次调用直接从缓存中获取。



### 二、@Cacheable 注解使用详细介绍

#### 1.开启缓存注解

`@EnableCaching`放到启动类或者配置类上面

#### 2.依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

#### 3.配置 RedisCacheConfig 类

> 序列化问题：
>
> springboot 的缓存使用 jackson 来做数据的序列化与反序列化，如果默认使用 Object 作为序列化与反序列化的类型，则其只能识别 java 基本类型，遇到复杂类型时，jackson 就会先序列化成 LinkedHashMap ，然后再尝试强转为所需类别，这样大部分情况下会强转失败。此时就需要指定序列化方式为:
> GenericJackson2JsonRedisSerializer，
> 指定后，在序列化时，会将类名存入到序列化后的 json 字符串中，如：
> {"@class": "com.example.SpecialClass", "id" : 1, .... }
> 这样在取出缓存时，springboot 就可以自动根据 @class 对应的字段找到对应的类进行反序列化了。
>
> 

```java
@Configuration
@EnableCaching
@Slf4j
public class RedisCacheConfig extends CachingConfigurerSupport {

    @Autowired
    private ObjectMapper objectMapper;

    /**
     *  自动生成key
     * @return
     */
    @Bean
    public KeyGenerator keyGenerator() {
        return (target, method, params) -> {
            StringBuilder sb = new StringBuilder();
            sb.append(target.getClass().getName());
            sb.append(method.getName());
            for (Object obj : params) {
                sb.append(obj.toString());
            }
            return sb.toString();
        };

    }

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
        //初始化一个RedisCacheWriter
        RedisCacheWriter redisCacheWriter = RedisCacheWriter.nonLockingRedisCacheWriter(redisConnectionFactory);

        // key的序列化采用StringRedisSerializer
        //Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        //jackson2JsonRedisSerializer.setObjectMapper(objectMapper);

        //初始化一个RedisCacheConfiguration
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig();
        // 默认使用的是jdk的序列化方式JdkSerializationRedisSerializer
        //redisCacheConfiguration = redisCacheConfiguration.serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer));
        // redisCacheConfiguration.disableKeyPrefix();
        redisCacheConfiguration = redisCacheConfiguration.prefixCacheNameWith(GlobalConstant.BUSINESS_REDIS_KEY_PREFIX);
        //返回一个自定义的CacheManager
        return new CustomRedisCacheManager(redisCacheWriter, redisCacheConfiguration);
    }
}
```

上面的 ObjectMapper 注入可以参考[jackson配置类](https://linqin.site/Spring-boot/spring-boot-json/2.%E5%A4%84%E7%90%86%E6%97%B6%E9%97%B4%E6%A0%BC%E5%BC%8FLocalDateTime.html)，类 JacksonConfig。同时需要注意配置 redis 前缀以及配置序列化的方式都是如 redisCacheConfiguration = redisCacheConfiguration.prefixCacheNameWith(GlobalConstant.BUSINESS_REDIS_KEY_PREFIX); 需要特别赋值使用。

自定义配置类 CustomRedisCacheManager，通过 value 跟 # 号区分主动设置过期时间

```java
/**
 * redis 自定义缓存，用于 @Cacheable(value = "product_aaa#60")
 * 自定义 #60 表示 60 minute
 */
public class CustomRedisCacheManager extends RedisCacheManager {

    public CustomRedisCacheManager(RedisCacheWriter cacheWriter, RedisCacheConfiguration defaultCacheConfiguration) {
        super(cacheWriter, defaultCacheConfiguration);
    }

    public CustomRedisCacheManager(RedisCacheWriter cacheWriter, RedisCacheConfiguration defaultCacheConfiguration, String... initialCacheNames) {
        super(cacheWriter, defaultCacheConfiguration, initialCacheNames);
    }

    public CustomRedisCacheManager(RedisCacheWriter cacheWriter, RedisCacheConfiguration defaultCacheConfiguration, boolean allowInFlightCacheCreation, String... initialCacheNames) {
        super(cacheWriter, defaultCacheConfiguration, allowInFlightCacheCreation, initialCacheNames);
    }

    public CustomRedisCacheManager(RedisCacheWriter cacheWriter, RedisCacheConfiguration defaultCacheConfiguration, Map<String, RedisCacheConfiguration> initialCacheConfigurations) {
        super(cacheWriter, defaultCacheConfiguration, initialCacheConfigurations);
    }

    public CustomRedisCacheManager(RedisCacheWriter cacheWriter, RedisCacheConfiguration defaultCacheConfiguration, Map<String, RedisCacheConfiguration> initialCacheConfigurations, boolean allowInFlightCacheCreation) {
        super(cacheWriter, defaultCacheConfiguration, initialCacheConfigurations, allowInFlightCacheCreation);
    }

    @Override
    protected RedisCache createRedisCache(String name, RedisCacheConfiguration cacheConfig) {
        Duration ttl = getTtlByName(name);
        if (ttl != null) {
            //证明在cacheName上使用了过期时间，需要修改配置中的ttl
            cacheConfig = cacheConfig.entryTtl(ttl);
        }
           //将name中的时间字符清除
        if(StringUtils.isNotEmpty(name) && name.contains(DEFAULT_PATH)){
            name = name.split(DEFAULT_PATH)[0];
        }
        //修改缓存key和value值的序列化方式
        return super.createRedisCache(name, cacheConfig);
    }

    /**
     * 缓存参数的分隔符
     * 数组元素0=缓存的名称
     * 数组元素1=缓存过期时间TTL
     */
    private static final String DEFAULT_PATH = "#";

    /**
     * 通过name获取过期时间
     * @param name
     * @return
     */
    private Duration getTtlByName(String name) {
        if (name == null) {
            return null;
        }
        //根据分隔符拆分字符串，并进行过期时间ttl的解析
        String[] cacheParams = name.split(DEFAULT_PATH);
        if (cacheParams.length > 1) {
            String ttl = cacheParams[1];
            if (!StringUtils.isEmpty(ttl)) {
                try {
                    return Duration.ofMinutes(Long.parseLong(ttl));
                } catch (Exception e) {
                }
            }
        }
        // 默认30秒
        return Duration.ofMinutes(5);
    }
}
```

#### 4.使用

在方法上面直接使用注解 @Cacheable，其中 value 会和 key 组成 redis 键 value::key, 如果需要前缀可以直接写上或者全局统一配置。其中 key 支持 EL 表达式，针对不同的接口场景进行缓存。

```java
    @Cacheable(value = "/test", key = "#condition.id")
```

还有其他两个常用属性 unless 和 condition

- 其中 condition 是对入参进行判断，符合条件的缓存，不符合的不缓存。
- 其中 unless 是对出参进行判断，符合条件的不缓存，不符合的缓存。

> 碰到的问题：
>
> 1.有时候需要使用组合key可以这样写 `@Cacheable(key = "#page+'-'+#pageSize")`
>
> 2.暂时发现方法里面嵌套子方法也使用缓存注解不生效，仅仅外层生效。解决办法如下
>
> ```java
> //启动类
> @EnableAspectJAutoProxy(proxyTargetClass = true, exposeProxy = true)
> // serviceImpl 请求方法不是直接调用使用代理进行调用，针对嵌套方法
> ((UserService) AopContext.currentProxy()).B();
> ```
> 3.移除变量使用注解 @CacheEvict(cacheNames = "yourName", allEntries = true)，allEntries 为真表示把 yourName 文件夹下面的都移除掉
>
> ps：需要注意 redis 服务器上面有没有禁用 keys * 这些命令，否则会报错 ERR unknown command keys redis

### 三、原理

1.自动配置类：CacheAutoConfiguration

![image-20221129202306458](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20221129202306458.png)



2.给容器中导入缓冲相关的组件

![image-20221129202409971](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20221129202409971.png)



3.使用redis缓存配置类

![image-20221129203141381](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20221129203141381.png)



4.具体缓存逻辑抽象类 AbstractCacheManager

![image-20221129203409088](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20221129203409088.png)



总结

| 序列化方式                         | 速度 | 存储大小 | 备注                                                         |
| ---------------------------------- | ---- | -------- | ------------------------------------------------------------ |
| JdkSerializationRedisSerializer    | 中   | 最小     | 无需考虑复杂类型、嵌套类型的序列化反序列化，以字节方式存储，所有序列化的类需要实现`Serializable`接口 |
| Jackson2JsonRedisSerializer        | 优   | 较大     | 无法针对复杂类型反序列化，能存入不可以去取出                 |
| GenericJackson2JsonRedisSerializer | 良   | 较大     | 存入带上@class信息，但是需要考虑如DataTIme，Instant这些不同的序列化方式。 |

参考资料：

https://blog.csdn.net/baidu_39343397/article/details/112488246

https://blog.csdn.net/qq_29066329/article/details/89081671

https://blog.csdn.net/Julyraining/article/details/108408639

