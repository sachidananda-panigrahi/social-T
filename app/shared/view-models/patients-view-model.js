"use strict";
// Required
var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function patients() {
    this.patientList = [];

}

patients.prototype.getPatientList = function () {
    var promiseModule = new Promise(function(resolve, reject){
        fetchModule.fetch(config.apiUrl)
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                resolve(data);
            });
    });

    return promiseModule;
};

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}


module.exports = patients;