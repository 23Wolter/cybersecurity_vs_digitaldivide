var express = require('express');
var router = express.Router();
var mailSender = require('../public/javascripts/email_handler');
var fs = require('fs');

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: '6422cf0e',
    apiSecret: 'AwipZDfIMy81UppX'
});

const from = 'Nexmo'
const to = '4552309059'
const text = 'Hej den her SMS er sendt fra mit projekt :D'

// nexmo.message.sendSms(from, to, text)


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Startpage' });
});




router.post('/start_game', function(req, res) {
    var email = req.body.email;
    var name = req.body.name;

    var html = fs.readFileSync('views/postnord.ejs', 'utf8');
    var image = {
        filename: 'postnord.jpg',
        path: 'public/images/postnord.jpg',
        cid: 'postnord_image' //same cid value as in the html img src
    }

    var mail_data = {
        email: email,
        name: name,
        html: html,
        image: image
    }
    mailSender.sendMail(mail_data);


    var html = fs.readFileSync('views/microsoftteam.ejs', 'utf8');
    var image = {
        filename: 'microsoft.jpg',
        path: 'public/images/microsoft.jpg',
        cid: 'microsoft_image' //same cid value as in the html img src
    }

    var mail_data = {
        email: email,
        name: name,
        html: html,
        image: image
    }
    mailSender.sendMail(mail_data);

    res.redirect('final_page');
});




router.get('/final_page', function(req, res, next) {
    res.render('final_page', { title: 'Finalpage' });
});



router.get('/postnord', function(req, res, next) {
    res.render('postnord', { title: 'Post Nord' });
});


router.get('/microsoftteam', function(req, res, next) {
    res.render('microsoftteam', { title: 'Microsoft Team' });
});

module.exports = router;