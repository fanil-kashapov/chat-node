'use strict';

import ChatCtrl from './chatCtrl';
import AuthCtrl from './authCtrl';
import ImgPopupCtrl from './imgPopupCtrl';

var moduleName = 'chat.Controllers';

angular.module(moduleName, [])
    .controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$auth', '$location'];

angular.module(moduleName)
    .controller('ChatCtrl', ChatCtrl);

ChatCtrl.$inject = ['chatSocket', 'TimeAgo', 'Sounds', 'Filters'];

angular.module(moduleName)
    .controller('ImgPopupCtrl', ImgPopupCtrl);

ImgPopupCtrl.$inject = ['$uibModalInstance', 'img'];

export default moduleName;