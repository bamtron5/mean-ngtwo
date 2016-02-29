var mongoose = require('mongoose');
var express = require('express');
var app = express();
var acl = require('acl');

//env dependent
var env = app.get('env');
var mConnect = null;
if(env !== 'development'){
	mConnect = 'mongodb://heroku_0n5b3krj:hv00uqljiljjuqg1jn37hpv8e@ds049744.mongolab.com:49744/heroku_0n5b3krj';
} else {
	mConnect = 'mongodb://localhost/claimBook';
}


module.exports = mongoose.connect(mConnect);


