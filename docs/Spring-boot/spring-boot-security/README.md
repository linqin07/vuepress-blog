## 一.说明

`SpringSecurity` 是一个用于Java 企业级应用程序的安全框架,主要包含用户认证和用户授权两个方面。下面简称`SS`。

JWT 是在 Web 应用中安全传递信息的规范,从本质上来说是 Token 的演变,是一种生成加密用户身份信息的 Token,特别适用于分布式单点登陆的场景,无需在服务端保存用户的认证信息,而是直接对 Token 进行校验获取用户信息,使单点登录更为简单灵活。



### 二.基本组件介绍

AuthenticationManagerBuilder  验证管理，可以重写自定义登录逻辑，默认是用户名密码登录。

UserDetailsService  连数据库查询用户操作

AuthenticationManager

> successHandler 默认实现 AjaxAuthenticationSuccessHandler 返回 response 编码 200，也可以自定义继承接口实现页面重定向或者设置状态编码
>
> failureHandler 默认实现 AjaxAuthenticationFailureHandler 返回 response 编码 401
>

logout().logoutSuccessHandler 默认实现 AjaxLogoutSuccessHandler

exceptionHandling()

AuthenticationEntryPoint 用来解决匿名用户访问无权限资源时的异常,默认实现 SecurityProblemSupport

AccessDeineHandler 用来解决认证过的用户访问无权限资源时的异常, 默认实现 SecurityProblemSupport



#### csrf(跨站伪造请求)

解决:

token 校验之所以能防御 csrf,因为只有在同源的情况下，页面才能进行脚本操作和使用 js 获取 cookie 的操作，才能获取到 token

#### cors(跨域请求Access-Control-Allow-Origin)

响应首部中可以携带这个头部表示服务器允许哪些域可以访问该资源

c.Header("Access-Control-Allow-Origin", "*")



#### 修改匿名用户名称

再把 bean addFilter 里面

```java
@Bean
public AnonymousAuthenticationFilter authenticationFilter() {
    // 重新注册bean修改匿名用户名称
    return new AnonymousAuthenticationFilter("doesNotMatter", "aiui", AuthorityUtils.createAuthorityList("ROLE_ANONYMOUS"));
}
```