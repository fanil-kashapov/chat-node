import GeolocationController from './geo.ctrl';

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