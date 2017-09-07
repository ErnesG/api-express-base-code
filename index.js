'use strict';
//calling the server
var server = require('./config/initializers/server');
var nconf = require('nconf');
var async = require('async');
const logger= require('winston');

//loads environment variables from .env
require('dotenv').load();
// some configuration
nconf.use('memory');
//loads command line arguments
nconf.argv();
// loads env vars
nconf.env();
//load config file for enviroments
require('./config/environments/'+nconf.get('NODE_ENV'));

logger.info('[APP] starting server initialization');

// Initialize Modules
async.series([
    function initiDbConnection(callback){
        logger.info('phase1');
       callback = require('./config/initializers/database');
       callback.getPool();
      // callback.connectToPool();
    },
    function startServer(callback){
        logger.info('phase2');
        server(callback);
    }],function(err){
        if (err){
            logger.error('[APP] initialization failed ', err);
        }
        else{
            logger.info('[APP] initilized SUCCESSFULLY');
        }
    });




