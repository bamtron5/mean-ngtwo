var mongoose = require('./admin/mongoConnect.js');
var Schema = mongoose.Schema;

var CredSchema = new Schema({
    email: {type: String},
    captcha: {
    	PUBLIC_KEY: String, 
    	PRIVATE_KEY: String
    },
    jwt: {type: String}
});

var CredModel = mongoose.model('Credentials', CredSchema);

var creds = new CredModel();
creds.email = '';
creds.captcha.PUBLIC_KEY = '';
creds.captcha.PRIVATE_KEY = '';
creds.jwt = '';

creds.save(function(err){
	if(err){
		console.log(err);
	}
});