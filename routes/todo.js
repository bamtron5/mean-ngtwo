var express = require('express');
var router = express.Router();
var mongoose = require('../admin/mongoConnect.js');
var todoModel = require('./models/todo');

/* GET todos listing. */
router.route('/')

    // get the todo with that id (accessed at GET http://localhost:8080/api/todos/:todo_id)
    .get(function(req, res) {
        todoModel.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    })
    
    .post(function(req, res) {
        var newtodo = new todoModel();
        newtodo.name = req.body.name;
        newtodo.save(function(err, todo){
            if (err)
                res.send(err);
            res.json(todo);
            res.end();
        });
    });

router.route('/:id')

    // get the todo with that id (accessed at GET http://localhost:8080/api/todos/:todo_id)
    .get(function(req, res) {
        todoModel.findById(req.params.id, function(err, todo) {
            if (err)
                res.send(err);
            res.json(todo);
        })
      })

    // update the todo with this id (accessed at PUT http://localhost:8080/api/todos/:todo_id)
    .put(function(req, res) {
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
    })

    .delete(function(req, res){
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
    });

module.exports = router;
