'use strict';

// app.controller('AuthCtrl', function ($scope, $auth, $location) {
//     $scope.authenticate = function(provider) {
//         $auth.authenticate(provider)
//             .then(function(response) {
//                 localStorage.user = angular.toJson(response.data.user);
//                 // Signed in with Google.
//                 $location.path('/');
//             })
//             .catch(function(response) {
//                 // Something went wrong.
//             });
//     };
// });
var moduleName = 'socket.AuthCtrl';

class AuthCtrl {
    constructor ($auth, $location) {
        this.$auth = $auth,
        this.$location = $location;
    }

    authenticate (provider) {
        this.$auth.authenticate(provider)
            .then(function(response) {
                localStorage.user = angular.toJson(response.data.user);
                // Signed in with Google.
                this.$location.path('/');
            })
            .catch(function(response) {
                // Something went wrong.
            });
    }
}

angular.module(moduleName, [])
    .controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$auth', '$location'];

export default moduleName;