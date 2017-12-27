var passport = require('passport');
var express = require('express');
require('ejs');
var loginCheck = require('../app/login_check');

var router = express.Router();


var renderWelcome = function (req, res) {
    if (req.isAuthenticated() && req.cookies.redirectTo) {
        const redirectTo = req.cookies.redirectTo;
        res.clearCookie('redirectTo');

        console.log('Redirect to: ' + redirectTo);
        res.redirect(redirectTo);
    } else {
        res.render('welcome.twig', {
            title: "At your service",
            authenticated: req.isAuthenticated()
        });
    }
};

router.get('/', loginCheck, renderWelcome);
router.get('/welcome', renderWelcome);
router.get('/login', renderWelcome);


// route for logging out
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// facebook routes
// twitter routes

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/error'
    }));


module.exports = router;
