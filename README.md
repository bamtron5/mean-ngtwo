# NG2 Mean Stack on TypeScript

[![Build Status](https://travis-ci.org/bamtron5/mean-ngtwo.svg?branch=master)](https://travis-ci.org/bamtron5/mean-ngtwo)

![](https://media.giphy.com/media/xT9DPQvQ4wuYAbCRtC/giphy.gif "")

## Release Notes
Pre-alpha | Dev only. Contribution welcome.  Major release at 1.0.0.

## Heroku Sample
- [Sample App](https://claim-book.herokuapp.com) 
- [How heroku works](https://devcenter.heroku.com/articles/how-heroku-works)

## Run directions
`npm install`

then:
`gulp` & `npm run build` & `npm start` or `npm start --production`

##Prereq functional setup
- see `admin/keys.js`
- overirde these process vars by creates a `.env` file in the root dir

```
jwtSecret: "your jwt secret",
emailSecret: "smtps://email@domain.com:yourpassword@smtpProvider",
CAPTCHA_PUBLIC_KEY: "your jwt secret",
CAPTCHA_PRIVATE_KEY: "your jwt secret",
REMOTE_MONGO_DB: "mongodb://localhost/claimBook"
```

##Package Execution Scripts
- `npm run serve`
- `npm start`
	- `--development` or `--production` env flags
- `npm run test`
- `npm run test:build`
- `npm run watch`
- `npm run debug` requires `npm i -g node-debug`
- `gulp stream` or `gulp` for .es6

## Includes	
* Authentication w/ JsonWebTokens
* Access control list with user roles
* Sign up w/ Google ReCaptcha and email verification
* Components:
	- Nav Component
	- Login/Signup Component w/ email confirmation
	- Todo List Component
	- Profile Component 
* Mongo Seeds (todo model, users model)
* NG Services
* Express API routes
* Static Routing w/ EJS templates
* Jasmine Testing

## Future Support
- Vagrant VM DEV for CI Ubuntu 14.04

## Contact 
[http://brandonam.com](http://brandonam.com)
