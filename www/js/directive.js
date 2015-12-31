'use strict';
app.directive('searchBar', [function () {
  return {
    scope: {
      ngModel: '='
    },
    require: ['^ionNavBar', '?ngModel'],
    restrict: 'E',
    replace: true,
    template: '<ion-nav-buttons side="right">' +
    '<div class="searchBar">' +
    '<div class="searchTxt" ng-show="ngModel.show">' +
    '<div class="bgdiv"></div>' +
    '<div class="bgtxt">' +
    '<input type="text" placeholder="Search..." ng-model="productObject.searchAgenda">' +
    '</div>' +
    '</div>' +
    '<i class="button button-clear" ng-class="{\'icon-disabled-opacity\' : showdate}" ng-click="updateSelection();" title="Show all dates">All</i>' +
    '</div>' +
    '</ion-nav-buttons>',

    compile: function (element, attrs) {
      var icon = attrs.icon
        || (ionic.Platform.isAndroid() && 'ion-android-search')
        || (ionic.Platform.isIOS() && 'ion-ios7-search')
        || 'ion-search';
      angular.element(element[0].querySelector('.icon')).addClass(icon);

      return function ($scope, $element, $attrs, ctrls) {
        var navBarCtrl = ctrls[0];
        $scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;

      };
    }

  };
}])
