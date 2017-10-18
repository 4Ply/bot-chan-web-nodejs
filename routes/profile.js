var express = require('express');
var loginCheck = require('../app/login_check');
var request = require('request');
var api = require('../app/api');

var router = express.Router();


router.get('/', loginCheck, function (req, res) {
    res.redirect('/profile/edit');
});

router.get('/edit', loginCheck, function (req, res) {
    api.getProfileName(req.user.meta.id, function (profileName) {
        api.getPlatformUserList(req.user.meta.id, function (platformUserList) {
            api.getNodeList(req.user.meta.id, function (nodeList) {
                res.render('profile.twig', {
                    title: 'Profile',
                    showNavBar: true,
                    profileName: profileName,
                    platformUserList: platformUserList,
                    nodeList: nodeList
                });
            });
        });
    });
});

router.get('/update_name', function (req, res) {
    if (req.isAuthenticated()) {
        api.updateProfileName(req.user.meta.id, req.query.name);
        res.send('');
    }
});

router.get('/update_node_status/:node', function (req, res) {
    if (req.isAuthenticated()) {
        var node = req.params.node;
        var enabled = req.query.enabled;

        request({
                url: api.root_url + "/nodeStatus?sender=" + req.user.meta.id + "&node=" + node + "&enabled=" + enabled,
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "apikey": api.key
                },
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log("Node preferences updated");
                } else {
                    console.log(error);
                }
                res.send("")
            }
        );
    } else {
        res.send("")
    }
});


module.exports = router;
