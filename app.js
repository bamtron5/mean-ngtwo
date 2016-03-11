
var keys = require('./admin/keys.js');
/* if you want this to work this is the only way in */

var express = require('express');
var app = express();
var colors = require('colors');
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
var mongoConnect = require('./admin/mongoConnect.js');
var acl = require('acl');
var permission = new acl(new acl.mongodbBackend(mongoose.connection.db));
var checkAcl = require('./admin/acl.js');

//cookie proxy channel
app.set('trust proxy', 1);

app.use(cookieSession({
  name: 'claimBook',
  keys: ['auth', 'name', 'role']
}));

//set api permissions here
mongoose.connection.on('connected', function () {

  //user
  permission.allow('user', 'todos', ['get', 'post', 'put', 'delete']);
  permission.allow('user', 'users', ['getById']);
  permission.allow('user', 'profile', ['getProfile']);
  permission.allow('user', 'claim', ['postClaim','updateClaim','deleteClaim'])

  //admin
  permission.allow('admin', 'claim', '*');
  permission.allow('admin', 'todos', '*');
  permission.allow('admin', 'users', '*');
  permission.allow('admin', 'profile', '*');

  //((what mongo models are available))
  console.log('Mongoose connected! Mongo collections:'.yellow);
  console.log('_____________________________');
  console.log(JSON.stringify(Object.keys(mongoConnect.connections[0].collections), null, 3).cyan);
  console.log('_____________________________');
});

var env = app.get('env');
process.env.NODE_ENV = env;

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwtSecret = keys.jwtSecret;
var engine = require('ejs-locals');

//dev only settings
if (env === 'development') {
  console.log('\n\n\n  -- DEV ENV --  \n\n'.red);
  //rake up and down test data
  var seed = require('./dist/routes/seeds/index.js');
  //access to app source code for dev inspection
  app.use('/src/app', express.static(__dirname + '/src/app/'));
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
var routes = require('./dist/routes/index');
var users = require('./dist/routes/users');
var todo = require('./dist/routes/todo');
var login = require('./dist/routes/login');
var auth = require('./dist/routes/auth');
var logout = require('./dist/routes/logout');
var signup = require('./dist/routes/signup');
var verify = require('./dist/routes/verify');
var profile = require('./dist/routes/profile');
var claim = require('./dist/routes/claim');

//static paths
app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use('/bower_components', express.static(__dirname + '/bower_components/'));
app.use('/dist/app', express.static(__dirname + '/dist/app/'));
app.use('/semantic', express.static(__dirname + '/semantic'));

//view routes
app.use('/', routes);

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//***
/*  /api/users  */
//***

app.get('/api/users', checkAcl('users', 'getList'), users.getUsers);
app.get('/api/users/:id', checkAcl('users', 'getById'), users.getUserById);
app.put('/api/users/:id', checkAcl('users', 'put'), users.editUser);
app.delete('/api/users/:id', checkAcl('users', 'delete'), users.deleteUser);

//***
/*  /api/todos  */
//***

app.get('/api/todos', checkAcl('todos', 'get'), todo.getTodos);
app.post('/api/todos', checkAcl('todos', 'post'), todo.postTodo);
app.get('/api/todos/:id', checkAcl('todos', 'get'), todo.getTodoById);
app.put('/api/todos/:id', checkAcl('todos', 'put'), todo.editTodo);
app.delete('/api/todos/:id', checkAcl('todos', 'delete'), todo.deleteTodo);

//***
/*  /api/claims  */
//***
app.get('/api/claim', claim.getClaims);
app.get('/api/claim/:id', claim.getClaimById);
app.post('/api/claim', checkAcl('claim', 'post'), claim.postClaim);
app.put('/api/claim/:id', checkAcl('claim', 'put'), claim.editClaim);
app.delete('/api/claim/:id', checkAcl('claim', 'delete'), claim.deleteClaim);

//***
/*  /api/profile  */
//***
app.get('/api/profile/:id', checkAcl('profile', 'getProfile'), profile.getProfile);

//***
/*  PUBLIC API  */
//***
app.use('/api/signup', signup);
app.use('/api/verify', verify);
app.use('/api/auth', auth);
app.use('/api/login', login);
app.use('/api/logout', logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (env === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;