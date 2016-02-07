var express = require('express');
var app = express();
var env = app.get('env');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./admin/mongoConnect.js');
var expressJWT = require('express-jwt');
var jwtSecret = require('./admin/jwtSecret');
var router = express.Router(); 

if(env === 'development'){
  var seed = require('./seeds/index.js');
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

//your POST body settings should be set to Content-Type
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
//set your headers foo

//((pull in your apis))
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

//static paths
app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use('/appBuilt', express.static(__dirname + '/appBuilt/'));

//view routes
app.use('/', routes);

//api routes
app.use('/api/users', users);
app.use('/api/login', login);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//JWT ONLY
app.use(expressJWT({secret: jwtSecret})
  .unless({
    path:[
      "/api/login",
      "/api/users"
    ]
  })
);

app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Server output
//((what mongo models are available))
console.log('Mongo collections:');
console.log(Object.keys(db.connections[0].collections));

// error handlers
// development error handler
// will print stacktrace
if (env === 'development') {
  app.use(function(err, req, res, next) {

    if(req.cookies === undefined || req.cookies.claimBook === undefined){
      //3 days
      //todo - domain specific
      //secure cookie
      var randomNumber=Math.random().toString();
      randomNumber=randomNumber.substring(2,randomNumber.length);
      res.cookie('claimBook',randomNumber, { maxAge: 1440000, httpOnly: true });
    }

    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  if(req.cookies === undefined || req.cookies.claimBook === undefined){
    //3 days
    //todo - domain specific
    //secure cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('claimBook',randomNumber, { maxAge: 1440000, httpOnly: true });
  }

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;