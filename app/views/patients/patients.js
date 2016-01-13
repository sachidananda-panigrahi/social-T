//Required
var PatientsViewModel = require("../../shared/view-models/patients-view-model");
var Patients = new PatientsViewModel();
var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
var config = require("../../shared/config");
var animation = require("ui/animation");
var drawerModule = require("nativescript-telerik-ui/sidedrawer");

var page;
var pageData = new Observable({
    newPatients : new ObservableArray([]),
    dischargedPatients : new ObservableArray([]),
    allPatients : new ObservableArray([])
});
pageData.set("isLoading", true);
exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};

Patients.getPatientList().then(function (data) {
    //console.log(data.data);
    var allPatientsListView = page.getViewById("allPatients");
    var dischargedPatientsListView = page.getViewById("dischargedPatients");
    var newPatientsListView = page.getViewById("newPatients");
    pageData.newPatients = new ObservableArray(data.data.slice(0,500));
    pageData.dischargedPatients = new ObservableArray(data.data.slice(501,1000));
    pageData.allPatients = new ObservableArray(data.data);
    pageData.set("isLoading", false);
    allPatientsListView.animate({
        opacity: 1,
        duration: 1000
    });
    dischargedPatientsListView.animate({
        opacity: 1,
        duration: 1000
    });
    newPatientsListView.animate({
        opacity: 1,
        duration: 1000
    });
});

function showSideDrawer(args) {
    console.log("Show SideDrawer tapped.");
    // Show sidedrawer ...
}
exports.showSideDrawer = showSideDrawer;