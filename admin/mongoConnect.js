var mongoose = require('mongoose');
var keys = require('./keys.js');

//env dependent
var mConnect = keys.REMOTE_MONGO_DB;

module.exports = mongoose.connect(mConnect);