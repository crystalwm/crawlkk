/**
 * Created by John on 2015-06-01.
 */
var request=require('request');

request("http://www.baidu.com",function(err,response,body){
    if(!err && response.statusCode==200){
        console.log(body);
    }
});