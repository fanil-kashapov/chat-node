'use strict';

app.controller('AuthCtrl', function ($scope, $auth, $location) {
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function(response) {
                localStorage.user = angular.toJson(response.data.user);
                // Signed in with Google.
                $location.path('/');
            })
            .catch(function(response) {
                // Something went wrong.
            });
    };
});