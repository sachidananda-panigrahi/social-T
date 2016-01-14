var viewModelModule = require("./drawerModel");
var drawerModule = require("nativescript-telerik-ui/sidedrawer");
var frameModule = require("ui/frame");

var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var page;
var pageData = new Observable({
    menuOption: new ObservableArray([{name: "Home", screen: "home"}, {
        name: "Patients",
        screen: "patients"
    }, {name: "Device", screen: "device"}])
});

setDrawerTransition = function (transition) {
    var drawer = frameModule.topmost().getViewById("sideDrawer");
    drawer.drawerTransition = transition;
};


function pageLoaded(args) {
    console.log("Page loaded");
    page = args.object;
    page.bindingContext = new viewModelModule.GettingStartedViewModel();
    page.bindingContext = pageData;
}



//Exports for views
exports.showSideDrawer = showSideDrawer;
exports.pageLoaded = pageLoaded;