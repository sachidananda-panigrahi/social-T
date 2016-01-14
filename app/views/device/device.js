//Required
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");

var page;
var pageData = new Observable({
    menuOption: new ObservableArray([{name: "Home", screen: "home"}, {
        name: "Patients",
        screen: "patients"
    }, {name: "Device", screen: "device"}])
});
exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};

exports.showSideDrawer =  function(args) {
    var sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.toggleDrawerState();
};


function listViewItemTap(args) {
    var itemIndex = args.index;
    console.log(itemIndex);
    if(itemIndex == 0){
        var navigationEntry = {
            moduleName: "views/home/home",
            context: pageData,
            animated: true
        };
        frameModule.topmost().navigate(navigationEntry);
    }else if(itemIndex == 1){
        var navigationEntry = {
            moduleName: "views/patients/patients",
            context: pageData,
            animated: true
        };
        frameModule.topmost().navigate(navigationEntry);
    }else if(itemIndex == 2){
        var navigationEntry = {
            moduleName: "views/device/device",
            context: pageData,
            animated: true
        };
        frameModule.topmost().navigate(navigationEntry);
    }
}
exports.listViewItemTap = listViewItemTap;