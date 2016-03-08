var keys = require('../../../admin/keys');
var emailSecret = keys.emailSecret; 
var nodemailer = require('nodemailer'); 
var transporter = nodemailer.createTransport(emailSecret);


 /**
 * Sends an email an email.
 *      var sendEmail = require('sendEmail.js')
 
        var mailOptions = {
            from: "ClaimBook Verify",
            to: req.body.email,
            subject: "Welcome to ClaimBook",
            html: "<a href='" + domain + "/verify?token=" + verifyToken + "'>Verify</a>"
        }

        sendEmail(mailOptions)
  */

var sendEmail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info){
            let res = {
                sent: false,
                valid: null 
            };

            Promise.all([info]).then(() => {
                console.log('Message sent: ' + info.response);
                res.valid = true;
                return resolve(res);
            }).catch(() => {
                console.log(error);
                res.valid = false;
                return reject(res);
            }); 
        }); 
    });
}

module.exports = sendEmail;
