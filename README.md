# NG2 Mean Stack on TypeScript

## Release
Pre-alpha | Dev only. Contribution welcome.

## Run directions
`npm install`

then:
`npm run dev`

##Prereq functional setup
- You will need keys for Google ReCaptcha for Sign Up [https://developers.google.com/recaptcha/docs/start](https://developers.google.com/recaptcha/docs/start)
	- create file admin/keys.js
	- insert: `exports.module = { PUBLIC_KEY: 'your public key', PRIVATE_KEY: 'your private key' }`
- SMTP server for verification emails
	- see admin/emailSecret.js
- Change your admin/jwtSecret.js and don't publish that... like i have.  DEV ONLY

##Package Execution Scripts
- `npm run serve`
- `npm run dev`
- `npm run watch`

## Includes	
* Authentication w/ JsonWebTokens
* Sign up w/ Google ReCaptcha and email verification
* Components:
	- Nav Component
	- Login/Signup Component
	- Todo List Component
	- Profile Component 
* Mongo Seeds (todo model, users model)
* NG Services
* Express API routes
* Static Routing w/ EJS templates
* Jasmine Testing

## Future Support
- Webpack
	- `webpack [config]`
- Heroku Deploy
	- `heroku deploy`
- Travis CI
- Puphet like VM DEV

## Contact
[http://brandonam.com](http://brandonam.com)
