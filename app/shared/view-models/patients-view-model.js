"use strict";
// Required
var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function patients() {
    this.patientList = [];

}

patients.prototype.getPatientList = function () {
    return fetchModule.fetch(config.apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(handleErrors)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            this.patientList = data;
            return this.patients;
        });
};

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}


module.exports = patients;