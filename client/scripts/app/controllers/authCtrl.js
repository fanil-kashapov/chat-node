'use strict';

app.controller('AuthCtrl', function ($scope, $auth) {
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider);
    };
});