import AuthCtrl from './auth.ctrl';

let moduleName = 'chat.AuthCtrl';

angular.module(moduleName, [])
    .controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$auth', '$location'];

export default moduleName;