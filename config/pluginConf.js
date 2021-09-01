module.exports = {
    '@vuepress/back-to-top': true,
    '@vuepress/medium-zoom': true, //这个插件将会使你的图片支持点击缩放
    '@vuepress/pwa': {
        serviceWorker: true,
        updatePopup: {
            message: "啦啦啦,一大波内容已更新!",
            buttonText: "朕知道了"
        }
    },

    // '@vssue/vuepress-plugin-vssue': {
    //     // set `platform` rather than `api`
    //     platform: 'github',
    //
    //     // all other options of Vssue are allowed
    //     owner: 'linqin07',
    //     repo: 'vuepress-blog',
    //     clientId: 'b791378efa6f3df53c05',
    //     clientSecret: '6e912c05d8c900c57ed04e994e9d12e4d96e33f9',

    // <Vssue title="Vssue" />  把这行加到需要的页面下面，
    // },

    "vuepress-plugin-code-copy": {
        // selector: String,
        align: 'top',
        // color: String,
        // backgroundTransition: Boolean,
        // backgroundColor: String,
        successText: '复制到粘贴板'
    },
    'vuepress-plugin-helper-live2d': {
        live2d: {
            // 是否启用(关闭请设置为false)(default: true)
            enable: true,
            // 模型名称(default: hibiki)>>>取值请参考：
            // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
            model: 'shizuku',
            display: {
                position: "right", // 显示位置：left/right(default: 'right')
                width: 135, // 模型的长度(default: 135)
                height: 300, // 模型的高度(default: 300)
                hOffset: 65, //  水平偏移(default: 65)
                vOffset: 0, //  垂直偏移(default: 0)
            },
            mobile: {
                show: false // 是否在移动设备上显示(default: false)
            },
            react: {
                opacity: 0.8 // 模型透明度(default: 0.8)
            }
        }
    }
}