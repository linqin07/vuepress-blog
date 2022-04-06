### SpringBean的生命周期

![1587807340663.png](https://gitee.com/linqin07/pic/raw/master/1587807340663.png)

> 1.  Spring对Bean进行实例化（相当于程序中的new Xx())
> 2. 设置对象属性（IOC 依赖注入）
> 3. 如果这个 Bean 实现了 **BeanNameAware** 接口，会调用它实现的 setBeanName(String beanId) 方法，此处传递的是 Spring 配置文件中 Bean 的 ID
> 4. 如果这个 Bean 实现了 **BeanFactoryAware** 接口，会调用它实现的 setBeanFactory()，传递的是Spring工厂本身（可以用这个方法获取到其他 Bean）
> 5. 如果这个 Bean 实现了 **ApplicationContextAware** 接口，会调用setApplicationContext(ApplicationContext) 方法，传入 Spring 上下文
> 6. 如果Bean实现了BeanPostProcess接口，Spring将调用它们的postProcessBeforeInitialization 前置
> 7. 如果Bean实现了InitializingBean接口，Spring将调用它们的afterPropertiesSet方法
> 8. 如果Bean实现了BeanPostProcess接口，Spring将调用它们的 postProcessBeforeInitialization 后置
> 9. 具体业务调用
> 10. 生命周期结束，调用 destroy 方法。



Spring Bean 生命周期比较复杂，可以分为创建和销毁两个过程。其中，注解`@Bean`加载的自定义 bean 也会实现BeanPostProcessor 的前后置方法。

- 实现`InitializingBean`接口会在初始化时执行一次。
- 实现`BeanFactoryPostProcessor`接口会在初始化后执行一次。
- 实现`BeanPostProcessor`接口会在初始化每个接口时`各`执行一次对应实现的前后置方法。
- 实现`DisposableBean`接口会在容器关闭时执行一次销毁方法。

```java
@Component
public class MyBean implements InitializingBean, BeanPostProcessor, BeanFactoryPostProcessor, DisposableBean {
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("InitializingBean初始化Bean时执行一次");
    }
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("bean初始化前执行");
        return null;
    }
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("bean初始化后执行");
        return null;
    }
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory configurableListableBeanFactory) throws BeansException {
        System.out.println("bean初始化后执行一次");
    }
    @Override
    public void destroy() throws Exception {
        System.out.println("销毁");
    }
}
```

启动打印(顺序)：

> InitializingBean初始化Bean时执行一次
> bean初始化后执行一次
> bean初始化前执行
> bean初始化后执行
> bean
> bean初始化前执行
> bean初始化后执行
>
> ...
>
> 销毁

**销毁**

销毁需要在应用中需要关闭上下文才可以触发。`System.in.read()`模拟应用不退出的情况。

```java
@Test
public void test1() throws IOException {
    ConfigurableApplicationContext context = (ConfigurableApplicationContext) this.applicationContext;
    context.close();
    System.in.read();
}
```



### Spring Bean 有五个作用域

- `Singleton`，这是 Spring 的默认作用域，也就是为每个 IOC 容器创建唯一的一个 Bean 实
  例。controller 默认 `@Scope(“Singleton”)`，不要使用非静态的成员变量，否则会发生数据逻辑混乱。正因为单例所以不是线程安全的。

- `Prototype`，针对每个 getBean 请求，容器都会单独创建一个 Bean 实例。

  从 Bean 的特点来看，Prototype 适合有状态的 Bean，而 Singleton 则更适合无状态的情况。
  另外，使用 Prototype 作用域需要经过仔细思考，毕竟频繁创建和销毁 Bean 是有明显开销
  的。

  `IOC在初始化时，只会将scope= singleton（单例）的对象进行实例化，而不会去实例化 scope=prototype 的对象（多例）。`

  如果是 Web 容器，则支持另外三种作用域：
  
  - Request，为每个 HTTP 请求创建单独的 Bean 实例。
  - Session，很显然 Bean 实例的作用域是 Session 范围。
  - GlobalSession，用于 Portlet 容器，因为每个 Portlet 有单独的 Session，GlobalSession
    提供一个全局性的 HTTP Session。

### 循环依赖

#### 构造器循环依赖

这个Spring解决不了

#### setter方式原型

Spring的单例对象的初始化主要分为三步：

1. createBeanInstance：`实例化`，其实也就是调用对象的`构造方法`实例化对象
2. populateBean：`填充属性`，这一步主要是多 bean 的依赖属性进行填充
3. initializeBean：`调用 spring xml 中的 init` 方法。

spring内部有三级缓存：

- singletonObjects 一级缓存，用于保存实例化、注入、初始化完成的bean实例
- earlySingletonObjects 二级缓存，用于保存实例化完成的bean实例，但是还没有填充属性
- singletonFactories 三级缓存，用于保存bean创建工厂，以便于后面扩展有机会创建`代理对象`，提前暴露的bean

![image-20220318004710462](https://gitee.com/linqin07/pic/raw/master/image-20220318004710462.png)



```java
@Service
public class TestService1 {

    @Autowired
    private TestService2 testService2;

    public void test1() {
    }
}

@Service
public class TestService2 {

    @Autowired
    private TestService1 testService1;

    public void test2() {
    }
}
```

TestService1 注入的时候，从一级缓存里面获取不到实例，然后创建实例，并且提前暴露添加到三级缓存中，

其中依赖 TestService2，去一级缓存中获取实例，发现也是没有，就主动创建实例，同时`提前暴露加入三级缓存`中。

然后发现其依赖 TestService1 ，从三级缓冲中获取到，TestService1 `升级添加到二级缓存中`。TestService2 就注入成功了，TestService2 就添加到一级缓存中。

然后TestService1 获得 TestService2 也可以初始化成功，TestService1 添加到一级缓存。



为啥不用二级缓存：

使用了切面编程中的 AOP 会注入代理对象到三级缓存当中，如果没有二级缓存，会又直接 singletonFactory.getObject() 获取一个新的对象，而不是原来的代理对象。最终注入的应该是这个代理对象才对。



### 注入 List 集合

可以直接使用注入集合的操作，Order 进行控制顺序，使用其简单实现调用链

```java
// 接口
public interface BeanInterface {
```

```java
//实现类1
@Order(1)
@Component
public class BeanImplTwo implements BeanInterface {

```

```java
//实现类2
@Order(2)
@Component
public class BeanImplOne implements BeanInterface {

```

```java
@Component
public class BeanInvoker {
 	// 直接注入接口的list集合
    @Autowired
    private List<BeanInterface> list;
```

