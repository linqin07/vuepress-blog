(window.webpackJsonp=window.webpackJsonp||[]).push([[169],{394:function(t,a,s){"use strict";s.r(a);var e=s(2),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"websocket"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#websocket","aria-hidden":"true"}},[t._v("#")]),t._v(" WebSocket")]),t._v(" "),s("h3",{attrs:{id:"坑点："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#坑点：","aria-hidden":"true"}},[t._v("#")]),t._v(" 坑点：")]),t._v(" "),s("ol",[s("li",[s("h6",{attrs:{id:"spring-boot-websocket-无法通过-autowired-注入-bean-的问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#spring-boot-websocket-无法通过-autowired-注入-bean-的问题","aria-hidden":"true"}},[t._v("#")]),t._v(" spring boot websocket 无法通过 @Autowired 注入 bean 的问题")]),t._v(" "),s("p",[t._v("客户端每建立一个链接就会创建一个对象，可以理解为 new 出来的客户端，service 对象就无法注入了。spring 管理的都是单例，不会给第二个 websocket 对象注入 service，所以导致只要是用户连接创建的 websocket 对象，都不能再注入了。")]),t._v(" "),s("p",[s("strong",[t._v("解决办法：")])]),t._v(" "),s("ul",[s("li",[s("p",[t._v("使用全局 "),s("code",[t._v("ApplicationContext")]),t._v("进行获取对应的 "),s("code",[t._v("service")]),t._v(" 实例。")])]),t._v(" "),s("li",[s("p",[t._v("修改 service 变量为 "),s("code",[t._v("static")]),t._v("，使其属于类，在初始化是就是全局变量，多个实例公用。需要注意的是：set 方法不能是 static 的。")]),t._v(" "),s("blockquote",[s("p",[t._v("You cannot autowire or manually wire static fields in Spring")])])])]),t._v(" "),s("blockquote",[s("p",[t._v("静态代码块static > 代码块{} > 构造方法 > autowire注入")])]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ChatService")]),t._v(" chatService"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 注入的时候，给类的 service 注入")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Autowired")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setChatService")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ChatService")]),t._v(" chatService"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WebSocketHandler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("chatService "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" chatService"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),s("li",[s("h6",{attrs:{id:"前后端分离，nginx-代理转发需要额外配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前后端分离，nginx-代理转发需要额外配置","aria-hidden":"true"}},[t._v("#")]),t._v(" 前后端分离，nginx 代理转发需要额外配置")]),t._v(" "),s("p",[t._v("使用nginx进行代理有加上配置")]),t._v(" "),s("div",{staticClass:"language-nginx extra-class"},[s("pre",{pre:!0,attrs:{class:"language-nginx"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("proxy_connect_timeout")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v("s"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("proxy_read_timeout")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("7200")]),t._v("s"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("proxy_send_timeout")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),t._v("s"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("proxy_set_header")]),t._v(" Upgrade "),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$http_upgrade")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("proxy_set_header")]),t._v(" Connection "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"upgrade"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),s("li",[s("h6",{attrs:{id:"springboot项目中增加了websocket功能无法运行测试"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#springboot项目中增加了websocket功能无法运行测试","aria-hidden":"true"}},[t._v("#")]),t._v(" SpringBoot项目中增加了WebSocket功能无法运行测试")])])]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@SpringBootTest")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("webEnvironment "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SpringBootTest")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WebEnvironment")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("RANDOM_PORT"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[s("h6",{attrs:{id:"全局监听发送"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局监听发送","aria-hidden":"true"}},[t._v("#")]),t._v(" 全局监听发送")]),t._v(" "),s("ul",[s("li",[t._v("websocket 中声明用来存放每个客户端对应的 MyWebSocket 对象，标记为"),s("code",[t._v("static")]),t._v("状态。")]),t._v(" "),s("li",[t._v("声明启动线程，定时拉去"),s("code",[t._v("kafka")]),t._v("队列数据判断处理后进行推送，直接使用全局对象 MyWebSocket 调用 客户端对应发送的方法。")])])])])])}),[],!1,null,null,null);a.default=n.exports}}]);