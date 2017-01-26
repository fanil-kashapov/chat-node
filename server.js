var http = require('http'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    express = require('express'),
    logger = require('morgan'),
    
    socket = require('./server/socket.js'),
    router = require('./server/router.js'),
    config = require('./server/config'),
    app = module.exports.app = express();
    

app.set('port', process.env.NODE_PORT || 3000);
app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));
app.use("/",router);
/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */
var server = http.createServer(app).listen(3000),
    io = require('socket.io').listen(server);

io.sockets.on('connection', socket, io);
console.log('Server running on 3000...');