const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const marked = require('marked');
const baseUrl = 'https://hitsuoyue.github.io/gegezhan/';
let list = [];

fs.readdir('./list', function (error, files) {
    files.forEach( file=>{
        let p = path.join('./list', file);
        let markdown = fs.readFileSync(p).toString();
        let html = marked(markdown);

        let template = fs.readFileSync('./template.html').toString();
        let result = template.replace('%content%', html);
        fs.writeFileSync(file+'.html', result);
    })
});

fs.readdir('./', function (error, files) {
    files.forEach(file=>{
        if(file.substring(file.length-7, file.length) === 'md.html'){
            list.push(file);
        }
    })
    modifyList();
});

function modifyList() {
    let content = fs.readFileSync('./index.html');
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
