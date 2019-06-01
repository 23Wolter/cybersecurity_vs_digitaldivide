var express = require('express');
var router = express.Router();
var mailSender = require('../public/javascripts/email_handler');
var fs = require('fs');

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: '6422cf0e',
    apiSecret: 'AwipZDfIMy81UppX'
});



router.get('/', function(req, res, next) {
    res.cookie('user', '', { expires: new Date(0) });

    res.render('index', { title: 'Startpage' });
});



// START OF THE GAME
router.post('/start_game', function(req, res) {

    var email = req.body.email;
    var name = req.body.name;

    var user = {
        email: email,
        name: name,
        success: false
    }
    res.cookie('user', user);

    var html = fs.readFileSync('views/postnord.ejs', 'utf8');
    html = html.replace(/{{ name }}/g, name)
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
    html = html.replace(/{{ name }}/g, name);
    html = html.replace(/{{ email }}/g, email);
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


    var html = fs.readFileSync('views/tilmelding.ejs', 'utf8');
    html = html.replace(/{{ name }}/g, name);
    var image = {
        filename: 'sdu.jpg',
        path: 'public/images/sdu.jpg',
        cid: 'sdu_image' //same cid value as in the html img src
    }

    var mail_data = {
        email: email,
        name: name,
        html: html,
        image: image
    }
    mailSender.sendMail(mail_data);

    res.redirect('game_start');
});





//GAME BRANCH 1
router.get('/tilmelding', function(req, res, next) {
    res.render('tilmelding', { title: 'Tak for tilmeldelse' });
});

router.get('/tilmelding_end', function(req, res, next) {
    res.render('tilmelding_end', { title: 'Postnord End' });
});

router.post('/tilmelding_end', function(req, res) {

    var cookieval = req.cookies.user;
    cookieval.success = true;
    res.cookie('user', cookieval);

    console.log(cookieval);

    res.redirect('create_password');
});


router.get('/game_start', function(req, res, next) {
    res.render('game_start', { title: 'Spillet er igang' });
});





// GAME BRANCH 2
router.get('/postnord', function(req, res, next) {
    res.render('postnord', { title: 'Post Nord' });
});

router.get('/postnord_end', function(req, res, next) {
    res.render('postnord_end', { title: 'Postnord End' });
});

router.post('/postnord_end', function(req, res) {
    var mobile_number = req.body.mobile_number;

    var cookieval = req.cookies.user;
    cookieval.mobile_number = mobile_number;
    res.cookie('user', cookieval);

    console.log(mobile_number);

    const from = 'Nexmo';
    const to = '45' + mobile_number;
    const text = 'Heeey ' + cookieval.name + `. Jeg fandt den her side der kan vise præcis hvad der skete på dato du blev født. 
                Jeg er åbenbart født den samme dag som da vi mistede Kurt Cobain. 
                Prøv det selv her https://cybersecurity-vs-digitaldivide.herokuapp.com/what_happened`;

    nexmo.message.sendSms(from, to, text)


    const from = 'Nexmo';
    const to = '45' + mobile_number;
    const text = 'Hej ' + cookieval.name + `. Jeg kan se du har lagt et nyt billede op på din Facebook 
                https://cybersecurity-vs-digitaldivide.herokuapp.com/social_media.
                Det er et mega godt billede`;

    nexmo.message.sendSms(from, to, text)

    res.redirect('create_password');
});




// GAME BRANCH 3
router.get('/microsoftteam', function(req, res, next) {
    res.render('microsoftteam', { title: 'Microsoft Team' });
});

router.get('/microsoftteam_end', function(req, res, next) {
    res.render('microsoftteam_end', { title: 'Microsoftteam End' });
});

router.post('/microsoftteam_end', function(req, res) {
    var address = req.body.address;

    var cookieval = req.cookies.user;
    cookieval.address = address;
    res.cookie('user', cookieval);

    res.redirect('create_password');
});




//GAME BRANCH 4
router.get('/what_happened', function(req, res, next) {
    res.render('what_happened', { title: 'What Happened' });
});

router.post('/what_happened', function(req, res) {
    var date_of_birth = req.body.date_of_birth;

    var cookieval = req.cookies.user;
    cookieval.date_of_birth = date_of_birth;
    res.cookie('user', cookieval);

    res.redirect('create_password');
});




//GAME BRANCH 5
router.get('/social_media', function(req, res, next) {
    res.render('social_media', { title: 'Facebook' });
});

router.post('/social_media', function(req, res) {
    var pet = req.body.pet;
    var child = req.body.child;

    var image_of = (pet == "" && child != "") ? "child" : "";
    image_of = (child == "" && pet != "") ? "pet" : "";

    var cookieval = req.cookies.user;
    cookieval.image_of = image_of;

    if (image_of == "pet") {
        cookieval.pet = pet;
    } else if (image_of == "child") {
        cookieval.child = child;
    }

    res.cookie('user', cookieval);

    res.redirect('create_password');
});




// GAME BRANCH 1, 2, 3, 4, AND 5 CONNECTS
router.get('/create_password', function(req, res, next) {
    res.render('create_password', { title: 'Opret adgangskode' });
});

router.post('/create_password', function(req, res) {
    var password = req.body.password1;

    var cookieval = req.cookies.user;

    var cookie_password = cookieval.passwords;
    if (!cookie_password) {
        var passwords = [password];
        cookieval.password = passwords;
    } else {
        cookieval.passwords.push(password);
    }

    if (cookieval.success) {
        res.redirect(url.format({
            pathname: '/final_page',
            query: {
                'data': cookieval
            }
        }));
    } else {
        res.redirect('wait_page');
    }
});




router.get('/wait_page', function(req, res, next) {
    res.render('wait_page', { title: 'Waitpage' });
});





router.get('/final_page', function(req, res, next) {

    var cookieval = req.query.data;

    res.render('final_page', {
        title: 'Finalpage',
        data: cookieval
    });
});

module.exports = router;