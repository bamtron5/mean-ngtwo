var profileModel = require('./models/profile');

var profile = {
    getProfile:function(req, res){
        profileModel.findOne({name: req.params.id}, function(err, profileObj) {
            if (err)
                res.send(err);
            res.json(profileObj);
        });
    }
}

module.exports = profile;