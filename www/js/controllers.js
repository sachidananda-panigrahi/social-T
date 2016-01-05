angular.module('socialText.controllers', [])

  .controller('TabCtrl', function ($scope, $ionicTabsDelegate) {
    $scope.goForward = function () {
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1) {
        $ionicTabsDelegate.select(selected + 1);
      }
    };

    $scope.goBack = function () {
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1 && selected != 0) {
        $ionicTabsDelegate.select(selected - 1);
      }
    }
  })

  .controller('DashCtrl', function ($scope, $ionicLoading, $cordovaGeolocation) {
    $scope.currentLocation = {};

    /*$ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
*/
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log("getCurrentPosition");
        console.log(lat);
        console.log(long);
        console.log('getCurrentPosition ends');
        $scope.currentLocation.lat = lat;
        $scope.currentLocation.long = long;

      }, function (err) {
        // error
      });


    var watchOptions = {
      timeout: 3000,
      enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function (err) {
        // error
      },
      function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log("watch");
        console.log(lat);
        console.log(long);
        console.log('watch ends');
        $scope.currentLocation.lat = lat;
        $scope.currentLocation.long = long;
        //$ionicLoading.hide();
      });

  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('PatientsCtrl', function ($scope, $document, SOCIAL_TEXT_CONS, $ServiceManager, $ionicLoading) {
    // Declaration
    $scope.patietnts = {};


    $ServiceManager.setURL(SOCIAL_TEXT_CONS.LOCAL + SOCIAL_TEXT_CONS.PORT + SOCIAL_TEXT_CONS.API.DATA);
    $ServiceManager.setMethod("GET");
    $ServiceManager.setHeader(SOCIAL_TEXT_CONS.HEADER);

    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });

    $ServiceManager.doServiceCall().then(function (res) {
      $scope.patietnts.all = res.data.data;
      $scope.patietnts.new = res.data.data.slice(200, 350);
      $scope.patietnts.discharged = res.data.data.slice(10, 190);
      $ionicLoading.hide();
    });

  })
  .controller('MoreCtrl', function ($scope, $ionicModal, $timeout) {
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
  });
