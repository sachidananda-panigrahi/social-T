var viewModelModule = require("./drawerModel");
function pageLoaded(args) {
    console.log("Page loaded");
    var page = args.object;
    page.bindingContext = new viewModelModule.GettingStartedViewModel();
}
exports.pageLoaded = pageLoaded;