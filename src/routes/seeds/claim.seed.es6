var Claim = require('../models/claim');
var Support = require('../models/support');

Claim.remove({}, function(err){
	if(err){
		console.log(err);
	}
});

Support.remove({}, function(err){
	if(err){
		console.log(err);
	}
});

//new test data declared
var newClaim = [
	new Claim({
		'slug':'claim-one',
		'title':'Claim One'
	}),
	new Claim({
		'slug':'claim-two',
		'title':'Claim Two'
	})
];

var newSupport = [
	new Support({
		'claimKey':'Claim One',
		'title':'Support Title One',
		'supportOrDeny': true
	}),
	new Support({
		'claimKey':'Claim Two',
		'title':'Support Title Two',
		'supportOrDeny': false

	})
];

newClaim.map((Claim) => {
	Claim.save(function(err){
		if(err){
			console.log(err);
			throw err;
		} 
	});
});

newSupport.map((Support) => {
	Support.save(function(err){
		if(err){
			console.log(err);
			throw err;
		} 
	});
});


