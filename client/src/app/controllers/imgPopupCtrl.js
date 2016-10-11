'use strict';

var moduleName = 'socket.ImgPopupCtrl';

class ImgPopupCtrl {
    constructor ($uibModalInstance, img) {
        this._$uibModalInstance = $uibModalInstance;
        this.img = img;
        this.myCroppedImage = '';
    }
}


angular.module(moduleName, [])
    .controller('ImgPopupCtrl', ImgPopupCtrl);

ImgPopupCtrl.$inject = ['$uibModalInstance', 'img'];

export default moduleName;