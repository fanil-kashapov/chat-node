export default class AuthCtrl {
    constructor ($auth, $location) {
        this.$auth = $auth;
        this.$location = $location;
    }

    authenticate (provider) {
        this.$auth.authenticate(provider)
            .then((response) => {
                localStorage.user = angular.toJson(response.data.user);
                // TO CHECK For Chain func
                this.$location.path('/');
            })
            .catch((response) => {
                console.log(response);
            });
    }
}
