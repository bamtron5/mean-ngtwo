var mongoose     = require('../admin/mongoConnect.js');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('User', UserSchema);