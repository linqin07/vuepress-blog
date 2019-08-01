// .vuepress/config.js
const navConf = require('../../config/navConf.js');
const sidebarConf = require('../../config/sidebarConf.js');
// 引入密码常量文件变量
const secreKeyConf = require('../../config/secretKeyConf.js')

module.exports = {
    base: '/vuepress-blog/',
    locales: {
        '/vuepress-blog/': {
            lang: 'zh'
        }
    },
    themeConfig: {
        repo: 'https://github.com/woshilinqin/vuepress-blog',
        title: '个人主页',
        description: 'Lin的博客',
        logo: "/logo.png",
        // 导航栏链接
        nav: navConf,
        // 侧边栏
        sidebar: sidebarConf,
        lastUpdated: '上次更新时间',
        // 刷新内容的弹窗，方便编写内容调试
        serviceWorker: {
            //updatePopup: true, // Boolean | Object, 默认值是 undefined.
            // 如果设置为 true, 默认的文本配置将是:
            updatePopup: {
                message: "有内容更新",
                buttonText: "Refresh"
            }
        },

        algolia: {
            appId: secreKeyConf.appId,
            apiKey: secreKeyConf.apiKey,
            indexName: 'vuepress-blog',
            algoliaOptions: {
                hitsPerPage: 10,
                facetFilters: ""
            }
        }
    }

}