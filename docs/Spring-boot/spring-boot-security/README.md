## 一.说明

`SpringSecurity` 是一个用于Java 企业级应用程序的安全框架,主要包含用户认证和用户授权两个方面。下面简称`SS`。

JWT 是在 Web 应用中安全传递信息的规范,从本质上来说是 Token 的演变,是一种生成加密用户身份信息的 Token,特别适用于分布式单点登陆的场景,无需在服务端保存用户的认证信息,而是直接对 Token 进行校验获取用户信息,使单点登录更为简单灵活。
