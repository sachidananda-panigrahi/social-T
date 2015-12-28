'use strict';
// Module Installation and Dependency Injection
var app = angular.module('socialTextApp', ['ngRoute', 'ngResource', 'ngMessages', 'LocalStorageModule']);
// Constant
app.constant("SOCIAL_TEXT_CONS", {
    "LOCAL" : "http://localhost:",
    "PORT" : 5000,
    "HEADER" : {
        "Content-Type": "application/json; charset=UTF-8"
    },
    "API" : {
        "LOGIN" : "/login"
    }
});
// Configuration
app.config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {

//    Storage
    localStorageServiceProvider
        .setPrefix('socialTextApp')
        .setStorageType('localStorage')
        .setNotify(true, true);
//    Route
    $routeProvider
        .when('/login', {
            controller: 'loginController',
            templateUrl: 'views/login.html'
        })
        .otherwise({
            redirectTo: '/login'
        });
    $locationProvider.html5Mode(true);
});
