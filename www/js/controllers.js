'use strict';
angular.module('socialText.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('PlaylistsCtrl', function ($scope, $document, SOCIAL_TEXT_CONS, $ServiceManager, $ionicLoading) {

    $scope.patietnts = {};

    $ServiceManager.setURL(SOCIAL_TEXT_CONS.LOCAL + SOCIAL_TEXT_CONS.PORT + SOCIAL_TEXT_CONS.API.DATA);
    $ServiceManager.setMethod("GET");
    $ServiceManager.setHeader(SOCIAL_TEXT_CONS.HEADER);

    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });

    $ServiceManager.doServiceCall().then(function (res) {
      $scope.patietnts.all = res.data.data;
      $scope.patietnts.new = res.data.data.slice(200,350);
      $scope.patietnts.discharged = res.data.data.slice(10,190);
      $ionicLoading.hide();
    });


    $scope.toggleFilter = false;

  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
