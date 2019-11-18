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
    'seo': {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: (_, $site) => $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
        url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain || '') + $page.frontmatter.image),
        publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
    },
    'sitemap': {
        hostname: 'https://www.linqin.site'
    },
    '@vssue/vuepress-plugin-vssue': {
        // set `platform` rather than `api`
        platform: 'github',

        // all other options of Vssue are allowed
        owner: 'woshilinqin',
        repo: 'vuepress-blog',
        clientId: 'b791378efa6f3df53c05',
        clientSecret: '26b883fd1426668aedf928ba741e2f55b9f6fbbb',
    },
    "vuepress-plugin-code-copy": {
        // selector: String,
        align: 'top',
        // color: String,
        // backgroundTransition: Boolean,
        // backgroundColor: String,
        successText: '复制到粘贴板'
    }
}