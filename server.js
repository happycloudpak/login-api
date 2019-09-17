var express    = require('express');
var app        = express();
var path       = require('path');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
global.__BASEDIR = __dirname + '/';

// Database
const connStr = process.env.MONGO_DB_LOGIN_API || "mongodb://admin:passw0rd@169.56.164.245:27017/users";
mongoose.Promise = global.Promise;
const options = {
	autoIndex: false, // Don't build indexes
	reconnectTries: 10, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4, // Use IPv4, skip trying IPv6
	useMongoClient: true
};
console.log("->"+connStr);
mongoose.connect(connStr, options);
var db = mongoose.connection;

db.once('openUri', function () {
   console.log('DB connected!');
});

db.on('error', function (err) {
  console.log('DB ERROR:', err);
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  next();
});

// API
app.use('/api/users', require(path.join(__BASEDIR,'api/users')));
app.use('/api/auth', require(path.join(__BASEDIR, '/api/auth')));

// Server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on port:' + port);
});
