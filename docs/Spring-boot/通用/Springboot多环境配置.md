### SpringBoot多环境配置

在 Spring Boot 中多环境配置文件名需要满足 `application-{profile}.properties` 的格式，其中 `{profile}` 对应你的环境标识，

比如：

|          配置名称           | 对应环境 |
| :-------------------------: | :------: |
| application-dev.properties  | 开发环境 |
| application-test.properties | 测试环境 |
| application-prod.properties | 生产环境 |

至于哪个具体的配置文件会被加载，需要在 application.properties 文件中通过 `spring.profiles.active` 属性来设置，其值对应`{profile}`值。

如：*<u>spring.profiles.active=test</u>* 就会加载 <u>application-test.properties</u> 配置文件内容

##### 命令行操作：

- **运行class文件**

  -cp 是 -classpath 的简写

```sh
java -cp gitbook.jar com.util.VuePressUtil F:\hexo\vuepress\docs
```

- **指定配置文件 profile 启动**

  顺序有影响

```sh
java -jar -Dspring.profiles.active=test demo-0.0.1-SNAPSHOT.jar
```

-D 参数注入配置到服务，可以在服务中直接获取，也可以再次重命名获取，如下：

使用命令 `-DSW_NAMESPACE=xxx`注入，等价于 `-Delasticsearch.nameSpace=xxx`

```yaml
elasticsearch:
  nameSpace: ${SW_NAMESPACE:"datacenter"}
  clusterNodes: ${SW_STORAGE_ES_CLUSTER_NODES:172.16.6.105:9200}
```

