const nodemailer = require("nodemailer");
const config = require("../config");
var Mailgun = require('mailgun-js');
var sendgrid = require('sendgrid')('azure_3d95a80d87700eb5234ed1af36865832@azure.com', 'QWErtyuiop46');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const mailjet = require('node-mailjet').connect('b24873ba358a2ec15f567ca58577d4ff', '7c689b7374a450a32d1fab8a63ad38b1');

exports.Mail_1 = function (to_, fullName, code) {

    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [{
                "From": {
                    "Email": "flowlinesapp@gmail.com",
                    "Name": "Team Flowlines"
                },
                "To": [{
                    "Email": to_,
                    "Name": fullName
                }],
                "Subject" : "[Welcome to Flowlines] - Email Verification",
                "HTMLPart": "<h3> Dear " + fullName + ",<br/> We are glad to welcome you on board our platform. We hope you enjoy your time in this new realm of Social Media.<br/> Please verify your email: <a href=\"https://flowlinesapp.azurewebsites.net/verify/" + code+"\">Click Here to verify</a><br/>Now, Log in and have fun<br/>Kind Regards,<br/>Team Flowlines</h3>"
            }]
        })
    request
        .then((result) => {
            console.log("1" + result.body)
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
