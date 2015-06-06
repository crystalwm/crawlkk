/**
 * Created by John on 2015-06-06.
 */
//mysql数据库连接的配置

var mysql = require('mysql');
var DB_NAME="blog_sina";


 exports.pool  = mysql.createPool({
    host     : '127.0.0.1',
    database:'blog_sina',
    user     : 'root',
    password : 'abcd'
});

//博客首页的地址
exports.sinaBlog={
    url:"http://blog.sina.com.cn/s/articlelist_1273160402_0_1.html"
};

