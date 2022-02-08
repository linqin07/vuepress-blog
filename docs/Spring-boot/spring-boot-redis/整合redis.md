## 整合reids

### 整合单节点redis

SpringBoot2.0整合Redis 是很容易的，官方依赖里面都有了。

1. pom.xml

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-redis</artifactId>
   </dependency>
   ```

2. springboot2.0的redis整合包多出**lettuce**连接池，需要**commons-pool2**，所以项目pom依赖要添加commons-pool2

   ```xml
   <!-- 高版本redis的lettuce需要commons-pool2 -->
   <dependency>
       <groupId>org.apache.commons</groupId>
       <artifactId>commons-pool2</artifactId>
       <version>2.6.0</version>
   </dependency>
   ```

3. appLication.yml

   ```yaml
   spring:
       redis:
         host: 127.0.0.1 
         port: 6379
         password: 123456
         jedis:
           pool:
             max-active: 8
             max-wait: -1
             max-idle: 500
             min-idle: 0
         lettuce:
           shutdown-timeout: 0
   ```

4. 使用

   ```java
   @RunWith(SpringRunner.class)
   @SpringBootTest
   public class Test_1{
       @Autowired
       private RedisTemplate<String,String>redisTemplate;
   
       @Test
       public void set(){
           redisTemplate.opsForValue().set("myKey","myValue");
           System.out.println(redisTemplate.opsForValue().get("myKey"));
       }
   }
   ```

5. 原因是内置的自动配置里面已经有了配置类可以开箱就用。
![image-20220201144143566](https://gitee.com/linqin07/pic-bed/raw/master/image-20220201144143566.png)



### 整合支持redis集群

1. pom如上

2. application配置

   ```yaml
   spring:
   redis:
     cluster:
       nodes: 192.168.33.60:7000,192.168.33.60:7001
     password: shsnc123456
   ```

3. 新增配置类 RedisConfig

   ```java
   @Configuration
   @ConditionalOnClass({RedisOperations.class})
   @EnableConfigurationProperties({RedisProperties.class})
   public class RedisConfig {
       Logger logger = LoggerFactory.getLogger(this.getClass());
   
       /**
        * 集群配置
        *
        * @param redisProperties
        * @return
        */
       @Bean
       @ConditionalOnProperty(
               prefix = "spring.redis.cluster",
               name = {"nodes"}
       )
       public LettuceConnectionFactory redisConnectionFactory(RedisProperties redisProperties) {
           logger.info("初始化redis集群: {}", redisProperties.getHost());
           RedisClusterConfiguration redisClusterConfiguration = new RedisClusterConfiguration(redisProperties.getCluster().getNodes());
           if (redisProperties.getPassword() != null) {
               redisClusterConfiguration.setPassword(RedisPassword.of(redisProperties.getPassword()));
           }
           // https://github.com/lettuce-io/lettuce-core/wiki/Redis-Cluster#user-content-refreshing-the-cluster-topology-view
           ClusterTopologyRefreshOptions clusterTopologyRefreshOptions = ClusterTopologyRefreshOptions.builder()
                   .enablePeriodicRefresh()
                   .enableAllAdaptiveRefreshTriggers()
                   .refreshPeriod(Duration.ofMinutes(2))
                   .build();
   
           ClusterClientOptions clusterClientOptions = ClusterClientOptions.builder()
                   .autoReconnect(true)
                   .pingBeforeActivateConnection(true)
                   .topologyRefreshOptions(clusterTopologyRefreshOptions).build();
   
           LettucePoolingClientConfiguration.LettucePoolingClientConfigurationBuilder
                   builder = LettucePoolingClientConfiguration.builder()
                   .commandTimeout(Duration.ofSeconds(5))
                   //.readFrom(ReadFrom.REPLICA_PREFERRED) //设置了会导致分布式锁操作从节点报错
                   .clientOptions(clusterClientOptions);
   
           //连接池配置
          RedisProperties.Pool pool = redisProperties.getLettuce().getPool();
          if (pool != null) {
              GenericObjectPoolConfig genericObjectPoolConfig = new GenericObjectPoolConfig();
              genericObjectPoolConfig.setMaxIdle(pool.getMaxIdle());
              genericObjectPoolConfig.setMinIdle(pool.getMinIdle());
              genericObjectPoolConfig.setMaxTotal(pool.getMaxActive());
              genericObjectPoolConfig.setMaxWaitMillis(pool.getMaxWait().toMillis());
              builder.poolConfig(genericObjectPoolConfig);
          }
   
           // https://github.com/lettuce-io/lettuce-core/wiki/ReadFrom-Settings
           LettuceClientConfiguration lettuceClientConfiguration = builder.build();
           return new LettuceConnectionFactory(redisClusterConfiguration, lettuceClientConfiguration);
       }
   
   
       @Bean(name = "jsonRedisTemplate")
       public <T> JsonRedisTemplate<T> jsonRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
           JsonRedisTemplate<T> redisTemplate = new JsonRedisTemplate<>();
           redisTemplate.setConnectionFactory(redisConnectionFactory);
           return redisTemplate;
       }
   }
   
   ```

4. 使用和单机的直接注入使用即可

5. 增加常用的 json 序列化的方式，方便直接插入json对象。

   - 新增 JsonRedisTemplate 类

     ```java
     public class JsonRedisTemplate<T> extends RedisTemplate<String, T> {
         public JsonRedisTemplate() {
             StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
     
             Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
             setKeySerializer(stringRedisSerializer);
             setValueSerializer(jackson2JsonRedisSerializer);
             setHashKeySerializer(stringRedisSerializer);
             setHashValueSerializer(jackson2JsonRedisSerializer);
         }
     
         public JsonRedisTemplate(RedisConnectionFactory connectionFactory) {
             this();
             setConnectionFactory(connectionFactory);
             afterPropertiesSet();
         }
     
     //    @Override
     //    protected RedisConnection preProcessConnection(RedisConnection connection, boolean existingConnection) {
     //        return super.preProcessConnection(connection, existingConnection);
     //    }
     }
     ```

   - 注入bean

     ```java
         @Bean(name = "jsonRedisTemplate")
         public <T> JsonRedisTemplate<T> jsonRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
             JsonRedisTemplate<T> redisTemplate = new JsonRedisTemplate<>();
             redisTemplate.setConnectionFactory(redisConnectionFactory);
             return redisTemplate;
         }
     ```

   - 新增 RedisCache 类

     ```java
     public class RedisCache<K, V> {
     
         private JsonRedisTemplate jsonRedisTemplate;
     
         public RedisCache(Builder builder) {
             this.jsonRedisTemplate = builder.jsonRedisTemplate;
         }
     
         public static Builder builder() {
             return new Builder();
         }
     
         public boolean put(K key, V value) {
             jsonRedisTemplate.opsForValue().set(key, value);
             return true;
         }
     
         public boolean put(K key, V value, int ttl, TimeUnit timeUtil) {
             jsonRedisTemplate.opsForValue().set(key, value, ttl, timeUtil);
             return true;
         }
         public V getIfPresent(K key) {
             V v = (V) jsonRedisTemplate.opsForValue().get(key);
             return v;
         }
     
         public boolean invalidate(K key) {
             Boolean delete = jsonRedisTemplate.delete(key);
             return delete;
         }
     
     
         public static class Builder {
             private JsonRedisTemplate jsonRedisTemplate;
     
     
             public Builder setJsonRedisTemplate(JsonRedisTemplate jsonRedisTemplate) {
                 this.jsonRedisTemplate = jsonRedisTemplate;
                 return this;
             }
     
             public RedisCache build() {
                 return new RedisCache(this);
             }
         }
     
     }
     ```

   - 使用注意初始化，注入静态变量的方式，以及使用初始化方法 @PostConstruct，支持插入各种数据结构。

     > 构造方法的执行顺序: 静态代码块>代码块>构造方法

     ```java
     @RestController
     public class RedisController {
         private static JsonRedisTemplate jsonRedisTemplate;
         static RedisCache<String, LinkModel> redisCache;
         static RedisCache<String, List<LinkModel>> redisCache1;
         static RedisCache<String, Map<String, Object>> mapRedisCache;
     
         @Autowired
         public void getJsonRedisTemplate(JsonRedisTemplate jsonRedisTemplate) {
             RedisController.jsonRedisTemplate = jsonRedisTemplate;
         }
     
         @PostConstruct
         public void init() {
             redisCache = RedisCache.newBuilder().setJsonRedisTemplate(jsonRedisTemplate).build();
             redisCache1 = RedisCache.newBuilder().setJsonRedisTemplate(jsonRedisTemplate).build();
             mapRedisCache = RedisCache.newBuilder().setJsonRedisTemplate(jsonRedisTemplate).build();
     
         }
     
         @RequestMapping("/testRedis")
         public String testRedis() {
             redisCache.put("key", new LinkModel());
             return "";
         }
     }
     ```
