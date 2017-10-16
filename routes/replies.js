var express = require('express');
var loginCheck = require('../app/login_check');
var request = require('request');
var api = require('../app/api');

var router = express.Router();


router.get('/list', function (req, res) {
    if (req.isAuthenticated()) {
        request({
                url: api.root_url + "autoDeleteRepliesForClientID?clientID=" + req.user.id,
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "apikey": api.key
                },
                body: {
                    "matchers": [".*"]
                },
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    res.render('reply_list.twig', {
                        replyList: body
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
