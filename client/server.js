// var connect = require('connect');
// var serveStatic = require('serve-static');
// connect().use(serveStatic(__dirname)).listen(3000, function(){
//     console.log('Server running on 8080...');
// });


/**
 * Satellizer Node.js Example
 * (c) 2015 Sahat Yalkabov
 * License: MIT
 */

var qs = require('querystring'),
    http = require('http'),
    bcrypt = require('bcryptjs'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    express = require('express'),
    logger = require('morgan'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    request = require('request');

var app = module.exports.app = express();

app.set('port', process.env.NODE_PORT || 4000);
app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */
var server = http.createServer(app).listen(3000);
