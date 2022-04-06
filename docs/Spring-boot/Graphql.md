# GraphQL

GraphQL 是一个用于 API 的查询语言，是一个使用基于类型系统来执行查询的服务端运行时（类型系统由你的数据定义）。GraphQL 并没有和任何特定数据库或者存储引擎绑定，而是依靠你现有的代码和数据支撑。

简单理解，就是图表形式查询数据。



## Schema 和类型

schema 内有两个特殊类型，定义了每一个 GraphQL 查询的入口，都有一个 query 类型，可能有一个 mutation 类型变更

```json
schema {
    query: Query
    mutation: Mutation
}
```

query 查询，mutation 变更查询。在 graphql 实现中，查询是并行的，而变更是串行的。

- type  基本的组件是对象类型（对应java中的类）
- 标量类型（Int、Float、String、Boolean、ID）、枚举 enum
- 非空 `!`,支持表示字符串 `String!`,数组 `[list!]!`
- input 和 type 一样，只是作为对象输入时要这个类型。



内省，查询支持啥接口、参数、类型

```tex
# 查询schema里面的query、mutation
query __schema {
  __schema {
    queryType {
      kind
      name
      description
    }
    mutationType {
      kind
      name
      description
    }
  }
}

#查询变更查询
query __type1 {
  __type(name: "Mutation") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}
#查询查询类型或者具体对象类型的详细信息，如对象信息、返回信息
query __type2 {
  __type(name: "Query") {
    name
    fields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}
```



## GraphQL Spring Boot

