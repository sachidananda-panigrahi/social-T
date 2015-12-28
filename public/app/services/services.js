"use strict";
app.service('InitService', ['$q', function ($q) {
    var d = $q.defer();
    return {
        defer: d,
        promise: d.promise
    };
    }]).service('$ServiceManager', function ($http, $q) {
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