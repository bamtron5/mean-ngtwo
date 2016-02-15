var express = require('express');
var router = express.Router();
var mongoose = require('../admin/mongoConnect.js');
var userModel = require('./models/users');

/* GET users listing. */
router.route('/')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        userModel.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    })
    
    .post(function(req, res) {
        var newUser = new userModel();
        newUser.name = req.body.name;
        newUser.save(function(err, user){
            if (err)
                res.send(err);
            res.json(user);
            res.end();
        });
    });

router.route('/:id')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        userModel.findById(req.params.id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        })
      })

    // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {
        userModel.findById(req.params.id, function(err, oldUser) {
            if (err){
                res.send(err);
            }

            oldUser.name = req.query.name;  //or body.name  header issues

            oldUser.save(function(err, newUser){
                if(!err){
                    res.json(newUser);
                } else{
                    res.send(err);
                }
            });
        })
    })

    .delete(function(req, res){
        userModel.findById(req.params.id, function(err, user){
            if(err){
                res.send(err);
            }

            userModel.remove({_id: req.params.id}, function(err, user){
                if(err){
                    res.send(err);
                } else {
                    res.json({message: 'Deleted'})
                }
            });
        })
    });

module.exports = router;
