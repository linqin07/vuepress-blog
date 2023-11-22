(window.webpackJsonp=window.webpackJsonp||[]).push([[228],{452:function(a,s,t){"use strict";t.r(s);var e=t(2),_=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h2",{attrs:{id:"查询mysql-相关mode"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查询mysql-相关mode","aria-hidden":"true"}},[a._v("#")]),a._v(" 查询mysql 相关mode")]),a._v(" "),t("div",{staticClass:"language-sql extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("select")]),a._v(" @"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("@global.sql_mode")]),a._v("\n")])])]),t("p",[a._v("在 mysql 版本为 5.7+ 默认的模式为")]),a._v(" "),t("blockquote",[t("p",[a._v("ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION")])]),a._v(" "),t("p",[a._v("其中 ONLY_FULL_GROUP_BY 意味着使用 group by 语句 select 部分不能使用聚合函数，如 max，min 等，否则报错")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Expression")]),a._v(" #"),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v(" of SELECT list is not in GROUP BY clause and contains nonaggregated colum\n")])])]),t("h6",{attrs:{id:"解决方案："}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解决方案：","aria-hidden":"true"}},[a._v("#")]),a._v(" 解决方案：")]),a._v(" "),t("p",[a._v("修改 mysql 配置 my.conf ，增加配置")]),a._v(" "),t("div",{staticClass:"language-properties extra-class"},[t("pre",{pre:!0,attrs:{class:"language-properties"}},[t("code",[t("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("sql_mode")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[a._v("STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION")]),a._v("\n")])])]),t("p",[a._v("去掉默认的 ONLY_FULL_GROUP_BY 配置。重启服务即可！")])])}),[],!1,null,null,null);s.default=_.exports}}]);