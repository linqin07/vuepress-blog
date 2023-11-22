(window.webpackJsonp=window.webpackJsonp||[]).push([[238],{461:function(t,a,s){"use strict";s.r(a);var e=s(2),r=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h6",{attrs:{id:"_1-面向对象的特征：继承、封装和多态"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-面向对象的特征：继承、封装和多态","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.面向对象的特征："),s("code",[t._v("继承、封装和多态")])]),t._v(" "),s("h6",{attrs:{id:"_2-final-finally-finalize-的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-final-finally-finalize-的区别","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.final, finally, finalize 的区别")]),t._v(" "),s("ul",[s("li",[t._v("final是一个修饰符，声明的变量为不可修改。")]),t._v(" "),s("li",[t._v("finally是异常捕获的关键字。无论是否异常最后都会执行finally。")]),t._v(" "),s("li",[t._v("垃圾回收调用时会先调用。")])]),t._v(" "),s("h6",{attrs:{id:"_3-exception、error、运行时异常与一般异常有何异同"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-exception、error、运行时异常与一般异常有何异同","aria-hidden":"true"}},[t._v("#")]),t._v(" 3.Exception、Error、运行时异常与一般异常有何异同")]),t._v(" "),s("ul",[s("li",[t._v("Error是虚拟机级别的错误，不可恢复，如OutOfMemoryError、ThreadDeath。")]),t._v(" "),s("li",[t._v("Exception:\n"),s("ul",[s("li",[t._v("Checked Exception：编译器强制程序去捕获该类异常。如IOException、SQLException。")]),t._v(" "),s("li",[t._v("RunTime Exception：运行时异，编译器没有进行强制的捕获并处理。如NullPointerException")])])])]),t._v(" "),s("h6",{attrs:{id:"_4-请写出5种常见到的runtime-exception"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-请写出5种常见到的runtime-exception","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.请写出5种常见到的runtime exception")]),t._v(" "),s("p",[t._v("NullPointerException，ArrayIndexOutOfBoundsException，ArithmeticException，ClassCaseException，TimeoutException")]),t._v(" "),s("h6",{attrs:{id:"_5-int-和-integer-有什么区别，integer的值缓存范围"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-int-和-integer-有什么区别，integer的值缓存范围","aria-hidden":"true"}},[t._v("#")]),t._v(" 5.int 和 Integer 有什么区别，Integer的值缓存范围")]),t._v(" "),s("p",[t._v("Integer是int类型的包装类，int类型只记录值，Integer有内存地址和值。缓存范围-128~127.\n默认Integer=null，int=0；")]),t._v(" "),s("h6",{attrs:{id:"_6-包装类，装箱和拆箱"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-包装类，装箱和拆箱","aria-hidden":"true"}},[t._v("#")]),t._v(" 6.包装类，装箱和拆箱")]),t._v(" "),s("ul",[s("li",[t._v("基本数据类型：short,byte,char,int,float,double,long,boolean")]),t._v(" "),s("li",[t._v("包装类型 :Integer Byte Short Long Float Double Character Boolean")]),t._v(" "),s("li",[t._v("转换为大写为装箱，转化为小写的为拆箱子")]),t._v(" "),s("li",[t._v("缓冲池子：Integer范围-128~127 会自动装箱拆箱。("),s("code",[t._v("享元模式")]),t._v(")")])]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[t._v("\t     "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),t._v(" ii"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),t._v(" iii"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("valueOf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//自动装箱")]),t._v("\n\t\t "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ii"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v("iii"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v("ii"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v("iii"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t \n\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//在-128~127 之外的数")]),t._v("\n\t\t "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),t._v(" i1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n\t\t "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),t._v(" i2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("          \n\t\t "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"i1==i2: "')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i1"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v("i2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//false                   ")]),t._v("\n\t\t "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在-128~127 之内的数自动拆箱")]),t._v("\n\t\t "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),t._v(" i3 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n\t\t "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),t._v(" i4 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n\t\t "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"i3==i4: "')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i3"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v("i4"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//true ")]),t._v("\n\t\t \n\t\t "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i0"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i3"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v("i0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//true")]),t._v("\n\t\t "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i1"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v("i0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//false")]),t._v("\n")])])]),s("h6",{attrs:{id:"_7-string、stringbuilder、stringbuffer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-string、stringbuilder、stringbuffer","aria-hidden":"true"}},[t._v("#")]),t._v(" 7.String、StringBuilder、StringBuffer")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("String为字符串常量，String对象一旦创建之后该对象是不可更改的。速度最慢")])]),t._v(" "),s("li",[s("p",[t._v("StringBuffer对象是变量，可以进行字符串更改。速度其次，"),s("code",[t._v("线程安全")]),t._v("。")])]),t._v(" "),s("li",[s("p",[t._v("StringBuilder速度最快，线程不安全。")])])]),t._v(" "),s("h6",{attrs:{id:"_8-重载和重写的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_8-重载和重写的区别","aria-hidden":"true"}},[t._v("#")]),t._v(" 8.重载和重写的区别")]),t._v(" "),s("ul",[s("li",[t._v("重写：发生在继承类上，方法名，参数类型，返回类型等都要一致。")]),t._v(" "),s("li",[t._v("重载：发生在一个类上，方法名相同，参数类型，返回类型，权限控制可以不一样。")])]),t._v(" "),s("h6",{attrs:{id:"_9：抽象类和接口有什么区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_9：抽象类和接口有什么区别","aria-hidden":"true"}},[t._v("#")]),t._v(" 9：抽象类和接口有什么区别")]),t._v(" "),s("ul",[s("li",[t._v("接口里面的方法都是public abstract,可以定义静态常量, 抽象类可以定义私有变量和私有方法")]),t._v(" "),s("li",[t._v("抽象类只能继承一个父类,但是可以多实现接口,接口可以多继承,")]),t._v(" "),s("li",[t._v("实现接口就要实现所有的方法, 抽象类可以不用实现接口的全部方法")]),t._v(" "),s("li",[t._v("抽象类"),s("code",[t._v("不能实例化")]),t._v(",不能构建对象,子类必须实现父类的抽象方法,子类才可以成功的继承父类")])]),t._v(" "),s("h6",{attrs:{id:"_10-说说反射的用途及实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_10-说说反射的用途及实现","aria-hidden":"true"}},[t._v("#")]),t._v(" 10.说说反射的用途及实现")]),t._v(" "),s("ul",[s("li",[t._v("运行时动态获取一个类的属性、方法")]),t._v(" "),s("li",[s("router-link",{attrs:{to:"/复习题/基础/反射.html"}},[t._v("反射API")])],1)]),t._v(" "),s("h6",{attrs:{id:"_11-说说自定义注解的场景及实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_11-说说自定义注解的场景及实现","aria-hidden":"true"}},[t._v("#")]),t._v(" 11.说说自定义注解的场景及实现")]),t._v(" "),s("p",[t._v("比如说实现自定义注解来实现单例模式。多数据源使用自定义注解指定。")]),t._v(" "),s("h6",{attrs:{id:"_12-http请求的get与post方式的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_12-http请求的get与post方式的区别","aria-hidden":"true"}},[t._v("#")]),t._v(" 12.HTTP请求的GET与POST方式的区别")]),t._v(" "),s("ul",[s("li",[t._v("get会把参数放到url中,post放在htmlheader中用户看不了")]),t._v(" "),s("li",[t._v("get传输数据大小比较小,而post比较大")]),t._v(" "),s("li",[t._v("get从服务器获取数据,而post提交数据")]),t._v(" "),s("li",[t._v("get安全性不高,post安全性 高.")])]),t._v(" "),s("h6",{attrs:{id:"_13-session与cookie区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_13-session与cookie区别","aria-hidden":"true"}},[t._v("#")]),t._v(" 13.Session与Cookie区别")]),t._v(" "),s("ul",[s("li",[t._v("cookie保存在客户端，session保存在服务端。")]),t._v(" "),s("li",[t._v("cookie实现一周自动登录。session实现登录验证。")])]),t._v(" "),s("h6",{attrs:{id:"_14-列出自己常用的jdk包"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_14-列出自己常用的jdk包","aria-hidden":"true"}},[t._v("#")]),t._v(" 14.列出自己常用的JDK包")]),t._v(" "),s("p",[t._v("util包，io输入输出流包，net网络传输包")]),t._v(" "),s("h6",{attrs:{id:"_15-mvc设计思想"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_15-mvc设计思想","aria-hidden":"true"}},[t._v("#")]),t._v(" 15.MVC设计思想")]),t._v(" "),s("ul",[s("li",[t._v("Modoul数据层dao，View视图层前端页面，Controller控制器请求跳转。")])]),t._v(" "),s("h6",{attrs:{id:"_16-equals与-的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_16-equals与-的区别","aria-hidden":"true"}},[t._v("#")]),t._v(" 16.equals与==的区别")]),t._v(" "),s("ul",[s("li",[t._v("equals比较两个变量的值是否相同，==判断值和引用地址是不是一个，判断是否同个对象。")]),t._v(" "),s("li",[t._v("类似Integer这些包装类的大小比较可以直接equal。")])]),t._v(" "),s("h6",{attrs:{id:"_17-hashcode和equals方法的区别与联系"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_17-hashcode和equals方法的区别与联系","aria-hidden":"true"}},[t._v("#")]),t._v(" 17.hashCode和equals方法的区别与联系")]),t._v(" "),s("ul",[s("li",[t._v("equals()相等的两个对象，hashcode()一定相等；")]),t._v(" "),s("li",[t._v("hashcode()不等，一定能推出equals()也不等；")]),t._v(" "),s("li",[t._v("hashcode()相等，equals()可能相等，也可能不等。")])]),t._v(" "),s("h6",{attrs:{id:"_18-什么是java序列化和反序列化，如何实现java序列化？或者请解释serializable-接口的作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_18-什么是java序列化和反序列化，如何实现java序列化？或者请解释serializable-接口的作用","aria-hidden":"true"}},[t._v("#")]),t._v(" 18.什么是Java序列化和反序列化，如何实现Java序列化？或者请解释Serializable 接口的作用")]),t._v(" "),s("ul",[s("li",[t._v("序列化是指对象在网络传输或者保存到硬盘等过程中，对象要转化的一种形式。implements Serializable只是为了标注该对象是可被序列化的。")]),t._v(" "),s("li",[t._v("Java对象的"),s("code",[t._v("static")]),t._v("，"),s("code",[t._v("transient")]),t._v(" 修饰的属性不能被序列化。静态的是因为保存在内存中。"),s("code",[t._v("transient")]),t._v("标记该对象不可被序列化。")])]),t._v(" "),s("h6",{attrs:{id:"_19-java的平台无关性如何体现出来的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_19-java的平台无关性如何体现出来的","aria-hidden":"true"}},[t._v("#")]),t._v(" 19.Java的平台无关性如何体现出来的")]),t._v(" "),s("ul",[s("li",[t._v("一处开发，多处运行。使用jdk开发的代码编译的class文件在各个平台上的 jre 上面都可以运行。")])]),t._v(" "),s("h6",{attrs:{id:"_20-jdk和jre的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_20-jdk和jre的区别","aria-hidden":"true"}},[t._v("#")]),t._v(" 20.JDK和JRE的区别")]),t._v(" "),s("ul",[s("li",[t._v("jre是运行时环境")]),t._v(" "),s("li",[t._v("jdk包括jre、编译等工具。")])]),t._v(" "),s("h6",{attrs:{id:"_21-java-8有哪些新特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_21-java-8有哪些新特性","aria-hidden":"true"}},[t._v("#")]),t._v(" 21.Java 8有哪些新特性")]),t._v(" "),s("ul",[s("li",[t._v("Lambda表达式")]),t._v(" "),s("li",[t._v("流的操作")]),t._v(" "),s("li",[t._v("增加了很多函数式接口")])]),t._v(" "),s("h6",{attrs:{id:"_22-值传递和引用传递。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_22-值传递和引用传递。","aria-hidden":"true"}},[t._v("#")]),t._v(" 22.值传递和引用传递。")]),t._v(" "),s("ul",[s("li",[t._v("一般认为，java的基本数据类型都是值传递，修改不会影响到原来的变量。")]),t._v(" "),s("li",[t._v("所有的集合类都是引用传递，修改了会对应修改到原来变量的值。")])])])}),[],!1,null,null,null);a.default=r.exports}}]);