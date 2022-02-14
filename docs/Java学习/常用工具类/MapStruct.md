### 使用 MapStruct 转换 DTO

#### 1.依赖

```xml
       <mapstruct.version>1.3.1.Final</mapstruct.version>
        
        <!-- 引入 mapstruct 依赖 -->
        <dependency>
            <groupId>org.mapstruct</groupId>
            <artifactId>mapstruct</artifactId>
            <version>${mapstruct.version}</version>
        </dependency>
```

#### 2.新建接口类 UserConvert

```java
@Mapper(uses = JacksonUtil.class)
public interface UserConvert {

    UserConvert INSTANCE = Mappers.getMapper(UserConvert.class);

    @Mappings({
                    // 转化的名称如果一样，写不写都一样
//            @Mapping(source = "userId", target = "userId"),
            @Mapping(source = "userAge", target = "userAge", ignore = true),
            @Mapping(source = "userName", target = "userName", qualifiedByName = "toJsonString"),
    })
    UserDTO convert(User user);

}

```

需要注意 import org.mapstruct.Mapper; 其中 uses 指定的类是下面 qualifiedByName 调用里面的 toJsonString 方法，自定义指定序列化方式。

##### User:

```java
public class User {
    private Integer userId;

    private String userAge;

    private String userName;

    // runtime
    private int age;


    public User(Integer userId, String userAge, String userName) {
        this.userId = userId;
        this.userAge = userAge;
        this.userName = userName;
    }
```

UserDTO:

```java
@Data
public class UserDTO {
    private Integer userId;

    private String userAge;

    private String userName;

    // runtime
    private int age;
}
```



#### 3.测试

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringBootMybatisApplicationTests {

    @Test
    public void contextLoads() {
        User user = new User(1, "12", "name");
        UserDTO convert = UserConvert.INSTANCE.convert(user);
        System.out.println(convert);
    }

}
```

