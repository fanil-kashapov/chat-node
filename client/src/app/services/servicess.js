'use strict';

import TimeAgo from './factories';
import chatSocket from './socket';

var moduleName='chatApp.services';

angular.module(moduleName, [])
   .factory('TimeAgo', new TimeAgo())
   .factory('chatSocket', chatSocket);

export default moduleName;