'use strict';

import ImgPopupCtrl from './img.popup.ctrl';

var moduleName = 'chat.ImgPopupCtrl';

angular.module(moduleName, [])
    .controller('ImgPopupCtrl', ImgPopupCtrl);

ImgPopupCtrl.$inject = ['$uibModalInstance', 'img'];

export default moduleName;