// Dependency
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/socialtext'),
    bodyParser = require('body-parser'),
    session    = require('express-session'),
    router = require('./routes');

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public', { redirect : false }));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'adshlqr3kqwefsadjklqrwefdsbzcjxcq4rewfadshj',
    resave: true,
    saveUninitialized: true
}));

// Routers
var socialTextRouter = express.Router();

// Middleware
var loggedIn = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// URL
app.get('/', router.home);
socialTextRouter.route('/login')
    .get(router.login)
    .post(router.loginUser);
socialTextRouter.route('/user')
    .get(loggedIn, router.user)
    .post(loggedIn, router.createUser);
socialTextRouter.route('/doctor')
    .get(loggedIn, router.doctor);

app.use(socialTextRouter);
app.all('*', loggedIn, function(req, res) {
    res.redirect("/user");
});
// Server Configuration
app.listen(port, function () {
    console.log('Running the APP on PORT: ' + port);
});
