'use strict';
//calling express module
const express = require('express');

//body parser setup
const bodyParser = require('body-parser');
// setting up dependencies
const cors = require('cors');
//logger dependencies
const morgan = require('morgan');
const logger = require('winston');
//configuration dependencies
var config = require('nconf');

// the app var
var app;


// initiating server
var start = function(cb){
    'use strict';
    //configure express
     app = express();
     //configures morgan
     app.use(morgan('common'));
     // configure restapi dependencie
     app.use(bodyParser.urlencoded({extended: true}));
     app.use(bodyParser.json({type: '*/*'}));
     //configure cors dependency
     app.use(cors());

     logger.info('[Server] Intializing routes, hold on please ...');
     // routing configuration
     require('../../app/routes/index')(app);
     var router = express.Router();
     app.use('/',router);
     //injects separate file for routes
     require('../../app/routes/user')(router);

     // catching exceptions
     app.use(function(err, req,res,next){

        res.status(err.status || 500);
        res.json({
            message: err.message,
            error:(app.get('env')=== 'development' ? err:{})
        });
        next(err);
     });
     //server listening, port is gathered form .env file
     app.listen(config.get('NODE_PORT'));
     logger.info('[Server] Listening on port '+config.get('NODE_PORT'));
     if(cb){
         return cb;
     }

};
module.exports = start;