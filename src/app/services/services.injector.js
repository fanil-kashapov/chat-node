import time from './time';
import sound from './sound';
import socket from './socket';

var moduleName = 'chatApp.servicess';
angular.module(moduleName, []);

angular.module(moduleName)
    .factory('TimeAgo', time.TimeAgoFactory);

angular.module(moduleName)
    .factory('Sounds', sound.SoundsFactory);

angular.module(moduleName)
    .factory('chatSocket', socket.chatSocketFactory);
socket.chatSocketFactory.$inject = ['socketFactory'];

export default moduleName;
