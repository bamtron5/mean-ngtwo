var mongoose     = require('../admin/mongoConnect.js');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    testData: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema);