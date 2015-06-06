/**
 * Created by John on 2015-06-06.
 */
//将读取的数据保存在mysql的数据库中
var async=require('async');
var pool=require('../config').pool;
var url=require('../config').sinaBlog.url;

/**
 * 查询文章列表是否存在，
 * 如果已经存在了，做update操作
 * 如果不存在，则做insert操作
 * */
function articleListSave(articleList,callback){
 pool.getConnection(function(err,connection){
    var queryArticleList_sql="select count(*) cont from article_list where id=?";

            connection.query(queryArticleList_sql,[articleList.id],function(err,result){
                if (err) {
                    console.log("queryArticleList_sql Error: " + err.message);
                    return;
                    }
                if(result[0].cont!=0){
                    //已经存放在则做更新操作
                    var updateArticleList_sql="update article_list set title=? , url=? ,time=? where id=?";
                    connection.query(updateArticleList_sql,
                        [articleList.title,articleList.url,articleList.time,articleList.id],
                        function(err,result){
                            if (err) {
                                console.log("updateArticleList_sql Error: " + err.message);
                                return;
                            }
                            callback(err,result);
                            connection.release();
                    });
                }
                else{
                    //不存在的话，则做插入操作
                    var insertArticleList="insert into article_list(id,title,time,url) values(?,?,?,?) ";
                    connection.query(insertArticleList,
                    [articleList.id,articleList.title,articleList.time,articleList.url],
                    function(err,result){
                            if (err) {
                                console.log("insertArticleList Error: " + err.message);
                                return;
                            }
                            callback(err,result);
                            connection.release();
                    });
                }
            });
})};


/**
 * 查询文章是否存在
 * 如果已经存在了，做update操作
 * 如果不存在，做insert操作
 * */
function articleDetailSave(article,callback){
    pool.getConnection(function(err,connection){
        var queryArticleDetail_sql="select count(*) cont from article_detail where id=?";

        connection.query(queryArticleDetail_sql,[article.id],function(err,result){
            if (err) {
                console.log("queryArticleDetail_sql Error: " + err.message);
                return;
            }
            if(result[0].cont!=0){
                //已经存放在则做更新操作
                var updateArticleDetail_sql="update article_detail set url=? , tags=? ,content=? where id=?";
                connection.query(updateArticleDetail_sql,
                    [article.url,article.tags,article.content,article.id],
                    function(err,result){
                        if (err) {
                            console.log("updateArticleDetail_sql Error: " + err.message);
                            return;
                        }
                        callback(err,result);
                        connection.release();
                    });
            }
            else{
                //不存在的话，则做插入操作
                var insertArticleDetail="insert into article_detail(id,url,tags,content) values(?,?,?,?) ";
                connection.query(insertArticleDetail,
                    [article.id,article.url,article.tags.toString(),article.content],
                    function(err,result){
                        if (err) {
                            console.log("insertArticleDetail Error: " + err.message);
                            return;
                        }
                        callback(err,result);
                        connection.release();
                    });
            }
        });
    })};

exports.articleListSave=articleListSave;
exports.articleDetailSave=articleDetailSave;