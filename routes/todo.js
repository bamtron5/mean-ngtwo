var todoModel = require('./models/todo');

var todoMethods = {
    getTodos:function(req, res, next){
        /*always at the top to return next or 403*/
        todoModel.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    },
    
    postTodo:function(req, res, next){
        /*always at the top to return next or 403*/
        var newtodo = new todoModel();
        newtodo.name = req.body.name;
        newtodo.save(function(err, todo){
            if (err)
                res.send(err);
            res.json(todo);
            res.end();
        });
    },

    getTodoById:function(req, res, next){
        todoModel.findById(req.params.id, function(err, todo) {
            if (err)
                res.send(err);
            res.json(todo);
        })
    },

   editTodo:function(req, res, next){
        todoModel.findById(req.params.id, function(err, oldtodo) {
            (oldtodo === null) ? res.sendStatus(204) : null;

            if (err){
                res.send(err);
            }

            oldtodo.name = req.query.name;  //or body.name  header issues

            oldtodo.save(function(err, newtodo){
                if(!err){
                    res.json(newtodo);
                } else{
                    res.send(err);
                }
            });
        })
    },

    deleteTodo:function(req, res, next){
        todoModel.findById(req.params.id, function(err, todo){
            if(err){
                res.send(err);
            }

            todoModel.remove({_id: req.params.id}, function(err, todo){
                if(err){
                    res.send(err);
                } else {
                    res.json({message: 'Deleted'})
                }
            });
        })
    }
}

module.exports = todoMethods;