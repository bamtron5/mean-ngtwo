var express = require('express');
var router = express.Router();
var userModel = require('./models/users');
var verificationModel = require('./models/verification');
var profileModel = require('./models/profile');

router.route('/:token')
    //this endpoint is for users to verify their account by token from the sign up email
    //###
    //  /api/verify/string<token>
    //###
    
    /*
        sign up endpoint. 
        verify account token, 
        make user active, 
        remove verification, 
        instatiate new user
        and send status
    */

    .get(function(req, res, next) {
        verificationModel.findOne({token: req.params.token}).exec(function(err, verification){
            if(err){
                res.send(err);
            }

            if(req.params.token === 'null'){
            	res.status(400).json({verify: false, message:"This verification was unsuccessful."});
                res.end();
            } else if(verification) {

                //if verification was found, make user active
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

                //then remove the verification
                verification.remove(function(err){
                	if(err){
                		console.log(err);
                	}
                });

                userModel.schema.methods.starterKit(next, verification.name, [
                    profileModel
                ]).then(() => {
                    console.log('profileCreated');
                    //send result
                    res.status(200).json({verify:true});
                    res.end();
                }).catch(() => {
                    console.log('profileNotCreated');
                    res.status(400).json({verify:false,message:"This verification was unsuccessful."});
                });


            } else {

                //if verication was not found
                res.status(400).json({verify:false,message:"This verification was unsuccessful."});
            }
        });
    });

module.exports = router;
