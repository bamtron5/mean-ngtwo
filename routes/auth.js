var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtSecret = require('../admin/jwtSecret');


router.route('/')
    // get the auth with that id (accessed at GET root/api/auth)
    .get(function(req,res){
        var auth = req.session.auth;
        jwt.verify(auth, jwtSecret, function(err, decoded){
            if(err || !decoded){
                res.json({auth:false});
            } else {
                res.json({auth:true});
            }
        });
    });

module.exports = router;
