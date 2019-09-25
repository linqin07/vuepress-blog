# JDK动态代理

#### 1.接口

```java
public interface UserInfo {
    public void queryUser();

    public void updateUser();
}
```

#### 2.接口实现

```java
public class UserImpl implements UserInfo {
    @Override
    public void queryUser() {
        System.out.println("查询用户");
    }

    @Override
    public void updateUser() {
        System.out.println("更新用户");
    }
}
```

#### 3.代理实现类

核心类，实现 JDK 代理类 `InvocationHandler`，在实现类中执行调用方法前后加上的逻辑操作。

```
public class UserHandler implements InvocationHandler {

    private UserInfo userImpl;

    public UserHandler(UserInfo userImpl) {
        this.userImpl = userImpl;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Object object = null;
        //方法开始前做一些事情
        System.out.println("动态代理执行方法前");
        if ("queryUser".equals(method.getName())) {
            //激活调用的方法
            object = method.invoke(userImpl, args);
        }
        //方法结束后做一些事情
        System.out.println("动态代理执行后");
        return object;
    }
}

```

#### 4.测试

动态代理也要注入对应的实现类。优点是多个实现的情况下无需重复写静态代理的重复类方法。

```java
public class Test {
    public static void main(String[] args) {
        UserImpl user = new UserImpl();
        UserHandler userHandler = new UserHandler(user);

        UserInfo userProxy = (UserInfo) Proxy.newProxyInstance(ClassLoader.getSystemClassLoader(),
                                                             new Class[]{UserInfo.class}, userHandler);
        userProxy.queryUser();
    }
}
```

输出：

```java
动态代理执行方法前
查询用户
动态代理执行后
```

### JDK动态代理的特性

JDK 动态代理不会代理嵌套的实现类，仅仅是相当于代码复制。类似 Spring 的事务传播等特性是无法进行代理的。而且一定要实现接口，在实际生产中的代码也是这个规范。

1. 接口同上，普通实现类进行嵌套

```java
public class UserImpl implements UserInfo {
    @Override
    public void queryUser() {
        System.out.println("查询用户");
        updateUser();
    }

    @Override
    public void updateUser() {
        System.out.println("更新用户");
    }
}
```

2. 代理类

```java
public class UserHandler implements InvocationHandler {

    private UserImpl userImpl;

    public UserHandler(UserImpl userImpl) {
        this.userImpl = userImpl;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("事务前");
        proxy = method.invoke(userImpl, args);
        System.out.println("事务后");
        return proxy;
    }
}

```

3. 测试类

```java
public class Test {
    /**
     * 当实现类里面有嵌套的代码时，嵌套的不会被代理，仅仅是相当代码复制。在spring事务的传播特性里面很容易掉坑。
     * @param args
     */
    public static void main(String[] args) {

        UserHandler userHandler = new UserHandler(new UserImpl());
        UserInfo userInfoProxy = (UserInfo) Proxy.newProxyInstance(ClassLoader.getSystemClassLoader(), new Class[]{UserInfo.class}, userHandler);
        userInfoProxy.queryUser();
    }
}
```

4. 运行结果：

```java
事务前
查询用户
更新用户
事务后
```

