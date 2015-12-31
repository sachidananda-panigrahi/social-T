'use strict';
angular.module('socialText.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicNavBarDelegate) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    //Search bar
    var title, definedClass;
    $scope.$watch('ngModel.show', function (showing, oldVal, scope) {
      if (showing !== oldVal) {
        if (showing) {
          if (!definedClass) {
            var numicons = $scope.navElement.children().length;
            angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons' + numicons);
          }

          title = $ionicNavBarDelegate.title();
          $ionicNavBarDelegate.setTitle('');
        } else {
          $ionicNavBarDelegate.setTitle(title);
        }
      } else if (!title) {
        title = $ionicNavBarDelegate.title();
      }
    });

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

  .controller('PlaylistsCtrl', function ($scope, $document) {
    $scope.playlists = [
      {title: 'Reggae', id: 1},
      {title: 'Chill', id: 2},
      {title: 'Dubstep', id: 3},
      {title: 'Indie', id: 4},
      {title: 'Rap', id: 5},
      {title: 'Cowbell', id: 6}
    ];
    $scope.playlists1 = [
      {title: 'Reggae', id: 1},
      {title: 'Chill', id: 2},
      {title: 'Cowbell', id: 6}
    ];
    $scope.playlists2 = [
      {title: 'Reggae', id: 1},
      {title: 'Chill', id: 2}
    ];
    $scope.playlists3 = [
      {title: 'Dubstep', id: 3},
      {title: 'Indie', id: 4},
      {title: 'Rap', id: 5},
      {title: 'Cowbell', id: 6}
    ];
    $scope.toggleFilter = false;

  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
