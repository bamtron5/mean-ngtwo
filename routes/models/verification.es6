var mongoConnect = require('../../admin/mongoConnect.js');
var mongoose = mongoConnect;
var Schema       = mongoose.Schema;

var VerificationSchema   = new Schema({
    name: {type: String},
    token: {type: String}
});

module.exports = mongoose.model('Verification', VerificationSchema);