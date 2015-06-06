/**
 * Created by John on 2015-06-01.
 */
var request=require('request');
var cheerio=require('cheerio');

console.log('读取博文列表');


function readArticleList(url,callback) {
//读取分类页面
    request(url, function (err, res) {
        if (err) {
            return console.error(err);
        }

        //根据网页内容创建dom操作对象
        var $ = cheerio.load(res.body.toString());

        //读取博文的列表
        var articleList = [];
        $('.articleList .articleCell').each(function () {
            var $this = $(this);
            var $title = $this.find('.atc_title a');
            var $time = $this.find('.atc_tm');

            var item = {
                title: $title.text().trim(),
                url: $title.attr('href'),
                time: $time.text().trim()
            };
            //从url中取出文章的id
            //http://blog.sina.com.cn/s/blog_4be2e2d20102vtri.html
            var s = item.url.match(/blog_([a-zA-Z0-9]+)\.html/);

            if (Array.isArray(s)) {
                item.id = s[1];
                articleList.push(item);
            }
        });
        //检查是否有下一页
        var nextUrl = $('.SG_pgnext a').attr('href');
        if (nextUrl) {
            //读取下一页
            readArticleList(nextUrl,function(err,articleList2){
                if(err) return callback(err);
                //合并结果
                callback(null,articleList.concat(articleList2));
            });
        }
        else{
            //返回结果集
            callback(null,articleList);
        }
    });
}

readArticleList('http://blog.sina.com.cn/s/articlelist_1273160402_0_1.html',function(err,articleList){
    if(err) console.error(err.stack);
    console.log(articleList);

});