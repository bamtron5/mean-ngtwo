var mongoose = require('mongoose');
var express = require('express');
var app = express();
var acl = require('acl');

//env dependent
var env = app.get('env');
var mConnect = null;
if(env !== 'development'){
	//use a production mongodb here
	mConnect = 'mongodb://localhost/claimBook';
} else {
	mConnect = 'mongodb://localhost/claimBook';
}


module.exports = mongoose.connect(mConnect);


