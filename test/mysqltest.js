/**
 * Created by John on 2015-06-06.
 */
var mysql = require('mysql');
var DB_NAME="blog_sina";


var pool  = mysql.createPool({
    host     : '127.0.0.1',
    database:'blog_sina',
    user     : 'root',
    password : 'abcd'
});

//测试数据库是否连接
pool.getConnection(function(err, connection) {
    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
        if (err) {
            console.log("USE Error: " + err.message);
            return;
        }
        console.log('USE succeed');
        connection.release();
    });});

//显示数据库中所有的表
pool.getConnection(function(err, connection) {

    connection.query('show tables', function (err,tables) {
        if (err) {
            console.log("show tables Error: " + err.message);
            return;
        }
        console.log(tables);

        connection.release();
    });});
