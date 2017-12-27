var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var minify = require('express-minify');
var minifyHTML = require('express-minify-html');
var compression = require('compression');

var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var configDB = require('./config/database');
mongoose.connect(configDB.url); // connect to our database


var users = require('./routes/users');
var auth = require('./routes/auth');
var music = require('./routes/music');
var chat = require('./routes/chat');
var replies = require('./routes/replies');
var profile = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /static
//app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// required for passport
app.use(session({
    secret: process.env.NODE_SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport);

app.use(compression());
app.use(minify());
app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', auth);
app.use('/users', users);
app.use('/music', music);
app.use('/chat', chat);
app.use('/replies', replies);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.title = "Error";
    res.locals.showNavBar = true;

    res.locals.message1 = req.app.get('env') === 'development' ? err.message : 'Oh no!';
    res.locals.message2 = req.app.get('env') === 'development' ? '' : 'Something broke. Please try again, <a href="mailto:support@bot-chan.com?Subject=Bot-chan%20website%20error" target="_blank">Or contact a human</a>';
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
