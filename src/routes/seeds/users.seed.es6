var User = require('../models/users');
var colors = require('colors');

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
		'email':'adsf@adf.com',
		'password':'Password',
		'role':'admin',
		'active':true
	}),
	new User({
		'name':'bamtron5',
		'testData':true,
		'email':'brandon@brandonam.com',
		'password':'Password',
		'role':'user',
		'active':true
	})
];
 
console.log('\nnew users created'.yellow);
console.log('_____________________________');
newUser.map((user) => {	
	console.log(JSON.stringify(user, null, 3).cyan);	
});
console.log('_____________________________\n');

for(var i=0; i < newUser.length; i++){
	newUser[i].save(function(err){
		if(err){
			console.log(err);
			throw err;
		}
	});
}

