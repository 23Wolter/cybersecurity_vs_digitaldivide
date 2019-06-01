var nodemailer = require('nodemailer');

module.exports = {
    sendMail: function(information, message) {
        //console.log(results);
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'no.reply.own@gmail.com', //vucfyn.diktat.test@gmail.com 
                pass: 'Nielsen777' //Gmailvucfyntest2018
            }
        });

        var mailOptions = {
            from: 'no.reply.own@gmail.com', //vucfyn.diktat.test@gmail.com
            to: information.email,
            subject: 'NO-REPLY',
            // text: message
            html: message,
            attachments: [{
                filename: 'postnord.jpg',
                path: '/public/images/postnord.jpg',
                cid: 'postnord_image' //same cid value as in the html img src
            }]
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log("Mail ERROR");
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}