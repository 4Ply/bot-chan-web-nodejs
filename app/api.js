var request = require('request');

var rootUrl = "https://app2.bot-chan.com/api";
var key = process.env.BOT_CHAN_API_KEY_WEB;


exports.root_url = rootUrl;
exports.key = key;

exports.sendMessage = function (req, res, message) {
    request({
            url: this.root_url + "/message",
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "apikey": this.key
            },
            body: {
                "message": message,
                "sender": req.user.id,
                "direct": true
            },
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.send("Success");
            } else {
                console.log("Send Message Error: (" + response.statusCode + ") " + error);
                res.send("Error");
            }
        }
    );
};

exports.getProfileName = function (id, done) {
    request({
            url: this.root_url + "/name?sender=" + id,
            method: "GET",
            headers: {
                "content-type": "application/json",
                "apikey": this.key
            },
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Username: " + body);
                done(body);
            } else {
                console.log("Username Error: (" + response.statusCode + ") " + error);
            }
        }
    );
};

exports.updateProfileName = function (id, name) {
    request({
            url: this.root_url + "/name?name=" + name + "&sender=" + id,
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "apikey": this.key
            },
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Name update: " + body);
            } else {
                console.log(error);
            }
        }
    );
};

exports.getNodeList = function (id, done) {
    request({
            url: this.root_url + "/nodes?sender=" + id,
            method: "GET",
            headers: {
                "content-type": "application/json",
                "apikey": this.key
            },
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Node List: " + body);
                done(body);
            } else {
                console.log("Node List Error: (" + response.statusCode + ") " + error);
                done([]);
            }
        }
    );
};

exports.getPlatformUserList = function (id, done) {
    request({
            url: this.root_url + "/platformUsers?clientID=" + id,
            method: "GET",
            headers: {
                "content-type": "application/json",
                "apikey": this.key
            },
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Platform User List: " + body);
                done(body);
            } else {
                console.log("Platform User List Error: (" + response.statusCode + ") " + error);
                done([]);
            }
        }
    );
};
