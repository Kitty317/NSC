var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportlocal = require('passport-local');
var mongoose = require('mongoose');

//register middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'secret_key',
    resave: false,
    saveUninitialized: false
}));

//passport has to be behind the parser
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/utility')); //deal with the css path here

//view engine setup
var engines = require('consolidate');
app.engine('html', engines.hogan);//use the template hogan
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

//passport config
var Account = require('./models/account');
passport.use(new passportlocal.Strategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//connect db
mongoose.connect('mongodb://twang13:wtwcs132@ds147520.mlab.com:47520/login');

//direct to the home page
app.get('/', function(request, response) {
    response.render('index.html', {navRight: "Login"});
});

app.get('/accounts/login', function (request, response) {
    response.render('login.html');
});

//plug the passport into this request
//app.post('/accounts/login', passport.authenticate('local'), function (request, response) {
//    res.redirect('/');
//
//});

app.post('/accounts/register', function (request, response) {
   Account.register(new Account({username : request.body.username, email:request.body.email }), request.body.password, function(error, account) {
       if (error) {
           console.log(error.message);
       }
       passport.authenticate('local')(request, response, function () {
           response.redirect('/');
       })
   });
   // console.log(request.body.username);
});

app.post('/accounts/login', passport.authenticate('local'), function(request, response) {
    response.render('index.html', {navRight: request.body.username});
});

var port = process.env.PORT || 8080;
app.listen(8080, function() {
    console.log("listen to port " + port);
});