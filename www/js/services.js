"use strict";

angular.module('socialText.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
  .service('InitService', ['$q', function ($q) {
    var d = $q.defer();
    return {
      defer: d,
      promise: d.promise
    };
  }])
  .service('$ServiceManager', function ($http, $q) {
    var d = $q.defer();
    this.method = null;
    this.url = null;
    this.data = null;
    this.dataTypes = null;
    this.header = null;

    //Setter
    this.setURL = function (surl) {
      if (surl) {
        this.url = surl;
      }
    };
    this.setData = function (sdata) {
      if (sdata) {
        this.data = JSON.stringify(sdata);
      }
    };
    this.setMethod = function (smethod) {
      if (smethod) {
        this.method = smethod;
      }
    };
    this.setDataType = function (sDataType) {
      if (sDataType) {
        this.dataTypes = sDataType;
      }
    };
    this.setHeader = function (sheader) {
      if (sheader) {
        this.header = sheader;
      }
    };

    this.doServiceCall = function () {
      var req = {
        method: this.method,
        url: this.url,
        headers: this.header,
        data: this.data
      };

      $http(req).then(function (response) {
        d.resolve(response);
      }, function (response) {
        d.reject(response);
      });

      return d.promise;
    };

  });

