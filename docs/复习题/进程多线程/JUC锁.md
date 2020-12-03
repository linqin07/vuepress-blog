### 1.ReentrantLock

默认和synchronize一样是非公平锁 🔒。

非公平是一种抢占机制，是随机获得锁，并不是先来的一定能先得到锁，结果就是不公平的。

非公平锁就是跟上锁的顺序无关，随机获得锁对象。公平就是按照加锁的顺序进行分配。非公平锁第一次加锁失败后就入队列，就和公平锁没什么区别了。

### 2.ReentrantReadWriteLock 读写锁

读读共享，读写、写读、写写都是互斥

如实现一个缓存功能

```java
package com.thread;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class CacheDemo {
    private Map<String, Object> map = new HashMap<String, Object>();//缓存器
    private ReadWriteLock rwl = new ReentrantReadWriteLock();
    public static void main(String[] args) {
        
    }
    public Object get(String id){
        Object value = null;
        rwl.readLock().lock();//首先开启读锁，从缓存中去取
        try{
            value = map.get(id); 
            if(value == null){  //如果缓存中没有释放读锁，上写锁
                rwl.readLock().unlock();
                rwl.writeLock().lock();
                try{
                    if(value == null){
                        value = "aaa";  //此时可以去数据库中查找，这里简单的模拟一下
                    }
                }finally{
                    rwl.writeLock().unlock(); //释放写锁
                }
                rwl.readLock().lock(); //然后再上读锁
            }
        }finally{
            rwl.readLock().unlock(); //最后释放读锁
        }
        return value;
    }

}
```

### 3.CountDownLatch 计数器

等待计数器完毕就执行操作。它的 await 是会检查计数器。会阻塞主线程。

```java
public class CountDownLatchDemo {

	private static final int THREAD_COUNT_NUM = 7;

	public static void main(String[] args) throws Exception {
		CountDownLatch countDownLatch = new CountDownLatch(THREAD_COUNT_NUM);
		for (int i = 1; i <= THREAD_COUNT_NUM; i++) {
			int index = i;
			new Thread(() -> {
				try {
					Thread.sleep(Math.abs(new Random().nextInt(5000)));
					System.out.println("第" + index + "颗龙珠已经找到");
				} catch (Exception e) {
					e.printStackTrace();
				}
				 //每收集到一颗龙珠,需要等待的颗数减1
				countDownLatch.countDown();
			}).start();
		}
		 //等待检查，即上述7个线程执行完毕之后，执行await后边的代码
		countDownLatch.await();
		System.out.println("召唤神龙");
	}
}
```

### 4.CyclicBarrier 屏障

不会阻塞主线程

```java
public class CyclicBarrierDemo {

	private static final int THREAD_COUNT_NUM = 7;

	public static void main(String[] args) {
		CyclicBarrier barrier = new CyclicBarrier(THREAD_COUNT_NUM, new Runnable() {

			@Override
			public void run() {
				System.out.println("7个法师召集完毕，同时出发，去往不同地方寻找龙珠！");
				summonDragon();
			}
		});

		for (int i = 1; i <= THREAD_COUNT_NUM; i++) {
			int index = i;
			new Thread(() -> {
				try {
					Thread.sleep(Math.abs(new Random().nextInt(3000)));
					System.out.println("召集第" + index + "个法师");
					barrier.await();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}).start();


		}
        System.out.println("我是主线程，我没有被堵塞");
    }

	/**
	 * 召唤神龙：1、收集龙珠；2、召唤神龙
	 */
	private static void summonDragon() {
		// 设置第二个屏障点，等待7位法师收集完7颗龙珠，召唤神龙
		CyclicBarrier summonDragonBarrier = new CyclicBarrier(THREAD_COUNT_NUM, new Runnable() {
			@Override
			public void run() {
				System.out.println("集齐七颗龙珠！召唤神龙！");
			}
		});
		// 收集7颗龙珠
		for (int i = 1; i <= THREAD_COUNT_NUM; i++) {
			int index = i;
			new Thread(() -> {
				try {
					Thread.sleep(Math.abs(new Random().nextInt(3000)));
					System.out.println("第" + index + "颗龙珠已收集到！");
					summonDragonBarrier.await();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}).start();

		}
	}
}
```

### 5.JUC 线程间通讯 Condition

await 阻塞，signal 唤醒

```java
public class ConditionDemo1 {
	/**
	 * 默认不是公平锁🔒，非公平是一种抢占机制，是随机获得锁，并不是先来的一定能先得到锁，结果就是不公平的。
     * 非公平锁就是跟上锁的顺序无关，随机获得锁对象。公平就是按照加锁的顺序进行分配。
	 */
	Lock lock = new ReentrantLock();
	Condition conditionA = lock.newCondition();
	Condition conditionB = lock.newCondition();

	public static void main(String[] args) throws Exception {
		ConditionDemo1 demo = new ConditionDemo1();
		
		new Thread(() -> demo.await(demo.conditionA), "thread-1").start();
		new Thread(() -> demo.await(demo.conditionB), "thread-2").start();

		new Thread(() -> demo.signal(demo.conditionA), "thread-3").start();
		Thread.sleep(5000);
		
		new Thread(() -> demo.signal(demo.conditionB), "thread-4").start();
	}

	private void await(Condition condition) {
		try {
			lock.lock();
			System.out.println(Thread.currentThread().getName() + "开始await");
			condition.await();
			System.out.println(Thread.currentThread().getName() + " await结束");
		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			lock.unlock();
		}
	}

	private void signal(Condition condition) {
		lock.lock();
		System.out.println(Thread.currentThread().getName() + "开始signal");
		condition.signal();
		lock.unlock();
	}
}
```

