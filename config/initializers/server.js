'use strict';
//calling express module
const express = require('express');
//init app

let contacts = require('./data');
// using our other depedencies on our express app

// hostname and port configuration
const hostname  = 'localhost';
const port = 3001;

var start = function(cb){
    'use strict';
    const app = express();
    
    //body parser setup
    const bodyParser = require('body-parser');
    // setting up Cors packages
    const cors = require('cors');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());
    


}