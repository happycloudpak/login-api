var express    = require('express');
var app        = express();
var path       = require('path');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');

// Database
//let connStr = process.env.MONGO_DB_LOGIN_API || "mongodb://admin:passw0rd@mongodb.169.56.164.245/users";
//let connStr = "mongodb://admin:passw0rd@mongodb.169.56.164.245.nip.io/users";
const connStr = process.env.MONGO_DB_LOGIN_API || "mongodb://admin:passw0rd@169.56.164.254/users";

mongoose.Promise = global.Promise;
mongoose.connect(connStr, {useMongoClient: true});
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
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));

// Server
var port = 3000;
app.listen(port, function(){
  console.log('listening on port:' + port);
});
