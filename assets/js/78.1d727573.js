(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{306:function(a,s,t){"use strict";t.r(s);var e=t(2),r=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h4",{attrs:{id:"_1-下载源码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-下载源码","aria-hidden":"true"}},[a._v("#")]),a._v(" 1.下载源码")]),a._v(" "),t("p",[a._v("kafka-manager"),t("a",{attrs:{href:"https://github.com/yahoo/kafka-manager/releases/tag/1.3.3.22",target:"_blank",rel:"noopener noreferrer"}},[a._v("github地址"),t("OutboundLink")],1),a._v("，找到对应的releases版本。")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1551164365553.png",alt:"1551164365553.png"}})]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("weget https://github.com/yahoo/kafka-manager/archive/1.3.3.22.tar.gz\n")])])]),t("p",[t("strong",[a._v("解压")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("tar")]),a._v(" -zxfv "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1.3")]),a._v(".3.18.tar.gz\n")])])]),t("h4",{attrs:{id:"_2-编译"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-编译","aria-hidden":"true"}},[a._v("#")]),a._v(" 2.编译")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("./sbt clean dist\n")])])]),t("p",[a._v("如果提示没有安装 sbt，安装一下。"),t("code",[a._v("yum install sbt")]),a._v(" 再次编译。开启漫长等待。")]),a._v(" "),t("p",[a._v("编译好的文件"),t("code",[a._v("kafka-manager-1.3.3.22.zip")]),a._v("在生成在目录"),t("code",[a._v("target/universal")]),a._v("里。")]),a._v(" "),t("h4",{attrs:{id:"_3-解压目标文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-解压目标文件","aria-hidden":"true"}},[a._v("#")]),a._v(" 3.解压目标文件")]),a._v(" "),t("p",[a._v("修改一下 conf 的 zk 地址即可")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("Skafka-manager.zkhosts"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"127.0.0.1:2181"')]),a._v("\n")])])]),t("h4",{attrs:{id:"_4-启动"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-启动","aria-hidden":"true"}},[a._v("#")]),a._v(" 4.启动")]),a._v(" "),t("p",[a._v("后台启动命令")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("nohup")]),a._v(" bin/kafka-manager "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[t("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[a._v("2")]),a._v(">")]),t("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[a._v("&1")]),a._v(" \n")])])]),t("p",[a._v("查看后台任务命令：")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("jobs")]),a._v("\n")])])]),t("p",[a._v("对应杀死")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("kill")]),a._v(" -9 %1\t\n")])])]),t("p",[a._v("页面访问默认9000端口 "),t("a",{attrs:{href:"http://193.112.10.38:9000/",target:"_blank",rel:"noopener noreferrer"}},[a._v("http://193.112.10.38:9000/"),t("OutboundLink")],1)]),a._v(" "),t("p",[t("img",{attrs:{src:"https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1551168572056.png",alt:"1551168572056.png"}})])])}),[],!1,null,null,null);s.default=r.exports}}]);