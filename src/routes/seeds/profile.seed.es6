var Profile = require('../models/profile');

Profile.remove({}, function(err){
	if(err){
		console.log(err);
	}
});

//new test data declared
var newProfile = [
	new Profile({
		'name':'Flip'
	}),
	new Profile({
		'name':'bamtron5'
	})
];

for(var i=0; i < newProfile.length; i++){
	newProfile[i].save(function(err){
		if(err){
			console.log(err);
			throw err;
		} 
	});
}