var jwt = require('jsonwebtoken');
var jwtSecret = require('./jwtSecret');

//pass in req.session
var isAuth = function(session, cb){
	jwt.verify(session.auth, jwtSecret, function(err, decoded){
	 	console.log('_____________________________');
		console.log("Session REQ IS" + session.auth);
		if(decoded){
			console.log("SESSION NAME IS " + decoded.name);
			console.log("SESSION IAT IS " + decoded.iat);
		} else {
			console.log("ERR IS " + err);
		}

		if(!decoded || err){
			console.log('false auth');
			console.log('_____________________________');
			return cb(false);
		} else {
			console.log('true auth');
			console.log('_____________________________');
			return cb(true);
		}
	});
}

module.exports = isAuth;