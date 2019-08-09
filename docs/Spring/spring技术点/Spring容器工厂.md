### Spring容器工厂

`ApplicationContextAware`是用来获取spring的上下文。通过工具类直接实现该接口，返回`ApplicationContext`对象。

```java
@Component
public class SpringBeanFactory implements ApplicationContextAware {

    @Autowired
    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    public static <T> T getBean(Class<T> c){
        return applicationContext.getBean(c);
    }

    public static <T> T getBean(String name,Class<T> clazz){
        return applicationContext.getBean(name,clazz);
    }
}
```

可以通过该工具类来获取到对应的bean。

***疑问：***

> 可以直接通过注解`@Autowired`直接注入上下文，这个工具只是封装了一下，有什么作用？

在实际应用中，我们可以直接注入这个上下文对象，但是类似一些线程对象，`new`出来的就没法注入了。注入的使用范围只适合用在声明为 spring 组件的类中。

##### 线程中有 4 种方式注入`bean`<!--多线程注入-->:smirk:

- 一种是使用 **new** 创建线程，线程内部每个容器对象都使用`applicationContext`进行注入。
- 二是使用线程的构造方法进行注入。
- 三是线程内部的变量进行`setter`注入。
- 以上都是要一个个变量进行操作，多对象注入写一大堆注入。推荐使用注册线程为`Component`,使用线程时使用`applicationContext`进行获取，这样线程内部依然可以使用`@Autowired`进行注入对象。

