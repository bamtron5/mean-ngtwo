var User = require('../models/users');

User.remove({}, function(err){
	if(err){
		console.log(err);
	}
});

//new test data declared
var newUser = [
	new User({
		'name':'Flip',
		'testData':true,
		'email':'brandon@brandonam.com',
		'password':'Password',
		'role':'admin',
		'active':true
	})
];

for(var i=0; i < newUser.length; i++){
	newUser[i].save(function(err){
		if(err){
			return handleError(err);
		} 
	});
}

