var mongoConnect = require('../../../admin/mongoConnect.js');
var mongoose = mongoConnect;
var Schema = mongoose.Schema;

var SupportSchema   = new Schema({
	claimKey: {type: String, require: true},
    title: {type: String, required: true},
    supportOrDeny: {type: Boolean, required: true}
});

module.exports = mongoose.model('Support', SupportSchema);