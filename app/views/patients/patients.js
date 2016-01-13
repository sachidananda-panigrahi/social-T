//Required
var PatientsViewModel = require("../../shared/view-models/patients-view-model");
var Patients = new PatientsViewModel();
var observable = require("data/observable");
var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
var config = require("../../shared/config");
var ImageModule = require("ui/image");

var page;
var pageData = new Observable({
    newPatients : new ObservableArray([]),
    dischargedPatients : new ObservableArray([]),
    allPatients : new ObservableArray([])
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};

Patients.getPatientList().then(function (data) {
    //console.log(data.data);
    pageData.newPatients = new ObservableArray(data.data.slice(0,500));
    pageData.dischargedPatients = new ObservableArray(data.data.slice(501,1000));
    pageData.allPatients = new ObservableArray(data.data);
});