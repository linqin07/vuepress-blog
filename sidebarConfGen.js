const fs = require('fs');
const path = require('path');
const { format } = require('util');

const SEPARATOR = "/";
const README_MD = "README.md";
const SUMMARY = "SUMMARY.md";
// 修改正则表达式，使用 \b 匹配单词边界，确保只匹配完整目录名
const EXCLUDE_REGEX = /\b(picBak|assets|node_modules|_book|.git|.vuepress|bak)\b/;

function main() {
    // 处理输入路径（优先使用命令行参数）
    let rootPath = "E:\\github\\vuepress-blog\\docs";
    if (process.argv[2] && process.argv[2].trim()) {
        rootPath = process.argv[2];
        console.log(`目标路径: ${rootPath}`);
    }

    // 读取根目录下的所有文件/目录
    const rootFiles = fs.readdirSync(rootPath, { withFileTypes: true });
    const sidebarConfig = {};

    // 处理一级目录
    for (const dirent of rootFiles) {
        if (!dirent.isDirectory() || dirent.name.startsWith(".") || EXCLUDE_REGEX.test(dirent.name)) continue;
        
        const dirPath = path.join(rootPath, dirent.name);
        const key = `${SEPARATOR}${dirent.name}${SEPARATOR}`;
        sidebarConfig[key] = getFileList(dirPath, rootPath);
    }

    // 生成最终配置并写入文件（优化JSON格式化）
    const outputContent = `module.exports = ${format(JSON.stringify(sidebarConfig, null, 2))}`;
    const outputPath = path.join(path.dirname(rootPath), "config/sidebarConf.js");
    
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, outputContent, 'utf8');
    console.log(`生成目标文件路径: ${outputPath}`);
}

function getFileList(currentDir, rootPath) {
    const files = [];
    const dirs = [];
    let summaryEntry = null;
    let readmeEntry = null;

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        
        // 处理MD文件
        if (entry.isFile() && entry.name.endsWith(".md")) {
            const [relativePath, title] = processMdFile(fullPath, rootPath, entry.name);
            const mdItem = [relativePath, title];
            
            if (entry.name === SUMMARY) {
                summaryEntry = mdItem; // 单独记录SUMMARY
            } else if (entry.name === README_MD) {
                readmeEntry = mdItem; // 单独记录README
            } else {
                files.push(mdItem);
            }
        }

        // 处理子目录（排除过滤项）
        if (entry.isDirectory() && !EXCLUDE_REGEX.test(entry.name)) {
            dirs.push({
                title: entry.name,
                collapsable: true,
                children: getFileList(fullPath, rootPath)
            });
        }
    }

    // 排序逻辑优化：目录 > 数字前缀文件 > 普通文件（按字母排序）
    const sortedDirs = sortItems(dirs);
    const sortedFiles = sortItems(files);

    // 最终顺序：SUMMARY > README > 目录 > 其他文件
    const result = [];
    if (summaryEntry) result.push(summaryEntry);
    if (readmeEntry) result.push(readmeEntry);
    result.push(...sortedDirs);
    result.push(...sortedFiles);

    return result;
}

// 通用排序函数（支持目录和文件）
function sortItems(items) {
    return items.sort((a, b) => {
        const getSortKey = (item) => {
            const title = Array.isArray(item) ? item[1] : item.title;
            const numMatch = title.match(/^\d+/); // 提取数字前缀
            return numMatch ? parseInt(numMatch[0], 10) : title;
        };

        const keyA = getSortKey(a);
        const keyB = getSortKey(b);

        // 数字优先于字母，目录优先于文件
        if (typeof keyA === 'number' && typeof keyB === 'number') {
            return keyA - keyB;
        } else if (typeof keyA === 'number') {
            return -1;
        } else if (typeof keyB === 'number') {
            return 1;
        } else {
            return keyA.toString().localeCompare(keyB.toString());
        }
    });
}

function processMdFile(fullPath, rootPath, fileName) {
    // 处理根路径为空的情况（如docs直接作为根目录）
    let relative = fullPath.replace(rootPath, '').split(path.sep).join('/');
    if (relative === `/${README_MD}`) relative = '/'; // 根目录README特殊处理
    
    let title = fileName.replace('.md', '');

    if (fileName === README_MD) {

        relative = relative.replace(`/${README_MD}`, ''); // 清理README路径
        title = 'README';
    } else if (fileName === SUMMARY) {

        title = 'SUMMARY';
    }
    
    return [relative, title];
}

// 执行主函数
main();