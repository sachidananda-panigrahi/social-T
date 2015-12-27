// Dependency


// All Routers
function Routes() {

}


// Home

Routes.prototype.home = function (req, res) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        if (req.user.role.toLocaleLowerCase() == 'doctor') {
            res.redirect('/doctor');
        } else {
            res.redirect('/user');
        }
    }
};
// Login
Routes.prototype.login = function (req, res) {
    res.render('index');
};

Routes.prototype.loginUser = function (req, res) {
    var user = req.body,
        userController = require('../controllers/user/UserController').UserController;
    userController.getUserByName(user.username).done(function (user) {
        res.status(201);
        res.send(user);
    });
};

// User
Routes.prototype.user = function (req, res) {
    res.render('user');

};

Routes.prototype.createUser = function (req, res) {
    var user = req.body,
        userController = require('../controllers/user/UserController').UserController;

    userController.addUser(user).done(function (createdUser) {
        res.status(201);
        res.send(createdUser);
    });

};
// Doctor

Routes.prototype.doctor = function (req, res) {
    res.render('user');
};
// Exports
module.exports = new Routes();