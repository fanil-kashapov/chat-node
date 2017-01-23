var qs = require('querystring'),
    http = require('http'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    express = require('express'),
    logger = require('morgan'),
    moment = require('moment'),
    socket = require('./server/socket.js'),
    router = require('./server/router.js'),
    config = require('./server/config'),
    userSchema = require('./server/db/user.schema'),
    User = mongoose.model('User', userSchema),
    app = module.exports.app = express();

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

router(app, User);

app.set('port', process.env.NODE_PORT || 3000);
app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// if (app.get('env') === 'production') {
//     app.use(function(req, res, next) {
//         var protocol = req.get('x-forwarded-proto');
//         protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
//     });
// }
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