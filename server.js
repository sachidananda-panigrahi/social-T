// Dependency
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/socialtext'),
    bodyParser = require('body-parser'),
    router = require('./routes'),
    socialtextRouter = express.Router();

// Configuration
app.use(bodyParser.json());
app.use(socialtextRouter);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

// Routers
socialtextRouter.route('/').get(router.login);

// Server Configuration
app.listen(port, function () {
    console.log('Running the APP on PORT: ' + port);
});
