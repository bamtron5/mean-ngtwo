var express = require('express');
var router = express.Router();
var isAuth = require('../../admin/isAuth');
var Recaptcha = require('re-captcha');
var keys = require('../../admin/keys');
var recaptcha = new Recaptcha(keys.CAPTCHA_PUBLIC_KEY, keys.CAPTCHA_PRIVATE_KEY, 'https://');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req,res,next){
    isAuth(req.session, function(decoded){
      if(decoded){
        res.redirect('/profile');
      } else {
        res.render('login', {
          locals: {
            title: 'Login Page', 
            recaptcha_form: recaptcha.toHTML()
          }
        });
      }
    });
  }
);

/* GET profile page. */
router.get('/profile', function(req,res,next){
    isAuth(req.session, function(decoded){
      if(decoded){
        res.render('profile');
      } else {
        res.redirect('/login');
      }
    });
  }
);

/* GET todo page. */
router.get('/todo', function(req,res,next){
    isAuth(req.session, function(decoded){
      if(decoded){
        res.render('todo');
      } else {
        res.redirect('/login');
      }
    });
  }
);

router.get('/claim/:id', (req, res, next) => {
  res.render('claim-detail');
});

/* GET test page. */
/* Should be conditioned to only work in dev */
router.get('/test', function(req,res,next){
    if(process.env.NODE_ENV === 'development'){
      res.render('unit-tests');
    } else {
      res.sendStatus(404);
    }
  }
);

router.get('/verify', function(req,res,next){
  res.render('verify');
});

module.exports = router;
