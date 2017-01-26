import ImgApiController from './img.api.ctrl';

ImgApiController.$inject = ['$scope', '$state', '$window', '$uibModal'];

export default class ImgApi {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.controller = ImgApiController;
        this.controllerAs = 'fooz';
        this.bindToController = true;
        this.templateUrl = 'src/app/imgapi/img.api.tpl.html';
    }
}