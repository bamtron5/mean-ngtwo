var userModel = require('./models/users');

var users = {
  getUsers:function(req, res){
    userModel.find(function(err, users) {
      if (err)
        res.send(err);
      res.json(users);
    });
  },
  // /api/users/:name
  getUserById:function(req, res){
     userModel.findOne({name:req.params.id}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    }) 
  },

  editUser:function(req, res){
    userModel.findById(req.params.id, function(err, oldUser) {
      if (err){
        res.send(err);
      }

      oldUser.name = req.query.name;  //or body.name  header issues

      oldUser.save(function(err, newUser){
        if(!err){
          res.json(newUser);
        } else{
          res.send(err);
        }
      });
    })
  },

  deleteUser:function(req, res){
    userModel.findById(req.params.id, function(err, user){
      if(err){
        res.send(err);
      }

      userModel.remove({_id: req.params.id}, function(err, user){
        if(err){
          res.send(err);
        } else {
          res.json({message: 'Deleted'})
        }
      });
    })
  }
}

module.exports = users;
