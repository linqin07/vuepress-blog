#!/usr/bin/env sh

# 终止一个错误
set -e

# 构建
npm run docs:build

# 进入生成的构建文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'www.linqin.site' > CNAME

# 如果你是要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# ssh推送，如果你想要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:woshilinqin/vuepress-blog.git master:gh-pages

# http推送
# git push -f https://github.com/woshilinqin/document.git master:gh-pages

# http推送,travis-ci自动化,
# git push -f https://${access_token}@github.com/woshilinqin/document.git master:gh-pages  # document仓库
  git push -f https://${access_token}@github.com/woshilinqin/vuepress-blog.git master:gh-pages  # vuepress-blog分支

cd -