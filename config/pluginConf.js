module.exports = {
    '@vuepress/back-to-top': true,
    '@vuepress/medium-zoom': true, //这个插件将会使你的图片支持点击缩放
    '@vuepress/pwa': {
        serviceWorker: true,
        updatePopup: {
            message: "啦啦啦,一大波内容已更新!",
            buttonText: "朕知道了"
        }
    }
}