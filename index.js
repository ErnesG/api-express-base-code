'use strict';
//injecting server.js
var server = require('./config/initializers/server');
//configuration dependencie
var nconf = require('nconf');
//loading modules dependency
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
   
    function startServer(callback){
        // creates db pool connection
        callback = require('./config/initializers/database');
        callback.getPool();
      
        logger.info('[SERVER] READY, GO --->');
        server(callback);
    }],function(err){
        if (err){
            logger.error('[APP] initialization failed ', err);
        }
        else{
            logger.info('[APP] initilized SUCCESSFULLY');
        }
    });




