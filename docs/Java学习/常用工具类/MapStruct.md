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



#### 4.进阶用法

定义统一 Mapper 接口，交由 Spring 管理，统一转换。

- 定义 EntityMapper 泛型接口

  ```java
  public interface EntityMapper <D, E> {
  
      E toEntity(D dto);
  
      D toDto(E entity);
  
      List<E> toEntity(List<D> dtoList);
  
      List <D> toDto(List<E> entityList);
  }
  ```

  

- 定义需要转换的实体继承 EntityMapper 接口，指定 DTO 以及转换对象

  ```java
  @Mapper(componentModel = "spring", uses = {})
  public interface UserMapper extends EntityMapper<UserDTO, User> {
  
  }
  ```

  

- 测试

  ```java
  @RunWith(SpringRunner.class)
  @SpringBootTest
  public class SpringBootMybatisApplicationTests {
  
      @Autowired
      UserMapper userMapper;
  
      @Test
      public void contextLoads() {
          User user = new User(1, "12", "name");
          UserDTO convert = UserConvertMapper.INSTANCE.convert(user);
  
          System.out.println(convert);
      }
      /**
       * 测试泛型接口
       */
      @Test
      public void test2() {
          User user = new User(1, "12", "name");
          UserDTO userDTO = userMapper.toDto(user);
          System.out.println(userDTO);
      }
  }
  ```


> 这里注意两个问题：
>
> 1. 公共的EntityMapper  @Mapper 注解是mapstruct的，不能弄错，并且扫描包的时候要scanBasePackages 或者 ComponentScans 扫描到，不能喝 mybatis 的 mapperScan弄乱了
> 2. 编译会和 lombok 有冲突，可以参考[知乎方案](https://zhuanlan.zhihu.com/p/389315852)解决

