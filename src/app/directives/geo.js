'use strict';

class GeolocationController {
    constructor ($scope, $state, $window, $timeout) {
        this._$scope = $scope; 
        this._$state = $state;
        this._$window = $window;
        this._$timeout = $timeout;
        this.init();
    }

    init () {
        let self = this;
        self._$timeout(() => {
            navigator.geolocation.getCurrentPosition((position) => {
                self.speed = position.coords.speed;
                self.init();
            });
        }, 400);
    }
}

GeolocationController.$inject = ['$scope', '$state', '$window', '$timeout'];

export default class Geo {
    constructor () {
        this.restrict = 'AE';
        this.replace = true;
        this.controller = GeolocationController;
        this.controllerAs = 'geoLoc';
        this.bindToController = true;
        this.template = '<span>{{geoLoc.speed}}</span>';
    }
}