var express = require('express');
var app = express();
var cookieSession = require('cookie-session');
var db = require('./admin/mongoConnect.js');
var acl = require('acl');
var permission = new acl(new acl.mongodbBackend(db.connection.db, 'acl_'));

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'claimBook',
    keys: ['auth', 'name','role']
  })
);

var env = app.get('env');
process.env.NODE_ENV = env;

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwtSecret = require('./admin/jwtSecret.js');
var engine = require('ejs-locals');

//this should be one time... is this per request??
if(env === 'development'){
  var seed = require('./routes/seeds/index.js');
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
var signup = require('./routes/signup');
var verify = require('./routes/verify');

//static paths
app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use('/appBuilt', express.static(__dirname + '/appBuilt/'));

//view routes
app.use('/', routes);

// view engine setup
app.engine('ejs', engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//***
/*  /api/users  */ 
//***
permission.allow('user', ['/api/users'], ['get']);
app.get('/api/users', permission.middleware(), users.getUsers);
app.get('/api/users/:id', users.getUserById);
app.put('/api/users/:id', users.editUser);
app.delete('/api/users/:id', users.deleteUser);

//***
/*  /api/todos  */ 
//***
app.use('/api/todos', todo);

//***
/*  PUBLIC API  */ 
//***
app.use('/api/signup', signup);
app.use('/api/verify', verify);
app.use('/api/auth', auth);
app.use('/api/login', login);
app.use('/api/logout', logout);

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