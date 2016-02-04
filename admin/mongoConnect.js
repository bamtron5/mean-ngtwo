var mongoose = require('mongoose');

//you should return this by promise
//env dependent
module.exports = mongoose.connect('mongodb://localhost/claimBook');