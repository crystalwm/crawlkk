/**
 * Created by John on 2015-06-06.
 */


var read=require('./read');
var save=require('./save');
var url=require('../config').sinaBlog.url;
var async=require('async');
console.log(url);



read.readArticleList(url,function(err,articleList){
    if(err) console.error(err.stack);
    async.eachSeries(articleList,function(article,next){
        save.articleListSave(article,function(err,result){
            if(err){
                console.log('readArticleList into mysql Error'+err.message);
            }
            read.readArticleDetail(article.url,function(err,detail){
                save.articleDetailSave(detail,function(err,result){
                    next();
                });
            });
        });
    },function(err){
        //当遍历完了所有的回调函数之后，执行该命令
        if(err) return console.error(err.stack);
        console.log('完成');
    });
    console.log('插入文章列表完成！');
});




