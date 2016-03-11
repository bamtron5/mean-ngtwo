var claimModel = require('./models/claim');

var claims = {
    getClaims:function(req, res){
        claimModel.find(function(err, claims) {
            if (err)
                res.send(err);
            res.json(claims);
        });
    },
    postClaim:function(req, res, next){
        /*always at the top to return next or 403*/
        var newClaim = new claimModel();
        newClaim.name = req.body.name;
        newClaim.save(function(err, claim){
            if (err)
                res.send(err);
            res.json(claim);
            res.end();
        });
    },
    // /api/claims/:name
    getClaimById:function(req, res){
       claimModel.findOne({slug:req.params.id}, function(err, claim) {
            if (err)
                res.send(err);
            res.json(claim);
        }) 
    },

    editClaim:function(req, res){
        claimModel.findById(req.params.id, function(err, oldclaim) {
            if (err){
                res.send(err);
            }

            oldClaim.name = req.query.name;  //or body.name  header issues

            oldClaim.save(function(err, newclaim){
                if(!err){
                    res.json(newclaim);
                } else{
                    res.send(err);
                }
            });
        })
    },

    deleteClaim:function(req, res){
        claimModel.findById(req.params.id, function(err, claim){
            if(err){
                res.send(err);
            }

            claimModel.remove({_id: req.params.id}, function(err, claim){
                if(err){
                    res.send(err);
                } else {
                    res.json({message: 'Deleted'})
                }
            });
        })
    }
}

module.exports = claims;