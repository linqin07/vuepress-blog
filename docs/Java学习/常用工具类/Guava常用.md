###  1.Optional

其中`fromNullable`等同于 JDK8 的`ofNullable`，`or`等同于 JDK8 的`orElseGet`，null 就取这个值。

```java
// 创建指定引用的Optional实例，若引用为null则快速失败
Optional<String> of = Optional.of("");
System.out.println(of.isPresent()); // true

Object or = Optional.fromNullable(null).or("3");
System.out.println(or);
```

### 2.不可变集合

优点：线程安全，节省空间。不支持`null`

jdk 不可变集合：笨重低效，要保证没人通过原集合的引用进行修改，返回的集合才是事实上不可变的。

```java
// 不可变集合
ImmutableSet<String> color_names = ImmutableSet.of("red", "orange", "yellow", "green", "blue", "purple");

ImmutableList<String> of = ImmutableList.of("1", "2");
// builder
ImmutableList.builder().add("1", "2", "3").addAll(of).build();
// copyOf
ImmutableList<String> strings = ImmutableList.copyOf(of);

// jdk中的不可变集合。
Collections.unmodifiableList(Lists.newArrayList());
```

### 3.其他新集合

- **Multiset** 可以重复的set，元素顺序不影响。具体实现类有 

| **Map**           | 对应的Multiset                                               | 是否支持null元素             |
| ----------------- | ------------------------------------------------------------ | ---------------------------- |
| HashMap           | [HashMultiset](http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/collect/HashMultiset.html) | 是                           |
| TreeMap           | [TreeMultiset](http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/collect/TreeMultiset.html) | 是（如果comparator支持的话） |
| LinkedHashMap     | [LinkedHashMultiset](http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/collect/LinkedHashMultiset.html) | 是                           |
| ConcurrentHashMap | [ConcurrentHashMultiset](http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/collect/ConcurrentHashMultiset.html) | 否                           |
| ImmutableMap      | [ImmutableMultiset](http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/collect/ImmutableMultiset.html) | 否                           |

情景：统计字符串出现次数。

```java
       Multiset<String> multiset = HashMultiset.create();
		// 也可以使用addAll添加一个其他额外的集合
        multiset.add("a");
        multiset.add("a");
        multiset.add("a");
        multiset.add("c");
        multiset.add("c");
        multiset.add("c");
        multiset.add("c");
        multiset.add("b");
        multiset.add("b");
        for (Multiset.Entry item : multiset.entrySet() ) {
            System.out.println(item.getElement() + "=" + item.getCount());
        }

 // 转为set，去重复
        Set<String> strings1 = multiset.elementSet();
        System.out.println(strings1);
```

> a=3
> b=2
> c=4
> [a, b, c]

- **Multimap **很容易地把一个键映射到多个值

### Joiner

如果序列中包含 `null` 值，那么可以使用 `Joiner` 跳过 `null` 值：

```java
// 跳过 null 值
result = Joiner.on("; ").skipNulls().join("Harry", null, "Ron", "Hermione");
Assert.assertEquals(result, "Harry; Ron; Hermione");
```

也可以通过 `useForNull(String)` 来将 `null` 值替换为指定的字符串，针对 map 使用 `ithKeyValueSeparator()` 来拼接 key 和 value

```java
// MapJoiner 的使用，将 map 转换为字符串
Map map = ImmutableMap.of("k1", "v1", "k2", "v2");
result = Joiner.on("; ").withKeyValueSeparator("=").join(map);
Assert.assertEquals(result, "k1=v1; k2=v2");
```



### Splitter

拆分

```java
Splitter.on(',')
    .trimResults()  // 将结果中的空格删除
    .omitEmptyStrings() //移去结果中的空字符串
    .split("foo,bar,,   qux");
```

移除匹配字符串 `Splitter.on(',').trimResults(CharMatcher.is('_')).split("_a ,_b_ ,c__")` 返回 `"a ", "b_ ", "c"`



### Cache

本地缓存，设置  expireAfterAccess(long, TimeUnit) 缓存元素在指定的时间没有被读取访问失效，或 设置 expireAfterWrite(long, TimeUnit) 缓存元素在指定的时间没有被写入访问失效

::: warning 注意

设置元素的定时无操作失效后，元素并不会在时间到达后就主动失效触动移除监听器。而是在后续的访问或写入时，捎带着把先前放入的元素过期后进行驱逐。可以使用线程定时清除过期的缓存元素 `cache.cleanUp()` 使用线程池来维护 Executors.newScheduledThreadPool(1).scheduleWithFixedDelay (自测无效，后来通过线程内主动判断时间进行移除`invalidate(key)`)

:::

```java
public static Cache<Integer, Integer> cache = CacheBuilder.newBuilder()
.expireAfterWrite(10, TimeUnit.MINUTES)
.removalListener(new MyRemovalListener())
.build();

private static class MyRemovalListener implements RemovalListener<Integer, Integer> {  
    @Override  
    public void onRemoval(RemovalNotification<Integer, Integer> notification) {  
        doSomething();
    }  
}
```

### 集合操作

```java
ImmutableList<Integer> olds = ImmutableList.of(1, 2, 3);
ImmutableList<Integer> news = ImmutableList.of(2, 3, 4);

// 差集, A-B 的差集
Sets.SetView difference = Sets.difference(Sets.newHashSet(olds), Sets.newHashSet(news));
Sets.SetView difference1 = Sets.difference(Sets.newHashSet(news), Sets.newHashSet(olds));
// 交集
Sets.SetView and = Sets.intersection(Sets.newHashSet(news), Sets.newHashSet(olds));
System.out.println(difference1.immutableCopy().asList());

Sets.SetView union = Sets.union(Sets.newHashSet(news), Sets.newHashSet(olds));
System.out.println(union.immutableCopy().asList());

// 判断两个集合是否有交集
Collections.disjoint(list1, list2);
```

