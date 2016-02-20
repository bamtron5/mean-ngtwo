var mongoose = require('mongoose');

//env dependent
module.exports = mongoose.connect('mongodb://localhost/claimBook');