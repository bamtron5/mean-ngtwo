var mongoose     = require('../../admin/mongoConnect.js');
var Schema       = mongoose.Schema;

var VerificationSchema   = new Schema({
    name: {type: String},
    token: {type: String}
});

module.exports = mongoose.model('Verification', VerificationSchema);