"use strict";
app.controller('loginController', function ($scope, $ServiceManager, SOCIAL_TEXT_CONS, $location) {


    $scope.onSubmit = function(){

        $ServiceManager.setURL(SOCIAL_TEXT_CONS.LOCAL+SOCIAL_TEXT_CONS.PORT+SOCIAL_TEXT_CONS.API.LOGIN);
        $ServiceManager.setMethod("POST");
        $ServiceManager.setHeader(SOCIAL_TEXT_CONS.HEADER);
        $ServiceManager.setData({"username": $scope.user, "password" : $scope.password});
        $ServiceManager.doServiceCall().then(function(res){
            console.log(res);
            $location.path('/');
        });
    }
});
    
