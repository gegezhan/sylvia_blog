const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const marked = require('marked');
const baseUrl = 'https://gegezhan.github.io/sylvia_blog/';
let list = [];

fs.readdir('./list', function (error, files) {
    // console.log('files', files);
    // [...list] = files;
    // console.log('files', files, list);
    files.forEach( (file, index) => {
        let dir_p = path.join('./list', file);
        // console.log('dir_p', dir_p);
        fs.readdir(dir_p, function (dir_error, dir_files) {
            list.push({
                item: file,
                children: dir_files
            });

            dir_files.forEach(dir_file=>{
                let file_p = path.join(dir_p, dir_file);
                let markdown = fs.readFileSync(file_p).toString();
                let html = marked(markdown);

                let template = fs.readFileSync('./template.html').toString();
                let result = template.replace('%content%', html);
                fs.writeFileSync(dir_file+'.html', result);
            });
            if(index === files.length - 1){
                modifyList()
            }
        })

    });
});

function articleDisplay(e) {
    console.log('e', e);
};

function modifyList() {
    let content = fs.readFileSync('./index.html');
    $ = cheerio.load(content);
    let dom = $('#content');
    dom.empty();
    let ul = `<ul class="container"></ul>`;
    dom.append(ul);
    let container = $('.container');

    list.forEach((item,index)=>{
        let li =  `<li class='block block-${index}'></li>\n`;
        container.append(li);
        let liElem =  $(`.container .block-${index}`);
        let a = `<a class="title">${index+1}. ${item.item}</a>`;
        liElem.append(a);
        if(item.children && Array.isArray(item.children)){
            item.children.forEach(_item=>{
                let childA = `<a class="article">${_item.substring(0, _item.length-3)}</a>\n`;
                liElem.append(childA);
                console.log('childA', childA);
            })
        }
    });

    fs.writeFile('./index.html', $.html());
}




