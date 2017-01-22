var qs = require('querystring'),
    http = require('http'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    express = require('express'),
    logger = require('morgan'),

    moment = require('moment'),

    socket = require('./server/socket.js');

var config = require('./server/config');
var userSchema = require('./server/db/user.schema');
var User = mongoose.model('User', userSchema);

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

var app = module.exports.app = express();

app.set('port', process.env.NODE_PORT || 3000);
app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
    app.use(function(req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}
app.use(express.static(__dirname));






/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */
var server = http.createServer(app).listen(3000),
    io = require('socket.io').listen(server);

io.sockets.on('connection', socket, io);
console.log('Server running on 3000...');