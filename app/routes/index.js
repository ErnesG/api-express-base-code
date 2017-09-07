var changeCase = require('change-case');
var express = require('express');
var routes = require('require-dir')();
// this router index just parses every defined route to lowercase

module.exports = function(app){
    'use strict';
    //init every route
    Object.keys(routes).forEach(function(routeName){
        var router = express.Router();
        //on this section is a good practice to add middleware
        //inits the route to add its functionality
        require('./'+routeName)(router);
        // adding router to the specified name in the app
        app.use('/'+ changeCase.paramCase(routeName), router);


    });

};
