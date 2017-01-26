export default class GeolocationController {
    constructor ($scope, $state, $window, $timeout) {
        this._$scope = $scope; 
        this._$state = $state;
        this._$window = $window;
        this._$timeout = $timeout;
        this.init();
    }

    init () {
        this._$timeout(() => {
            navigator.geolocation.getCurrentPosition((position) => {
                this.speed = position.coords.speed;
                this.init();
            });
        }, 400);
    }
}