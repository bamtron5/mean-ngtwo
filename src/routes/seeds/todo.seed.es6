var Todo = require('../models/todo');

Todo.remove({}, function(err){
	if(err){
		console.log(err);
	}
});

//new test data declared
var newTodo = [
	new Todo({
		'name':'Flip'
	}),
	new Todo({
		'name':'Kev'
	})
];

for(var i=0; i < newTodo.length; i++){
	newTodo[i].save(function(err){
		if(err){
			console.log(err);
			throw err;
		} 
	});
}

