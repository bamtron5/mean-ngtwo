# NG2 Mean Stack on TypeScript

[![Build Status](https://travis-ci.org/bamtron5/mean-ngtwo.svg?branch=master)](https://travis-ci.org/bamtron5/mean-ngtwo)

![](https://media.giphy.com/media/xT9DPQvQ4wuYAbCRtC/giphy.gif "")

## Release Notes
Pre-alpha | Dev only. Contribution welcome.  Major release at 1.0.0.

<!-- ## Heroku Sample
[https://serene-stream-25390.herokuapp.com](https://serene-stream-25390.herokuapp.com) 
[https://devcenter.heroku.com/articles/how-heroku-works](How heroku works)
-->

## Run directions
`npm install`

then:
`gulp` & `npm run build` & `npm run serve`

##Prereq functional setup
- see `admin/keys.js`
- You will need keys for Google ReCaptcha for Sign Up [https://developers.google.com/recaptcha/docs/start](https://developers.google.com/recaptcha/docs/start)
- SMTP server for verification emails
- MongoDB connection string

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