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
var verificatonModel = require('../models/verification');

router.route('/')
    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .post(function(req, res) {
        userModel.findOne({name:req.body.name, email:req.body.email}).select('+password').exec(function(err, user){
            console.log(req.body);
            if(err){
                res.send(err);
            }

            if(!user){

                var verifyToken = Math.random().toString(36).substring(7);

                var newUser = new userModel({
                    'name':req.body.name,
                    'password':req.body.password,
                    'email':req.body.email
                });

                var newVerification = new verificatonModel({
                    'name':req.body.name,
                    'token': verifyToken
                });

                var transporter = nodemailer.createTransport(emailSecret);

                var mailOptions = {
                    from: "ClaimBook Verify",
                    to: req.body.email,
                    subject: "Welcome to ClaimBook",
                    html: "<a href='http://localhost:3000/verify?token=" + verifyToken + "'>Verify</a>"
                }

                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);

                    newVerification.save(function(err){
                        if(err){
                            console.log(err);
                        } else {
                            console.log('saved verification');
                            console.log(newVerification);
                        }
                    });
                });

                /*below will be moved to the verification stage*/
                newUser.save(function(){
                    if(err){
                        res.status(400).json({signup:false,message:"Sign up failed."});
                    }
                });

                res.status(200).json({signup:true});
                res.end();
            } else {
                res.status(400).json({signup:false,message:"This user and/or email already exist"});
            }
        });
    });

module.exports = router;
