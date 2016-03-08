var mongoConnect = require('../../../admin/mongoConnect.js');
var mongoose = mongoConnect;
var Schema = mongoose.Schema;

var ProfileSchema   = new Schema({
    name: {type: String},
    avatar: {type: String}
});

module.exports = mongoose.model('Profile', ProfileSchema);