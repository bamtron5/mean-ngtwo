const express = require('express');
const router = express.Router();
const userModel = require('./models/users');
const verificatonModel = require('./models/verification');
const sendEmail = require('./script/sendEmail');
const Recaptcha = require('re-captcha');
const keys = require('../admin/keys');
const recaptcha = new Recaptcha(keys.CAPTCHA_PUBLIC_KEY, keys.CAPTCHA_PRIVATE_KEY);

router.route('/')
    .post(function(req, res) {
        let fail = {signup: false, message: "An error has occurred. Please try again."};

        !(req.body.name && req.body.email && req.body.password) ? res.status(202).json(fail) : null;

        userModel.findOne( { $or:[ {'name':req.body.name}, {'email':req.body.email} ]}, function(err, user){
            if(err || user){
                console.log(err);
                fail.message = 'duplicate name or email found.';
                res.status(202).json(fail);
            } else {
                 sendVerfication();
            }
        });

        function sendVerfication(){
            let verifyToken = Math.random().toString(36).substring(7);
            let domain = req.headers.origin;
            let mailOptions = {
                from: "ClaimBook Verify",
                to: req.body.email,
                subject: "Welcome to ClaimBook",
                html: "<a href='" + domain + "/verify?token=" + verifyToken + "'>Verify</a>"
            }

            sendEmail(mailOptions).then((info) => {

                let newVerification = new verificatonModel({
                    'name':req.body.name,
                    'token': verifyToken
                });

                newVerification.save(function(err){
                    if(err){
                        console.log(err);
                        fail.message = 'verification save failed';
                        res.status(202).json(fail);
                        res.end();
                    } else {
                        console.log('saved verification');
                        console.log(newVerification);

                    }
                }).then(() => {
                    saveUser();
                });

            }).catch((info) => {
                console.log(info);
                fail.message = 'bad email.';
                res.status(202).json(fail);
                res.end();
            });
        }

        function saveUser(){
            var newUser = new userModel({
                'name':req.body.name,
                'password':req.body.password,
                'email':req.body.email,
                'role':'user'
            });

            newUser.save(function(err){
                if(err){
                    fail.message = 'new user did not save';
                    res.status(202).json(fail);
                    res.end();
                } else {
                    res.status(200).json({message:"Sign up successful.", signup:true});
                    res.end();
                }
            });   
        }
    });

router.route('/captcha')
    .post(function(req,res){
        let data = {
            response:  req.body.captcha,
            challenge: req.body.challenge,
            remoteip: req.connection.remoteAddress
        };

        recaptcha.verify(data, function(err) {
            if (err) {
                console.log(err);
                res.send({captcha:false, message:"Invalid captcha. Please try again."})
            } else {
                res.send({captcha:true, message:"Valid captcha."});
            }
        });
    });

module.exports = router;
