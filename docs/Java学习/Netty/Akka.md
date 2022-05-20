## Akka

一个多线程处理框架，非常轻量的事件驱动处理。异步、非阻塞、高性能的事件驱动编程模型。

每个 actor 处理自己的`消息`



### 使用场景

适用于复杂的消息处理，比如有很多类型的消息，每个消息对应怎么处理，消息直接处理还有顺序、依赖、循环。

MapReduce 操作

> 实际生产中，存在很多消息类型，可以以内部类的方式创建消息entity，避免混淆，缺点是代码不直观
>
> 其次，如果需要查询数据库等操作，应该一开始就把全部数据都查回来，避免每个子操作再查询。

### 角色介绍

- ActorSystem 创建Actor系统，创建者
- ActorRef：actor 引用持有者，用于 actor 之间相互发送时需要使用 ActorRef.tell 消息
- AbstractActor：actor 具体的实现，



### domo

1. 创建 ActorSystem，这里可以预先创建好各个 xxxActor，也可以等到具体使用时在创建。先创建后续就选择使用，没必要重复创建。

   ```java
   public class WordCountAkka {
       public static void main(String[] args) {
           //1、创建Actor系统，名字为wordcount
           ActorSystem actorSystem = ActorSystem.create("wordcount");
           try {
               //2、创建SplitActor，用于拆分每行的单词
               ActorRef splitActor = actorSystem.actorOf((Props.create(SplitActor.class)), "SplitActor");
               //2.1、创建CountActor，用于统计单词的次数
               ActorRef countActor = actorSystem.actorOf((Props.create(CountActor.class)), "CountActor");
   
               //3、创建消息
               //TODO 接收的消息串，可以修改为从控制台输入，本次就直接写死了
               Message msg = new Message("Hello Akka Akka Hello ni hao aa hao");
               //4、给SplitActor发消息
               splitActor.tell(msg, ActorRef.noSender());
   
               //5、按回车退出应用
               System.out.println(">>> Press ENTER to exit <<<");
               System.in.read();
           } catch (IOException e) {
               e.printStackTrace();
           } finally {
               actorSystem.terminate();
           }
       }
   }
   ```

2. 分别实现 Actor
   SplitActor

   ```java
   public class SplitActor extends AbstractActor {
       @Override
       public Receive createReceive() {
           return receiveBuilder().match(Message.class, t -> {
               System.out.println(self() + "  收到来自于 " + sender() + " 的消息: " + t);
               //按照空格拆分数据
               String[] words = String.valueOf(t.getContent()).toLowerCase().split("\\W+");
               //封装消息请求给CountActor
               Message msg = new Message(words);
               System.out.println(self() + "  发送消息 : " + Arrays.toString(words));
               //根据路径查找下一个处理者
               // ActorSelection countActorRef = getContext().actorSelection("/user/CountActor");
   
               ActorRef countActorRef = getContext().actorOf((Props.create(CountActor.class)), "CountActor");
               //将消息发给下一个处理者CountActor
               countActorRef.tell(msg, self());
           }).build();
   
       }
   }
   ```

   CountActor

   ```java
   public class CountActor extends AbstractActor {
       @Override
       public Receive createReceive() {
           return receiveBuilder().match(Message.class, t -> {
               //收到消息
               String[] words = (String[]) t.getContent();
               System.out.println(self() + " 收到来自于 " + sender() + " 的消息: " + Arrays.toString(words));
   
               //统计处理
               Map conutMap = new HashMap<>();
               for (String word : words) {
                   Integer num = (Integer) conutMap.get(word);
                   conutMap.put(word, num == null ? 1 : num + 1);
               }
   
              ActorSelection actorSelection = getContext().actorSelection("/user/CountActor");
              // System.out.println(self() + " 每个单词出现次数的统计结果为 : " + conutMap);
   
              Result result = new Result();
              result.info = self() + " 每个单词出现次数的统计结果为 : " + conutMap.entrySet();
              actorSelection.tell(result, ActorRef.noSender());
           }).match(Result.class, t ->{
               // 处理再次调用
               System.out.println(t.info);
                                  }).build();
   
       }
   
       static class Result {
           public String info;
       }
   
   }
   ```

   消息类 Message

   ```java
   public class Message {
   
       private Object content;
   
       public Message(Object content) {
           this.content = content;
       }
   
       public Object getContent() {
           return content;
       }
   
       public void setContent(Object content) {
           this.content = content;
       }
   }
   ```

   

3. 执行完毕关闭资源 actorSystem.terminate();

4. 打印结果，里面有具体的路径，可以再选择的时候填上

   ```txt
   Actor[akka://wordcount/user/SplitActor#-82947062]  收到来自于 Actor[akka://wordcount/deadLetters] 的消息: com.example.learn.Message@6b4c11ac
   Actor[akka://wordcount/user/SplitActor#-82947062]  发送消息 : [hello, akka, akka, hello, ni, hao, aa, hao]
   Actor[akka://wordcount/user/SplitActor/CountActor#-656262900] 收到来自于 Actor[akka://wordcount/user/SplitActor#-82947062] 的消息: [hello, akka, akka, hello, ni, hao, aa, hao]
   Actor[akka://wordcount/user/SplitActor/CountActor#-656262900] 每个单词出现次数的统计结果为 : [aa=1, hao=2, hello=2, ni=1, akka=2]
   ```

   





