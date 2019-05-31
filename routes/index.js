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

var html = fs.readFileSync('views/postnord.ejs', 'utf8');
console.log(html);
router.post('/start_game', function(req, res) {
    var email = req.body.email;
    var phone_number = req.body.phone_number;

    console.log("input from user: " + email + ", " + phone_number);
    // var msg = mailSender.htmlBuilder(final_score);
    var msg = "Hej med dig";
    mailSender.sendMail(email, html);
    res.redirect('final_page');
});


router.get('/final_page', function(req, res, next) {
    res.render('final_page', { title: 'Finalpage' });
});

router.get('/postnord', function(req, res, next) {
    res.render('postnord', { title: 'Post Nord' });
});

module.exports = router;