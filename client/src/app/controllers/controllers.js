'use strict';

import ChatCtrl from './chatCtrl';
import AuthCtrl from './authCtrl';

var moduleName = 'chatApp.controllers';

angular.module(moduleName, [])
    .controller('AuthCtrl', new AuthCtrl())
    .controller('ChatCtrl', new ChatCtrl());

export default moduleName;