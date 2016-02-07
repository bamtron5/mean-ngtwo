var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('../admin/mongoConnect.js');
var userModel = require('../models/users');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../admin/jwtSecret');


router.route('/')
    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .post(function(req, res) {
        userModel.findOne({name:req.body.name}).select('+password').exec(function(err, user){
            if(err)
                res.send(err);
            if(user){
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err) 
                        throw err;
                    if(!isMatch)
                        res.json({message:"Your login is not valid, please try again"});
                        console.log('Password:', isMatch);

                    console.log('Password:', isMatch);
                    //do jwt here
                    var token = jwt.sign({name: req.body.name}, jwtSecret);

                    //set cookie to bearer = token here

                    res.status(200).json(token);
                });
            } else {
                res.json({message:"Your login is not valid, please try again"});
            }
        });
    });

module.exports = router;
