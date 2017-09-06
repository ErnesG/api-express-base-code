
//dabase connection pool
var mysql = require('mysql');

var poolConnection;

module.exports = {

    getPool: function(){

        if(poolConnection){
            return poolConnection;
        }
        poolConnection = mysql.createPool({
            host:'localhost',
            user:'root',
            password:'root',
            database:'corporateenglish'
        });

    }

};