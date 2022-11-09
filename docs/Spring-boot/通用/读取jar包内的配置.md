#### 项目结构

![1554094154356.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1554094154356.png)

`ResourceUtils`读取的方式只能读到 jar 包的目录充当classpath。

```java
ResourceUtils.getURL("classpath").getPath()；
```

jar包放到`/data`目录下，对应的结果。上述方式只能适用于`tomcat`的项目。下面是上面代码打印的结果。
> /data/classpath

代码实现读取

```java
// 可以直接读取jar包内的文件。
ClassPathResource ss = new ClassPathResource("banner.txt");
//InputStream is = ss.getInputStream();
InputStream is = HelloWordController.class.getClassLoader().getResourceAsStream("banner.txt");
```



#### 直接读取 springboot 下面的 classpath 配置文件

```json
// 读取默认一个开始节点的配置，默认压缩为一行的json
ClassPathResource resource = new ClassPathResource("entryNode.json");
BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(resource.getInputStream()));
String json = bufferedReader.readLine();
```

也可以这样在spring内使用，使用注解引入 Resource

```java
    @Value("classpath:weather/aaa.json")
    private Resource aaa;
```

直接获取流使用 JSON 进行转换

```java
JSON.parseObject(resource.getInputStream(), StandardCharsets.UTF_8, EcologyResultWrapper.class);
```
或者读取为 String
```java
    public static String asString(Resource resource) {
        try (Reader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
            return FileCopyUtils.copyToString(reader);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
```