- **graphql-spring-boot-starter**：使用[GraphQL Servlet](https://www.graphql-java-kickstart.com/servlet/getting-started/) 和[GraphQL Java 工具](https://www.graphql-java-kickstart.com/tools/)将您的 Spring Boot 应用程序转换为 GraphQL 服务器

- **graphiql-spring-boot-starter**：嵌入用于模式自省和查询调试的**GraphiQL**工具（参见[GraphiQL](https://github.com/graphql/graphiql)）

- **graphql-spring-boot-starter-test**：为您的项目添加测试功能，例如`@GraphQLTest`可与`@SpringBootTest`

**maven**
依赖

```xml
 <dependency>
            <groupId>com.graphql-java-kickstart</groupId>
            <artifactId>graphql-spring-boot-starter</artifactId>
            <version>${com.graphql-java-kickstart.version}</version>
        </dependency>

        <dependency>
            <groupId>com.graphql-java-kickstart</groupId>
            <artifactId>graphiql-spring-boot-starter</artifactId>
            <version>${com.graphql-java-kickstart.version}</version>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>com.graphql-java</groupId>
            <artifactId>graphql-java-extended-scalars</artifactId>
            <version>15.0.0</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
```

## Spring Boot 整合

### 简单参数使用参数变量

java 代码

```java
    public User user(String nickname, @NonNull Long id) {
        User user = new User("1", "test", "linqin@163.com");
        return user;
    }
```

schema

```json
type Query {
    user(nickname: String!, id: Int): User
}
type User {
    id: String!
    mail: String!
    nickname: String
}
```

graphql 查询

```json
query alias($id: Int=33445) {
  user (nickname: "ceshi", id: $id){
    id
    nickname
  }
}
  // 变量
{
    "id": 12    
}
```



### 封装数组对象作为参数变量

java 代码

```java
public List<User> users(ListCondition paramList) {
User user1 = new User("1", "test", "linqin@163.com");
ArrayList<User> userArrayList = Lists.newArrayList(user1);
Gson gson = new Gson();
return userArrayList;
}
```
schema 

```json
type Query {
users(paramList: ListCondition): [User]
}
input ListCondition {
userList: [UserCondition]
}

input UserCondition {
id: String!
mail: String!
nickname: String!
}

type User {
    id: String!
    mail: String!
    nickname: String!

}
```

graphql 查询

```json
query alias($paramList: ListCondition) {
users (paramList: $paramList){
id
}
}
  // 变量
  {
      "paramList": {
          "userList":
          [{
                  "id": "1",
                  "nickname": "test",
                  "mail": "linqin@163.com"
  
              }
          ]
      }
  
  }
  
```



### 数组对象作为参数变量


  ```java
    public List<User> userList(List<UserCondition> paramList) {
        User user1 = new User("1", "test", "linqin@163.com");
        ArrayList<User> userArrayList = Lists.newArrayList(user1);
        Gson gson = new Gson();
        return userArrayList;
    }
  ```
  schema 

  ```json
  type Query {
    userList(paramList: [UserCondition]): [User]
  }

  input UserCondition {
      id: String!
      mail: String!
      nickname: String!
  }

type User {
    id: String!
    mail: String!
    nickname: String!

}
  ```

  graphql 查询

  ```json
query alias($paramList: [UserCondition]) {
  userList (paramList: $paramList){
    id
  }
}
  // 变量
{
    "paramList": 
        [{
                "id": "1",
                "nickname": "test",
                "mail": "linqin@163.com"
            }
        ]
}
  
  ```

### 拆分为多个文件

- resources/graphql 目录新建一个新的文件 query.graphqls，通过继承来继承前面的 Query,公共的 TYPE 是否复制都可以。

  ```json
  extend type Query {
      users(paramList: ListCondition): [User]
  }
  
  input ListCondition {
      userList: [UserCondition]
  }
  
  ```

- 同时也 java 文件也新建一个实现 GraphQLQueryResolver。

  ```java
  @Component
  public class QueryResolver implements GraphQLQueryResolver {
  
      public List<User> users(ListCondition paramList) {
          User user1 = new User("1", "test", "linqin@163.com");
          ArrayList<User> userArrayList = Lists.newArrayList(user1);
          Gson gson = new Gson();
          return userArrayList;
      }
  }
  
  ```

- 目录结构

![image-20210701164845652.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20210701164845652.png)

### 自定义标量类型

在 GraphQL 中自带一些默认标量类型：

- `Int`：有符号 32 位整数
- `Float`：有符号双精度浮点值
- `String`：UTF‐8 字符序列
- `Boolean`：`true` 或者 `false`
- `ID`：ID 标量类型表示一个唯一标识符，通常用以重新获取对象或者作为缓存中的键。ID 类型使用和 String 一样的方式序列化

#### 使用 graphql-java-extended-scalars 库

在 Java 这个生态中，我们可以引入下面这个库来帮助我们很方便的进行扩展：

https://github.com/graphql-java/graphql-java-extended-scalars

```xml
  <dependency>
    <groupId>com.graphql-java</groupId>
    <artifactId>graphql-java-extended-scalars</artifactId>
    <version>15.0.0</version>
  </dependency>
```

#### 使用 GraphQLScalarType 自定义标量类型

```java
@Slf4j
@Configuration
public class CustomScalarTypeConfig {

    private static final String DATE_FORMAT_PATTERN_DEFAULT = "yyyy-MM-dd HH:mm:ss";

    @Bean
    public GraphQLScalarType graphQLLong() {
        return ExtendedScalars.GraphQLLong;
    }

    @Bean
    public GraphQLScalarType graphQLDate() {
        return GraphQLScalarType
                .newScalar()
                .name("Date")
                .description("Date 类型")
                .coercing(new Coercing<Date, String>() {
                    @Override
                    public String serialize(Object dataFetcherResult) throws CoercingSerializeException {
                        return new SimpleDateFormat(DATE_FORMAT_PATTERN_DEFAULT).format((Date) dataFetcherResult);
                    }
                    @Override
                    public Date parseValue(Object input) throws CoercingParseValueException {
                        if (input instanceof String) {
                            try {
                                return new SimpleDateFormat(DATE_FORMAT_PATTERN_DEFAULT).parse((String) input);
                            } catch (ParseException e) {
                                throw new CoercingParseValueException(e);
                            }
                        }
                        throw new CoercingParseValueException(
                                "Expected a 'String' but was '" + Kit.typeName(input) + "'."
                        );
                    }
                    @Override
                    public Date parseLiteral(Object input) throws CoercingParseLiteralException {
                        if (!(input instanceof StringValue)) {
                            throw new CoercingParseLiteralException(
                                    "Expected AST type 'StringValue' but was '" + typeName(input) + "'."
                            );
                        }
                        try {
                            return new SimpleDateFormat(DATE_FORMAT_PATTERN_DEFAULT).parse(((StringValue) input).getValue());
                        } catch (ParseException e) {
                            log.error("日期格式转化错误");
                            throw new CoercingParseValueException(e);
                        }
                    }
                })
                .build();
    }
}
```

graphqls 文件

```json
scalar Long
scalar Date
# 查询
#  schema 内有两个特殊类型，定义了每一个 GraphQL 查询的入口，都有一个 query 类型，可能有一个 mutation 类型
schema {
    query: Query
    mutation: Mutation
}

type Query {
    user(nickname: String!, id: Long, dateTime: Date): User
    userList(paramList: [UserCondition]): [User]
}

type User {
    id: String!
    mail: String!
    nickname: String!
    dateTime: Date
}

input UserCondition {
    id: String!
    mail: String!
    nickname: String!
}
```