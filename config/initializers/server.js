'use strict';
//calling express module
const express = require('express');

//body parser setup
const bodyParser = require('body-parser');
// setting up dependencies
const cors = require('cors');
const morgan = require('morgan');
const logger = require('winston');
var config = require('nconf');

//let contacts = require('./data');
var app;

// hostname and port configuration
const hostname  = 'localhost';
const port = 3001;


var start = function(cb){
    'use strict';
    //configures express
     app = express();
     app.use(morgan('common'));
     app.use(bodyParser.urlencoded({extended: true}));
     app.use(bodyParser.json({type: '*/*'}));
     app.use(cors());
     logger.info('[Server] Intializing routes, hold on please ...');
     require('../../app/routes/index')(app);
     var router = express.Router();
     app.use('/',router);
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

     app.listen(config.get('NODE_PORT'));
     logger.info('[Server] Listening on port '+config.get('NODE_PORT'));
     if(cb){
         return cb;
     }

};
module.exports = start;