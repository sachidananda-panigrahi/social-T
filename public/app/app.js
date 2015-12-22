'use strict';
var app = angular.module('socialtextApp', ['ngRoute', 'ngResource', 'ngMessages', 'LocalStorageModule']);

app.config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {

//    Storage
    localStorageServiceProvider
        .setPrefix('socialtextApp')
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
