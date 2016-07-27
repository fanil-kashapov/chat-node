'use strict';

app.controller('ChatCtrl', function ($scope, $auth, $location) {
    if (!$auth.isAuthenticated()) {
      //  $location.path('singin');
    } 

    $scope.title = 'Hello';
});