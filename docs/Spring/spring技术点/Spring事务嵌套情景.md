### Spring 事务嵌套情景

###### 1.同一个serviceImpl 内调用

```java
    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public User insert(User user) {
        userMapper.insert(user);

        User user1 = userMapper.selectByPrimaryKey(user.getUserId());
        user1.setUserAge("999");

        try {
            // 新起的事务无效，动态代理留的坑。要通过代理执行或者注入bean来执行。这个方法写的事务注解都是无效的，等于没写。
//            update(user1);

            // 这个更新方法失败。记录被行锁了。但是换成insert是生效的
//            ((IUserService) AopContext.currentProxy()).update(user1);

            //
            user.setUserName("tx执行");
            tx.update(user);

        } catch (RuntimeException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public User update(User user) {
        userMapper.updateByPrimaryKey(user);
        throw new RuntimeException("ggg");
//        return userMapper.selectByPrimaryKey(user.getUserId());

    }
```

这里有测试动态代理给 Spring 留下的问题，同个类中的相互调用其子方法的事务注解是无效的，必须通过代理方式调用或者交由 Spring 管理进行注入才有效。

> ((IUserService) AopContext.currentProxy()).update(user1);

其次，事务间数据共享问题。父事务进行入库操作，子事务可以读取父事务的数据。但是换为 update 就不可以会卡住到超时失败，原因是因为事务会对父记录进行`行锁`，子事务更新需要得到行锁才可以操作，默认 mysql 的隔离级别是可重复读，修改子事务的隔离级别为读未提交即可。

> @Transactional(isolation = Isolation.READ_UNCOMMITTED)



## 事务的并发问题

如果实际中使用事务，同时还有并发的情况。如事务过程是一个秒杀卖商品，卖操作需要先减库存再下订单，这个操作执行事务。下面是错误案例，会导致超卖。

执行 unlock 释放锁的同时事务还没提交，其他线程进入到里面获取的值还是没提交前的数据，gg思密达。

```java
@Service
public class ServiceOne{
    // 设置一把可重入的公平锁
    private Lock lock = new ReentrantLock(true);
    
    @Transactional(rollbackFor = Exception.class)
    public Result  func(long seckillId, long userId) {
        lock.lock();
        // 执行数据库操作——查询商品库存数量
        // 如果 库存数量 满足要求 执行数据库操作——减少库存数量——模拟卖出货物操作
        lock.unlock();
    }
}
```

正确操作：事务过程中不要使用锁，ReentrantLock 、synchronized 都不行。锁再更上一层进行控制。或则业务运行，直接设置事务基本为串行化。

## Spring事务失效的常见原因

1. **数据库引擎不支持事务**

   这里以 MySQL 为例，其 MyISAM 引擎是不支持事务操作的，InnoDB 才是支持事务的引擎，一般要支持事务都会使用 InnoDB。

2. **没有被 Spring 管理**

   说吧了就是没注册到 Spring 容器当中，例如使用了注解 @Component、@Service 等。

3. **方法不是 public 的**

   `@Transactional` 只能用于 public 的方法上，否则事务不会失效，如果要用在非 public 方法上，可以开启 `AspectJ` 代理模式。

4. **自身调用问题**

5.  **数据源没有配置事务管理器**

   ```java
   @Bean
   public PlatformTransactionManager transactionManager(DataSource dataSource) {
       return new DataSourceTransactionManager(dataSource);
   }
   ```

6. **事务的传播级别不支持事务**

   ```java
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
   public void updateOrder(Order order) {
       // update order
   }
   ```

7. **抛出异常类型错误**

   默认回滚的是：RuntimeException，如果你想触发其他异常的回滚，需要在注解上配置一下。`@Transactional(rollbackFor = Exception.class)`

8. **手动 try catch 处理的异常导致不能回滚**



