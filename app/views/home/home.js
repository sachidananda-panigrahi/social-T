//Declaration
var PatientsViewModel = require("../../shared/view-models/patients-view-model");
var Patients = new PatientsViewModel();
var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
var config = require("../../shared/config");
var animation = require("ui/animation");
var drawerModule = require("nativescript-telerik-ui/sidedrawer");
var frameModule = require("ui/frame");
var conf = {};
conf.data = 30;
var page;
var pageData = new Observable({
    newPatients : new ObservableArray([]),
    dischargedPatients : new ObservableArray([]),
    allPatients : new ObservableArray([]),
    menuOption: new ObservableArray([])
});

pageData.set("isLoading", true);
exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    Patients.getPatientList(conf).then(function (data) {
        //console.log(data.data);
        var allPatientsListView = page.getViewById("allPatients");
        var dischargedPatientsListView = page.getViewById("dischargedPatients");
        var newPatientsListView = page.getViewById("newPatients");
        pageData.newPatients = new ObservableArray(data.data.slice(0,15));
        pageData.dischargedPatients = new ObservableArray(data.data.slice(16,30));
        pageData.allPatients = new ObservableArray(data.data);
        pageData.menuOption = new ObservableArray([ { name: "Home"}, { name: "Patients"}, { name: "Device"} ]);
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
};

exports.showSideDrawer =  function(args) {
    var sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.toggleDrawerState();
};

exports.home = function(args){
    var navigationEntry = {
        moduleName: "views/home/home",
        context: pageData,
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);
};
exports.patients = function(args){
    var navigationEntry = {
        moduleName: "views/patients/patients",
        context: pageData,
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);
};
exports.device = function(args){
    var navigationEntry = {
        moduleName: "views/device/device",
        context: pageData,
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);
};

function listViewLoadMoreItems(args) {
    pageData.set("isLoading", true);
    Patients.getPatientList(conf).then(function(data){
        pageData.newPatients.push(data.data.slice(0,15));
        pageData.dischargedPatients.push(data.data.slice(16,30));
        pageData.allPatients.push(data.data);
        pageData.set("isLoading", false);
    })
}
exports.listViewLoadMoreItems = listViewLoadMoreItems;