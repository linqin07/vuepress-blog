### 集合直接的对应关系

![1551253158598.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1551253158598.png)





###### 1.List 和 Set 区别

- List:有序。可以add null。可以重复插入。
- Set：无序。只能一个null。不允许重复对象。

###### 2.List 和 Map 区别

- list 继承 collection 接口，map 是个顶级接口。

###### 3.Arraylist 与 LinkedList 区别

- ArrayList底层是数组结构。LinkedList底层是链表。
- 数组的特性查询快，增删慢。链表的特性是增删快，查询慢。

> LinkedList 属于队列：
>
> |          | *抛出异常*  | *返回特殊值* |
> | -------- | ----------- | ------------ |
> | **插入** | `add(e)`    | `offer(e)`   |
> | **移除** | `remove()`  | `poll()`     |
> | **检查** | `element()` | `peek()`     |

###### 4.ArrayList 与 Vector 区别

- Vector是线程安全的。ArrayList不是线程安全的。所以性能上面ArrayList比Vector快。
- ArrayList在底层数组不够用时在原来的基础上扩展0.5倍，Vector是扩展1倍。

###### 5.HashMap 和 Hashtable 的区别

- HashMap线程不安全，Hashtable线程安全。
- HashMap并允许使用 null 值和 null 键。Hashtable不允许。

###### 6.HashMap 和 ConcurrentHashMap 的区别

- ConcurrentHashMap 就是分段的 hashmap，分段对小的片段进行同步，可以提高效率。

###### 7.HashMap 的工作原理及代码实现，什么时候用到红黑树

- jdk8 前：计算增加对象key的hashcode，根据hashcode放到对应的桶（bucket）下面，如果已经有了值（发生了碰撞），则新建链表增加。（链地址法）
- jdk8：果发现链表长度`超过 8`，那么将链表转储成红黑树，小于 6 转换回链表形式。小于八，新增成本低。大于八，查询成本低。

> 1. 当桶数组 table 为空时，通过扩容的方式初始化 table
> 2. 查找要插入的键值对是否已经存在，存在的话根据条件判断是否用新值替换旧值
> 3. 如果不存在，则将键值对链入链表中，并根据链表长度决定是否将链表转为红黑树
> 4. 判断键值对数量是否大于阈值，大于的话则进行扩容操作

- 当数组的使用率超过负载因子的时候（默认值是0.75）便会选择扩容，扩容两倍。

###### 8.多线程情况下HashMap死循环的问题

- 使用hashtable，并发高使用ConcurrentHashMap 

###### 9.ConcurrentHashMap 的工作原理及代码实现，如何统计所有的元素个数,减少集合的粒度，更高效的利用。

- 把hashmap细分为多个子集，增加并发能力。

###### 10.Iterator和ListIterator的区别是什么？

- Iterator可用来遍历Set和List集合，但是ListIterator只能用来遍历List。
- Iterator对集合只能是前向遍历，ListIterator既可以前向也可以后向。
  其他的差不多。

###### 11.快速失败(fail-fast)和安全失败(fail-safe)的区别是什么？

情景：多线程使用迭代器进行迭代过程中其他线程修改了集合的值。

- 默认就是快速失败：
  抛出异常Concurrent Modification Exception。
  迭代器是直接在原来的集合上进行迭代。

- 安全失败：
  会额外复制一份集合的值出来进行迭代，不会抛出异常，使用`并发包下面的集合类`都是安全失败的。缺点是修改值不能通知到自己。

###### 12.Enumeration接口(out没人用)和Iterator接口的区别有哪些？

- Enumeration速度是Iterator的2倍，同时占用更少的内存。但是，Iterator远远比Enumeration安全，因为其他线程不能够修改正在被iterator遍历的集合里面的对象。同时，Iterator允许调用者删除底层集合里面的元素，这对Enumeration来说是不可能的。

###### 13.HashSet和TreeSet有什么区别？

- hashset 无序，添加删除复杂度都是O(1)
- hashtree 有序，添加删除复杂度都是O(logn)