var express = require('express');
var loginCheck = require('../app/login_check');
var request = require('request');
var api = require('../app/api');

var router = express.Router();


router.get('/', loginCheck, function (req, res) {
    api.getProfileName(req.user.id, function (profileName) {
        res.render('music.twig', {
            title: 'Music',
            showNavBar: true,
            name: profileName
        });
    });
});

router.get('/list', function (req, res) {
    if (req.isAuthenticated()) {
        request({
                url: "https://music.bot-chan.com/api/list",
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "apikey": api.key
                },
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    res.render('music_list.twig', {
                        musicList: body
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

router.get('/play_song', loginCheck, function (req, res) {
    api.sendMessage(req, res, "play song " + req.query.song);
});

router.get('/skip_track', loginCheck, function (req, res) {
    api.sendMessage(req, res, "skip song");
});

router.get('/stop_playback', loginCheck, function (req, res) {
    api.sendMessage(req, res, "stop playback");
});


module.exports = router;
