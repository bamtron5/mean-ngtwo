var express = require('express');
var router = express.Router();
var mongoose = require('../admin/mongoConnect.js');
var userModel = require('../models/users');
var User = mongoose.model('User', userModel);

/* GET users listing. */
router.route('/')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    })
    .put(function(req, res) {
        User.post('save', function(doc){
            if (err)
                res.send(err);
            res.json(201, doc)
        });
    });

router.route('/:id')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
      User.findById(req.params.id, function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
            res.end();
        })
      })

    // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {
        User.post('save', function(doc){
            if (err)
                res.send(err);
            res.json(201, doc)
        });
    });

module.exports = router;
