
//dabase connection pool
var mysql = require('mysql');

var poolConnection;
var con;
module.exports = {

    getPool: function(){

        if(poolConnection){
            return poolConnection;
        }
        poolConnection = mysql.createPool({
            host:'localhost',
            user:'root',
            password:'root',
            database:'corporateenglishdb'
            //gato92#
        });
        return poolConnection;

    },
    connectToPool: function(){
        
        poolConnection.getConnection(function(err,connection){
            if(err){
                throw err;
            }
            con = connection;
            console.log("Success");
        });
        return con;

    }

};