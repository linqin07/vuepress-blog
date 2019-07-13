### 过滤器filter（java回调）

针对 http `请求`，所有的 web 请求都会最先通过过滤器，依赖 web 环境。无法控制访问的方法、类粒度。

使用场景：设置全局请求的字符集返回，用户登陆鉴权

### 拦截器interceptor（java反射）

拦截器可以在方法执行之前 (preHandle) 和方法执行之后 (afterCompletion) 进行操作，回调操作 (postHandle)，可以获取执行的方法的名称。可以控制获取请求的方法，但无法获取请求里面的参数。

使用场景：接口幂等性校验（拦截指定注解接口，对请求 token 进行校验是否重复）、接口防刷限流（拦截指定注解接口，记录接口次数于 redis，比较大小放行）

### Spring AOP

Aspect : 可以自定义切入的点，可以获取执行方法的参数 (ProceedingJoinPoint.getArgs())，但是拿不到 http 请求。针对粒度更小的 `target`。

> 通过其他方式如 RequestContextHolder 获得
>
> ServletRequestAttributes servletRequestAttributes= (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

使用场景：接口统一打印请求时间日志，声明式事务，请求参数安全验证



### 三者执行顺序

doFileter before(过滤器) ->    preHandle(拦截器) -> postHandel(controller)(拦截器) -> afterCompletion(拦截器) -> doFilter after(过滤器)