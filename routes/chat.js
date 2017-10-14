var express = require('express');
var loginCheck = require('../app/login_check');
var request = require('request');
var api = require('../app/api');

var router = express.Router();


router.get('/', loginCheck, function (req, res) {
    api.getProfileName(req.user.id, function (profileName) {
        res.render('chat.twig', {
            title: 'Chat',
            showNavBar: true,
            name: profileName
        });
    });
});


router.get('/send_message', loginCheck, function (req, res) {
    api.sendMessage(req, res, req.query.message);
});

router.get('/history', loginCheck, function (req, res) {
    if (req.isAuthenticated()) {
        request({
                url: api.root_url + "messagesForUser?clientID=" + req.user.id + "&platform=SITE-CHAT",
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "apikey": api.key
                },
                body: {
                    "platform": "SITE-CHAT",
                    "matchers": [".*"]
                },
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    res.render('chat_history_list.twig', {
                        chatList: body.reverse()
                    });
                } else {
                    console.log(error)
                }
            }
        );
    } else {
        res.send("");
    }
});


module.exports = router;
