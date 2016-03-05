var mongoose = require('mongoose');
var express = require('express');
var app = express();
var acl = require('acl');
var keys = require('./keys.js');

//env dependent
var env = app.get('env');
var mConnect = null;
if(env !== 'development'){
	//use a production mongodb here
	mConnect = process.env[REMOTE_MONGO_DB];
} else {
	mConnect = keys.REMOTE_MONGO_DB;
}

module.exports = mongoose.connect(mConnect);