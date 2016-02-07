var Todo = require('../models/todo');

//move to populator... used to remove test data
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

//move to populator... used to save new test data
for(var i=0; i < newTodo.length; i++){
	newTodo[i].save(function(err){
		if(err){
			return handleError(err);
		} 
	});
}

