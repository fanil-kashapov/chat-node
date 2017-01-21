'use strict';

export default class AuthCtrl {
    constructor($auth, $location) {
        this.$auth = $auth,
            this.$location = $location;
    }

    authenticate(provider) {
        var self = this;
        self.$auth.authenticate(provider)
            .then(function(response) {
                localStorage.user = angular.toJson(response.data.user);

                self.$location.path('/');
            })
            .catch(function(response) {
                console.log(response);
            });
    }
}