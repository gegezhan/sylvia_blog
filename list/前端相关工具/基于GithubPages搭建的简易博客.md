# 搭建基于 Github Pages 的简单博客
## 基本思路：
1. Github Pages 实现网页预览 => 2. Markdown 文件自动转换为可视网页 =>  3. 自动创建文章目录
---
## Github Pages 实现网页预览
#### 1. 新建一个 git 仓库
新建仓库：
![](http://upload-images.jianshu.io/upload_images/8879462-e8296023a014a022.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
![新建仓库](http://upload-images.jianshu.io/upload_images/8879462-7967c6f01b95a05b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
添加  README 文件：
![添加 README文件](http://upload-images.jianshu.io/upload_images/8879462-61418c14e396b8f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
![提交README文件](http://upload-images.jianshu.io/upload_images/8879462-8de4f97d84993da5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
![仓库新建完成](http://upload-images.jianshu.io/upload_images/8879462-6caef7321024bda2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
#### 2. 新建 index.html 文件并提交
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Marked in the browser</title>
</head>
<body>
<h1> this is index.html</h1>
</body>
</html>
```
#### 3. GitHub Pages 设置
进入 Settings：
![](http://upload-images.jianshu.io/upload_images/8879462-f3a949adbfa7f04f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
GitHub Pages 的 Source 选项下，选择 master branch 并保存：
![](http://upload-images.jianshu.io/upload_images/8879462-b3dd83dd6a557352.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
![](http://upload-images.jianshu.io/upload_images/8879462-6f00397da7920108.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
设置完成页面刷新后，打开 GitHub Pages 的 Source 选项下的网址则默认打开 index.html：
![](http://upload-images.jianshu.io/upload_images/8879462-bb63cad6ee335b9d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
![](http://upload-images.jianshu.io/upload_images/8879462-f6c84f5b3db05700.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)
---
## 将  Markdown 格式的内容转换为 HTML 元素
##### 1. 新建 template.html
此处，使用 marked 插件，可将用 Markdown 语法写的内容转换为 HTML 元素。
```
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>template</title>
  <script src="https://cdn.bootcss.com/marked/0.3.17/marked.min.js"></script>
</head>
<body>
<div id="content">
# template content
## by me  
</div>
  <script>
    let content = document.getElementById('content');
    let markdown = content.innerHTML;
    let newMarkdown = HTMLDecode(markdown);
    let html = marked(newMarkdown);
    content.innerHTML = html;    
    
    //特殊字符在获取 innerHTML 时，会被转换为转义字符，影响 Markdown 内容转换，此处反转回来。 &gt对应 > 
    function HTMLDecode(text) { 
      return text.replace(/&gt;/g, '>')
    }
  </script>
</body>
</html>
```
##### 2. 再次点击 Settings 进入网页，在网址后加入/template，即可预览 template.html 网页，效果如下：
![](http://upload-images.jianshu.io/upload_images/8879462-0a25a8bcdd7d3b73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

---

## 下载并安装 Node.js
使用 Node.js，首先要安装 Node 环境。
官网下载：[https://nodejs.org/en/](https://link.jianshu.com/?t=https://nodejs.org/en/) / [http://nodejs.cn/download/](https://link.jianshu.com/?t=http://nodejs.cn/download/)
安装时，要勾选 `Add to Path`，则 node 环境变量会被自动添加。
安装完成后，验证是否安装成功：打开命令行，输入 node -v ，安装正常，则会在下行输出 node 版本号，如：v8.9.1
至此，安装成功。
---
## 将  Markdown 文档转换为直接展示 Markdown 内容的 html 文件
思路：将第3步中 template.html 文件中 div 内的内容替换为 要展示的 Markdown 文档内容，即可。
此处，利用 Node.js 的文件读写功能。
点击 [查看Node 文档](http://nodejs.cn/api/)
##### 1. 将仓库内容克隆到本地
![](http://upload-images.jianshu.io/upload_images/8879462-d8a4ebcfdfd8c665.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
##### 2. 在本地新建 transform.js 文件，内容如下：
```
console.log('this is transform.js');
```
##### 3. 命令行执行 node transform.js，则命令行会打印出 'this is transform.js'，说明 transform.js 文件已执行。
##### 4. 根目录新建 list 文件夹，用来存放 Markdown 文件。
并新建 article1.md、article.md 内容如下：
```
# this is article1
## by me
```
```
# this is article2
## by me
```
##### 5. 修改 template.html 文件，删除 div 内内容，改为占位符 %content% ：
```
<div id="content">%content%</div>
```
##### 6. 修改 transform.js 文件如下：
```
const fs = require('fs');
const path = require('path');

fs.readdir('./list', function (error, files) {
    files.forEach(file => {
        let p = path.join('./list', file);
        let markdown = fs.readFileSync(p).toString();
        let template = fs.readFileSync('./template.html').toString();
        let result = template.replace('%content%', markdown);
        fs.writeFileSync(file + '.html', result);
    })
});
```
##### 7. 再次执行 node transform.js，则会在根目录生成 article1.md.html 和 article2.md.html 文件，打开文件预览如下：
![article1](http://upload-images.jianshu.io/upload_images/8879462-21a0df95c9d61083.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)
![article2](http://upload-images.jianshu.io/upload_images/8879462-37d0397363b0d543.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)
至此，可通过执行 transform.js 文件生成 Markdown 文档对应的 html 文件。
---
## 6.将 index.html 作为博客入口文件，自动生成博客目录。
思路：利用 Node.js 操作 DOM，此处要用到 cheerio 插件，进行 DOM 操作。
##### 1. 命令行执行 npm init 生成 package.json 文件，再执行 npm install cheerio ，安装 cheerio。
##### 2. 修改 index.html 文件如下：
```
<!DOCTYPE html><html><head>
    <meta charset="utf-8">
    <title>Marked in the browser</title>
</head>
<body>
<div id="content"></div>
</body></html>
```
##### 3. 修改 transform.js 文件如下：
```
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const baseUrl = 'https://hitsuoyue.github.io/gegezhan/';
let list = [];

fs.readdir('./list', function (error, files) {
    files.forEach( file=>{
        let p = path.join('./list', file);
        let markdown = fs.readFileSync(p).toString();
        let template = fs.readFileSync('./template.html').toString();
        let result = template.replace('%content%', markdown);
        fs.writeFileSync(file+'.html', result);
    })
});

fs.readdir('./', function (error, files) {
    files.forEach(file=>{
        if(file.substring(file.length-7, file.length) === 'md.html'){
            list.push(file);
        };
    })
    modifyList();
});

function modifyList() {
    let content = fs.readFileSync('./index.html');
    console.log('11111')
    $ = cheerio.load(content);
    let dom = $('#content');
    dom.empty();
    let ul = `<ul class="container"></ul>`;
    dom.append(ul);
    let container = $('.container');
    list.forEach((item,index)=>{
        let url = `${baseUrl}${item}`;
        let title = item.substring(0, item.length-8);
        let li = `<li><a href=${url}>${index+1}. ${title}</a></li>\n`;
        container.append(li);
    });

    fs.writeFile('./index.html', $.html());
}
```
##### 4. 执行 node transform.js，则 index.html 文件被改变，打开预览效果如下：
![index.html](http://upload-images.jianshu.io/upload_images/8879462-617e7ebf069949db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)
至此，可自动生成文章目录。
---
## 将代码提交到 github 仓库上。
```
git add .
git commit -m blog
git push
```
---
通过以上步骤就可利用 Github Pages 简单创建一个博客啦~
你可根据需要添加自己的样式~~~
---
注：代码中涉及到 github 地址的请替换为自己的 github 地址；
       源代码地址：https://hitsuoyue.github.io/gegezhan/ 
