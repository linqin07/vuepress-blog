### logback的使用

###### 1.新建一个springboot项目

因为springboot默认使用logback，不用引入什么依赖，这里面我们添加web依赖，方便测试。

###### 2.resources 目录增加 logback.xml 或者 logback-test.xml 或者 logback-spring.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--debug=true打印logback自身日志，scan默认true，修改配置文件动态生效。scanPeriod检测更新配置时间默认60 seconds-->
<configuration debug="false" scanPeriod="60 seconds">
    <!--定义日志文件的存储地址 勿在 LogBack 的配置中使用相对路径,可以使用占位符${}代替-->
    <property name="LOG_HOME" value="./logs"/>
    <!-- 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg %n</pattern>
        </encoder>
    </appender>
    <!-- 按照每天生成日志文件 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--日志文件输出的文件名-->
            <FileNamePattern>${LOG_HOME}/runtime.log.%d{yyyy-MM-dd}.log</FileNamePattern>
            <!--日志文件保留天数-->
            <MaxHistory>30</MaxHistory>
        </rollingPolicy>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
        <!--日志文件最大的大小-->
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <MaxFileSize>10MB</MaxFileSize>
        </triggeringPolicy>
        <!--拦截，把高于warn的日志过滤掉。-->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>INFO</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!--logback.LogbackDemo：类的全路径 -->
    <logger name="haha" level="INFO" additivity="true">
        <appender-ref ref="FILE"/>
    </logger>
    <logger name="com.controller.TestController" level="INFO" additivity="true">
        <appender-ref ref="FILE"/>
    </logger>
    <!-- 日志输出级别 -->
    <root level="INFO">
        <appender-ref ref="STDOUT"/>
        <!--<appender-ref ref="FILE"/>-->
    </root>
</configuration>
```

`additivity`是否往上级传递。true root 级别能打印，false root 无法打印

与此同时，还可以使用 `<springProfile name="dev">` 标签把这些里面的日志打印根据配置区分开





###### 类中使用

```java
@RestController
public class TestController {
    private Logger logger = LoggerFactory.getLogger("haha");
    private Logger logger1 = LoggerFactory.getLogger(TestController.class);

    @RequestMapping("/hello")
    public String hello () {
        logger.info("hello world!");
        logger1.info("hello world!");
        return "hello";
    }
}

```



案例一

支持异步打印日志，避免堵塞 IO

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration scan="false" scanPeriod="60 seconds" debug="false">
    <property name="log.path" value="/logs" />

    <appender name="CONSOLE-LOG" class="ch.qos.logback.core.ConsoleAppender">
        <layout class="ch.qos.logback.classic.PatternLayout">
            <pattern>[%d{yyyy-MM-dd HH:mm:ss}] [%thread] %level %logger -%msg%n</pattern>
        </layout>
    </appender>
    <!--获取比info级别高(包括info级别)但除error级别的日志-->
    <appender name="INFO-LOG" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>DENY</onMatch>
            <onMismatch>ACCEPT</onMismatch>
        </filter>
        <encoder>
            <pattern>[%d{yyyy-MM-dd HH:mm:ss}] [%thread] %level %logger -%msg%n</pattern>
        </encoder>

        <!--滚动策略,只需要定义一次-->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--路径-->
            <fileNamePattern>${log.path}.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
    </appender>
    <appender name="ERROR-LOG" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>ERROR</level>
        </filter>
        <encoder>
            <pattern>[%d{yyyy-MM-dd HH:mm:ss}] [%thread] %level %logger -%msg%n</pattern>
        </encoder>
        <!--滚动策略-->
<!--        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">-->
<!--            &lt;!&ndash;路径&ndash;&gt;-->
<!--            <fileNamePattern>${log.path}.%d{yyyy-MM-dd}.log</fileNamePattern>-->
<!--            <maxHistory>30</maxHistory>-->
<!--        </rollingPolicy>-->
    </appender>

    <!-- 异步输出 -->
    <appender name="ASYNC-INFO" class="ch.qos.logback.classic.AsyncAppender">
        <!-- 不丢失日志.默认的,如果队列的80%已满,则会丢弃TRACT、DEBUG、INFO级别的日志 -->
        <discardingThreshold>0</discardingThreshold>
        <!-- 更改默认的队列的深度,该值会影响性能.默认值为256 -->
        <queueSize>256</queueSize>
        <!-- 添加附加的appender,最多只能添加一个 -->
        <appender-ref ref="INFO-LOG"/>
    </appender>

    <appender name="ASYNC-ERROR" class="ch.qos.logback.classic.AsyncAppender">
        <!-- 不丢失日志.默认的,如果队列的80%已满,则会丢弃TRACT、DEBUG、INFO级别的日志 -->
        <discardingThreshold>0</discardingThreshold>
        <!-- 更改默认的队列的深度,该值会影响性能.默认值为256 -->
        <queueSize>256</queueSize>
        <!-- 添加附加的appender,最多只能添加一个 -->
        <appender-ref ref="ERROR-LOG"/>
    </appender>

    <root level="info">
        <appender-ref ref="CONSOLE-LOG" />
        <appender-ref ref="INFO-LOG" />
        <appender-ref ref="ERROR-LOG" />
    </root>
</configuration>
```

