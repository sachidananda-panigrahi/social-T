//Required
var PatientsViewModel = require("../../shared/view-models/patients-view-model");
var Patients = new PatientsViewModel();
var observable = require("data/observable");
var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
var page;


var pageData = new Observable({
    patientList: new ObservableArray(Patients.getPatientList())
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};