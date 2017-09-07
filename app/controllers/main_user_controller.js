// 
var dB = require('../../config/initializers/database');
const statementHeader = "INSERT INTO USUARIO (EMAIL,USER_NAME,LAST_NAME)";
module.exports = {
    createUser:function(user){
        var dbcn = db.connectToPool();
        var statementBody = "VALUES("+user.email+","+user.user_name;


    }
}