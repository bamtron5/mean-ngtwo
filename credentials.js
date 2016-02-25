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
creds.email = 'smtps://email@provider.com:MyPassword123@smtpserver.com';
creds.captcha.PUBLIC_KEY = 'your captcha public key';
creds.captcha.PRIVATE_KEY = 'your captcha private key';
creds.jwt = 'a token string of some sort';

creds.save(function(err){
	if(err){
		console.log(err);
	}
});