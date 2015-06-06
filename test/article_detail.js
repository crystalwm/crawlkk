/**
 * Created by John on 2015-06-02.
 */
var request=require('request');
var cheerio=require('cheerio');

console.log('读取博文内容');

//读取博文页面
request('http://blog.sina.com.cn/s/blog_4be2e2d20101lxu1.html',function(err,res){
    if(err) console.error(err);

    //根据网页内容创建DOM操作对象
    var $= cheerio.load(res.body.toString());
    console.log($);

    //获取文章
    var tags=[];
    $('.blog_tag h3 a').each(function(){
        var tag=$(this).text().trim();

        if(tag){
            tags.push(tag);
        }
    });

    //获取文章内容
    var content =$('.articalContent').html();


    //输出内容
    console.log(content);
  // console.log({tags:tags,content:content});
});