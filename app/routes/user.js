
module.exports = function(router){

    'use strict';
    router.route("/testEndPoint")
    .get(function(req,res, next){
        console.log('success');
        res.status(200).json({message:"success"});

    })


};

