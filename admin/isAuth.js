var jwt = require('jsonwebtoken');
var jwtSecret = require('./jwtSecret');

//pass in req.session
var isAuth = function(session, cb){
	jwt.verify(session.auth, jwtSecret, function(err, decoded){
		console.log("SESSION AUTH IS " + decoded);
		console.log("ERR IS " + err);
		if(!decoded || err){
			console.log('false auth');
			return cb(false);
		} else {
			console.log('true auth');
			return cb(true);
		}
	});
}

module.exports = isAuth;