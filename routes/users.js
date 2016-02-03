var express = require('express');
var router = express.Router();
var user = require('../models/users.js');



/* GET users listing. */
router.route('/')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
      res.send('get send ' + req.params.id);
    })

    // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {
        res.send('put send ' + req.params.id);
    });

router.route('/:id')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
      res.send('get send id ' + req.params.id);
    })

    // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {
        res.send('put send id ' + req.params.id);
    });

module.exports = router;
