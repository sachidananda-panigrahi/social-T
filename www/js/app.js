// Ionic socialText App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'socialText' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'socialText.services' is found in services.js
// 'socialText.controllers' is found in controllers.js
angular.module('socialText', ['ionic', 'ngCordova', 'socialText.controllers', 'socialText.services', 'socialText.constant', 'ionic-native-transitions'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider, $ionicNativeTransitionsProvider) {

    $ionicConfigProvider.tabs.position("bottom");
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $ionicConfigProvider.views.swipeBackEnabled(false);

    $ionicNativeTransitionsProvider.setDefaultOptions({
      duration: 400, // in milliseconds (ms), default 400,
      slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
      iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
      androiddelay: -1, // same as above but for Android, default -1
      winphonedelay: -1, // same as above but for Windows Phone, default -1,
      fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
      fixedPixelsBottom: 0 ,// the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
      triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
      backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
    });
    $ionicNativeTransitionsProvider.setDefaultTransition({
      type: 'flip',
      direction: 'left'
    });
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        controller: 'TabCtrl',
        templateUrl: 'templates/tabs.html'
      })
      // Each tab has its own nav history stack:
      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })
      .state('tab.patients', {
        url: '/patients',
        views: {
          'tab-patients': {
            templateUrl: 'templates/tab-patients.html',
            controller: 'PatientsCtrl'
          }
        }
      })
      .state('tab.photo', {
        url: '/photo',
        views: {
          'tab-more': {
            templateUrl: 'templates/tab-add-photo.html',
            controller: 'PhotoCtrl'
          }
        }
      })
      .state('tab.more', {
        url: '/more',
        views: {
          'tab-more': {
            templateUrl: 'templates/tab-more.html',
            controller: 'MoreCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/patients');

  });
