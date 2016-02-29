var express = require('express');
var app = express();
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
var mongoConnect = require('./admin/mongoConnect.js');
var acl = require('acl');
var permission = new acl(new acl.mongodbBackend(mongoose.connection.db));
var checkAcl = require('./admin/acl.js');

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'claimBook',
    keys: ['auth', 'name','role']
  })
);

//set api permissions here
mongoose.connection.on('connected', function(){
  permission.allow('user', 'todos', ['get','post','put','delete']);
  //Server output
  //((what mongo models are available))
  console.log('Mongoose connected! Mongo collections:');
  console.log('_____________________________');
  console.log(Object.keys(mongoConnect.connections[0].collections));
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
app.get('/api/users', permission.middleware(1, 'user', 'get'), users.getUsers);
app.get('/api/users/:id', users.getUserById);
app.put('/api/users/:id', users.editUser);
app.delete('/api/users/:id', users.deleteUser);

//***
/*  /api/todos  */ 
//***

app.get('/api/todos', checkAcl('todos', 'get'), todo.getTodos);
app.post('/api/todos', checkAcl('todos','post'), todo.postTodo);
app.get('/api/todos/:id', checkAcl('todos','get'), todo.getTodoById)
app.put('/api/todos/:id', checkAcl('todos','put'), todo.editTodo);
app.delete('/api/todos/:id', checkAcl('todos','delete'), todo.deleteTodo);

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