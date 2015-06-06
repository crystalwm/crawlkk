/**
 * Created by John on 2015-06-01.
 */
var request=require('request');
var cheerio=require('cheerio');

console.log('读取博文分类');


request('http://blog.sina.com.cn/s/articlelist_1273160402_0_1.html',function(err,res){
    if(err){
        return console.error(err);
    }

    var $=cheerio.load(res.body.toString());

    //读取博文的分类列表
    var classList=[];

    $('.blog_classList li a').each(function(){
        var $this=$(this);

        var item={
            name:$this.text().trim(),
            url:$this.attr('href')
        };

        //从url中取出分类的idx
        //articlelist_1273160402_1_1
        //期望的结果是 1
        var s=item.url.match(/articlelist_\d+_(\d+)_\d\.html/);
        console.log('s:'+s);

        if(Array.isArray(s)){
            item.id=s[1];
            classList.push(item);
        }
    });

    console.log(classList);
});
