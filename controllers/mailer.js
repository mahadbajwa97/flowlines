const nodemailer = require("nodemailer");
const config = require("../config");
var Mailgun = require('mailgun-js');
var sendgrid = require('sendgrid')('azure_3d95a80d87700eb5234ed1af36865832@azure.com', 'QWErtyuiop46');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const mailjet = require('node-mailjet').connect('419ddf082de99b9a566f2586d398680d', '7fab9a64b6174a11c81ee44773d6dc4b');

exports.Mail_1 = function (to_, fullName, code) {

    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [{
                "From": {
                    "Email": "mahadbajwa97@gmail.com",
                    "Name": "Team Flowlines"
                },
                "To": [{
                    "Email": "mahadbajwa97@gmail.com",
                    "Name": fullName
                }],
                "Subject": "Please verify",
                "HTMLPart": "html: 'Dear " + fullName + ",<br/> Please Verify your email to enjoy using the app: <br/> <a href='https://flowlines-server.herokuapp.com/verify/'" + code + "'>Click me</a>"
            }]
        })
    request
        .then((result) => {
            console.log("1"+result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:
    {
        user: 'mahadbajwa97@gmail.com',
        pass: 'qwertyuiop46'
    }
});


exports.Mail = function (fullName, email, code) {
    var mailOptions = {
        from: 'mahadbajwa97@gmail.com',
        to: email,
        subject: 'Verification Email',
        html: '<h2>Dear ' + fullName + ',/n Welcome to Flowlines/n Please verify your email by clicking on the link below'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);

        }
    });
}
