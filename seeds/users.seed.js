var User = require('../models/users');
var newUser = new User({'name':'Flip'});

newUser.save(function(err){
	if(err){
		return handleError(err);
	} 
});

