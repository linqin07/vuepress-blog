

### MongoDB 连接命令

直接 use 就创建出来了，插入数据才可以查看的见。

```sh
./mongo

> use runoob
switched to db runoob
>
> db.runoob.insert({"name":"菜鸟教程"})
WriteResult({ "nInserted" : 1 })

//删除集合
db.runoob.drop()

// 直接os执行脚本文件
C:\windows\system32>mongo 127.0.0.1:27017/test  D:\Desktop\flow.txt
linux mongo集群链接
mongo 172.21.1.27:30001/db  -u username -p password --authenticationDatabase admin
```

### 创建删除集合

在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合。

主动创建也是可以的

> db.createCollection("mycol",{})
> { "ok" : 1 }

> db.mycol.drop()
> true

### find 查询条件

查询语法

```sh
db.c.find()
db.getCollection("c")find()
```

匹配一个字符串,多个条件就是 map 多一个属性，查询嵌套字段是通过 A.B 这样的方式查询

```sh
db.c.find({"username" : "joe"})
b.users.find({"username" : "joe", "age" : 27}) 
```

指定需要返回的键，find 还重载了第二个参数指定返回什么字段，比如下面的查询需要返回 username = 1, 不需要 email = 0。此外，字段 `_id` 默认返回，也可以排除掉 `"_id":0`

```sh
db.users.find({}, {"username" : 1, "email" : 0})
```

条件查询

```sh
//db.collection.find(query)
db.runoob.find({"likes":{$gt:99}, $or:[{title:'update title1'}, {by:'aa'}]})
```

创建索引

```sh
db.runoob.createIndex({"title":1})
db.runoob.getIndexes()
```

删除数据

```sql
//删除deleteMany\deleteOne
db.runoob.deleteOne({_id: ObjectId("628f2904f62a000074006abe")})
db.getCollection("flow_copy_2022_1208").deleteMany({'main': false} )
```

查询嵌套lsit集合类

```sql
db.getCollection("flow").find({'chatflowId': '636de32509dd141337edf693', 
                               'nodes.data.flowId': {'$in': ['637b2a5a0351283a99600d1f', '636de32509dd141337edf694']}})
```

```java
//java 代码 mongoTemplate
Criteria criteria = new Criteria();
criteria.andOperator(Criteria.where("chatflowId").is(flow.getChatflowId()), Criteria.where("nodes.data.flowId").in(Lists.newArrayList(flow.getId())));

Query query = new Query();
query.addCriteria(criteria);

long count = mongoTemplate.count(query, Flow.class);
```

修改数据

```sql
db.getCollection("skill").update( { _id: ObjectId("634cc98b37130708fa8301bf") }, { $set: { "variables.15.global": true } } )

db.getCollection("flow").update( { _id: ObjectId("6350c53d001bac3d6c2ee3ad") }, { $set: { nodeData: ""}})
```

### update 更新

单条记录更新

```sh
db.getCollection("flow").update( { _id: ObjectId("6343c5997f07362bb547f280") }, { $set: { main: true } } )
```

多条记录更新，主要 `{multi:true}` 需要加上，否则只能生效一条记录

```sh
db.getCollection("flow").update({ 'main': false } , { $set: { main: true } },{multi:true} )
```



### group 分组

单字段

```sql
db.getCollection("UserSetDetail").aggregate([
    {
        $group: {
            _id: "$setId"
        }
    }
])
```

多字段 group by a，b

```sql
db.getCollection("UserSetDetail").aggregate([
    {
        $group : {
            _id : {setId: "$dId", drivesSeqNo: "$drivesSeqNo"}
        }
    }
])
```



### mongodb

- [ ]  定义的枚举类可以直接把枚举的值存储到库，可以在enum中使用@JsonValue、@JsonFormat作为前端接口的转换
- [ ] [DBRef](https://blog.csdn.net/bokestudy/article/details/103702824) 参考这个





### MongoTemplate 实现动态条件查询

> mongo springboot 里面整合使用 @EnableMongoRepositories 来扫描包，功能等同于 mybatis 的 @MapperScan。在多模块的某个项目中仅仅使用 mongo 也可以不写注解

使用 JPA 的 Example 构建的查询对象必须不为空，在某些情况下类继承了一些公共的属性有默认值时，需要重新创建查询的参数进行判断。所以在使用动态的查询条件不好实现。使用 MongoTemplate  可以组装条件。

```java
 Query query = new Query();
        Criteria criteria = new Criteria();
        List<Criteria> criterias = Lists.newArrayList();

        if (StringUtils.isNotBlank(skillId)) {
            criterias.add(Criteria.where("skillId").is(skillId));
        }
        if (StringUtils.isNotBlank(skillName)) {
            // 模糊匹配
            Pattern pattern = Pattern.compile("^.*" + skillName + ".*$", Pattern.CASE_INSENSITIVE);
            criterias.add(Criteria.where("skillName").regex(pattern));
        }

        if (criterias.size() != 0) {
            criteria.andOperator(criterias.toArray(new Criteria[criterias.size()]));
        }

        query.addCriteria(criteria);
		long count = mongoTemplate.count(query, Skill.class);
        Sort sort = Sort.by(Sort.Direction.fromString(pageLimit.getDirection()), pageLimit.getSort());
		Pageable pageable = PageRequest.of(pageLimit.getPageNo() - 1, pageLimit.getPageSize(), sort);
   		query.with(pageable);

        List<Skill> skills = mongoTemplate.find(query, Skill.class);
        
		// 再封装分页数据回去
```



### 工具类

https://juejin.cn/post/6909262670990409735