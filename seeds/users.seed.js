var User = require('../models/users');

//move to populator... used to remove test data
User.remove({}, function(err){
	if(err){
		console.log(err);
	}
});

//new test data declared
var newUser = [
	new User({
		'name':'Flip',
		'testData':true
	}),
	new User({
		'name':'Kev',
		'testData':true
	})
];

//move to populator... used to save new test data
for(var i=0; i < newUser.length; i++){
	newUser[i].save(function(err){
		if(err){
			return handleError(err);
		} 
	});
}

