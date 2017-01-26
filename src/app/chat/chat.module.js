import ChatCtrl from './chat.ctrl';

let moduleName = 'chat.ChatCtrl';

angular.module(moduleName, [])
    .controller('ChatCtrl', ChatCtrl);

ChatCtrl.$inject = ['chatSocket', 'TimeAgo', 'Sounds', 'Filters'];

export default moduleName;