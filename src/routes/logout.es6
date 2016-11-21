var express = require('express');
var router = express.Router();

router.route('/')
  // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
  .post(function(req, res) {
    if(req.session){
      req.session = null;
      res.status(200).json({loggedOut:true}); //look this one up
      res.end();
    } else {
      console.log('session error on logout.');
      console.log(req.session);
      res.status(400).json({loggedOut:false}); //look this one up
      res.end();
    }
  });

module.exports = router;
