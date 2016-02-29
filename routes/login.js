var express = require('express');
var router = express.Router();
var userModel = require('./models/users');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../admin/jwtSecret');
var mongoose = require('mongoose');
var acl = require('acl');
var permission = new acl(new acl.mongodbBackend(mongoose.connection.db));

router.route('/')
    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .post(function(req, res) {
        userModel.findOne({name:req.body.name}).select('+password').exec(function(err, user){
            console.log('_____________________________');
            console.log('login attempt');
            console.log('_____________________________');
            if(err){
                res.send(err);
            }

            if(user && user.active === true){
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err) {
                        console.log(err);
                        res.end();
                    }

                    if(!isMatch){
                        console.log('Password:', isMatch);
                        res.status(200).json({login:false,message:"Your login is not valid, please try again"});
                    } else {
                        console.log('Password:', isMatch);
                        //do jwt here
                        var token = jwt.sign({name: req.body.name}, jwtSecret);
                        //set cookie
                        req.sessionOptions.maxAge = 1440000;
                        req.sessionOptions.httpOnly = true;
                        req.session.auth = token;
                        req.session.name = req.body.name;
                        req.session.userId = req.body.name;
                        req.session.role = user.role;
                        console.log(req.body.name + ' has connnected as \n\n');
                        console.log(JSON.stringify(req.session, null, 4));
                        console.log('\n\n');
                        res.cookie('claimBook', {jwt: token}, { maxAge: 1440000, httpOnly: true });
                        res.cookie('name', req.body.name, {maxAge: 1440000, httpOnly: true});
                        permission.addUserRoles(req.body.name, user.role, function(){
                            console.log(req.body.name + ' added as ' + user.role + ' to acl.');
                        });
                        res.status(200).json({login:true});
                        res.end();
                    }
                });
            } else {
                res.status(200).json({login:false,message:"Your login is not valid, please try again"});
            }
        });
    });

module.exports = router;
