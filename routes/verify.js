var express = require('express');
var router = express.Router();
var mongoose = require('../admin/mongoConnect.js');
var userModel = require('../models/users');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../admin/jwtSecret');
var nodemailer = require('nodemailer');
//please change this to include your email smtp server
//or equate to null to turn off the email confirmation
var emailSecret = require('../admin/emailSecret2'); 
var verificationModel = require('../models/verification');

router.route('/:token')
    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        verificationModel.findOne({token: req.params.token}).exec(function(err, verification){
        	console.log(verification);
            if(err){
                res.send(err);
            }

            if(req.params.token === null){
            	res.status(200).json({verify: false});
            }

            if(verification){

                userModel.findOne({name: verification.name}, function(err, user){
                	if(!user){
                		console.log(err);
                	} else {
                		user.active = true;
                		user.save(function(err){
                			if(err){
                				console.log(err);
                			}
                		});
                	}
                });

                verification.remove(function(err){
                	if(err){
                		console.log(err);
                	}
                });

                res.status(200).json({verify:true});
                res.end();
            } else {
                res.status(400).json({signup:false,message:"This verification was unsuccessful."});
            }
        });
    });

module.exports = router;
