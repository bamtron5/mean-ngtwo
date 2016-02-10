var express = require('express');
var app = express();
var cookieSession = require('cookie-session');

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'claimBook',
    keys: ['auth', 'name']
  })
);

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

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//your POST body settings should be set to Content-Type
//application/x-www-form-urlencoded jsonapplication??
app.use(bodyParser.urlencoded({ extended: false })); 
//set your headers

//((pull in your apis))
var routes = require('./routes/index');
var users = require('./routes/users');
var todo = require('./routes/todo');
var login = require('./routes/login');
var auth = require('./routes/auth');
var logout = require('./routes/logout');

//static paths
app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use('/appBuilt', express.static(__dirname + '/appBuilt/'));

//view routes
app.use('/', routes);

//api routes
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/todos', todo);
app.use('/api/auth', auth);
app.use('/api/logout', logout);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//JWT ONLY
app.use(expressJWT({secret: jwtSecret})
  .unless({
    path:[
      "/api/login",
      "/api/todos",
      "/api/auth"
    ]
  })
);

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
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;