# 简介

VuePress站点实际上是由[Vue](http://vuejs.org/)，[Vue Router](https://github.com/vuejs/vue-router)和[webpack](http://webpack.js.org/)提供支持的SPA 。如果您之前使用过Vue，那么在编写或开发自定义主题时您会注意到熟悉的开发体验（您甚至可以使用Vue DevTools调试自定义主题！）。

**为什么**

因为我觉得好看！！！

**其他**

我原本使用的是 gitbook 来管理 markdown 文档。gitbook 的功能还是很丰富的，可以生成站点以及 pdf，但是插件貌似很多问题，而且没那么好看。但不可否认它文档管理的这套方案是很好的。我接下来使用的是 gitbook 文档的布局，完全是跟书籍一样的结构。根据文件夹进行创建章节，每个章节都有 README.md 简介。

```powershell
F:\HEXO\VUEPRESS\DOCS\设计模式
│  book.json
│  README.md
│  SUMMARY.md
│
├─1.策略模式
│      README.md
│      利用策略模式优化过多 if else 代码.md
│      计算机USB例子.md
│
├─2.责任链模式
│      README .md
│      报销流程例子.md
│
└─3.单例模式
        README.md
        双重校验锁.md
        懒汉式.md
        饿汉式.md
```

