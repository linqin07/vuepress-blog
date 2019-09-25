# CGLIB动态代理

#### 1.接口

```java
/**
 * Description:
 * author: LinQin
 * date: 2018/08/17
 * 这个实际没什么卵用，删除也可以运行。
 */
public interface UserInfo {
    public void queryUser();

    public void updateUser();
}
```

#### 2.实现

```java
public class UserInfoImpl {
    public void queryUser() {
        System.out.println("未实现接口的类queryUser");
        updateUser();
    }

    public void updateUser() {
        System.out.println("未实现接口的类updateUser");
    }
}

```

#### 3.代理类

```java
public class UserCglibProxy implements MethodInterceptor {

    private Object target;

    /**
     * 创建代理对象
     *
     * @param target
     * @return
     */
    public Object getInstance(Object target) {
        this.target = target;
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(this.target.getClass());
        //回调方法
        enhancer.setCallback(this);
        return enhancer.create();
    }

    public Object intercept(Object object, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        System.out.println("aop前");
        methodProxy.invokeSuper(object, args);
        System.out.println("aop后");
        return null;
    }
}
```

#### 4.测试

```java
public class Test {
    public static void main(String[] args) {
        UserCglibProxy  cglibProxy = new UserCglibProxy();
        UserInfoImpl instance = (UserInfoImpl) cglibProxy.getInstance(new UserInfoImpl());
        instance.queryUser();
    }
}
```

