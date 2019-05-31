var nodemailer = require('nodemailer');

module.exports = {
    sendMail: function(mailTo, message) {
        //console.log(results);
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'wolter.nielsen@gmail.com', //vucfyn.diktat.test@gmail.com 
                pass: 'StarWars070694' //Gmailvucfyntest2018
            }
        });

        var mailOptions = {
            from: 'wolter.nielsen@gmail.com', //vucfyn.diktat.test@gmail.com
            to: mailTo,
            subject: 'cybersecurity game',
            // text: message
            html: message,
            attachments: [{
                filename: 'postnord.jpg',
                path: 'public/images/postnord.jpg',
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