var jwt = require('jsonwebtoken');
var keys = require('./keys.js');
var jwtSecret = keys.jwtSecret;
var colors = require('colors');

//pass in req.session
var isAuth = function(session, cb){
	jwt.verify(session.auth, jwtSecret, function(err, decoded){
	 	console.log('\n_____________________________\n');
		console.log("Session REQ IZ " + session.auth + " ".yellow);
		if(decoded){
			console.log("SESSION NAME IZ " + decoded.name + " ".yellow);
			console.log("SESSION IAT IZ " + decoded.iat + " ".yellow);
		} else {
			console.log("ERR IS " + err + " ".red);
		}

		if(!decoded || err){
			console.log('false auth'.red);
			console.log('_____________________________\n');
			return cb(false);
		} else {
			console.log('true auth'.green);
			console.log('_____________________________\n');
			return cb(true);
		}
	});
}

module.exports = isAuth;