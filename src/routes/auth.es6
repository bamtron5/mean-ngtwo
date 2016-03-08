var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var keys = require('../../admin/keys.js');
var jwtSecret = keys.jwtSecret;

router.route('/')
    // get the auth with that id (accessed at GET root/api/auth)
    .get(function(req,res){
        var auth = req.session.auth;
        jwt.verify(auth, jwtSecret, function(err, decoded){
            if(err || !decoded){
                res.json({auth:false, name: null});
            } else {
                var sessionAnswer = {};
                var sessionKeys = Object.keys(req.session);
                var sessionValues = sessionKeys.map(function(val){ sessionAnswer[val] = req.session[val] });
                console.log('_____________________________');
                console.log("who you iz: ");
                console.log(JSON.stringify(sessionAnswer, null, 4));
                console.log('_____________________________');
                res.json({auth:true, name: req.session.name});
            }
        });
    });

module.exports = router;
