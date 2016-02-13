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
            console.log(req.body);
            if(err){
                res.send(err);
            }

            if(!user){
                var newUser = new userModel({
                    'name':req.body.name,
                    'password':req.body.password
                });

                newUser.save(function(){
                    if(err){
                        res.status(400).json({signup:false,message:"Sign up failed."});
                    }
                });

                var token = jwt.sign({name: req.body.name}, jwtSecret);
                //set cookie
                req.sessionOptions.maxAge = 1440000;
                req.sessionOptions.httpOnly = true;
                req.session.auth = token;
                req.session.name = req.body.name;
                console.log(req.body.name + ' has connnected as \n\n');
                console.log(req.session);
                console.log('\n\n');
                res.cookie('claimBook', {jwt: token}, { maxAge: 1440000, httpOnly: true });
                res.cookie('name', req.body.name, {maxAge: 1440000, httpOnly: true});
                res.status(200).json({signup:true});
                res.end();
            } else {
                res.status(400).json({signup:false,message:"This user name already exists"});
            }
        });
    });

module.exports = router;
