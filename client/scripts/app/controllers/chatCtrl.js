'use strict';

app.controller('ChatCtrl', function ($scope, $auth, $location, chatSocket, TimeAgo) {
    if (!$auth.isAuthenticated()) {
        $location.path('singin');
    } 

    var vm = this;
    vm.messages = [];
    vm.user = angular.fromJson(localStorage.user);

    vm.sendMessage = function() {
        var data = {
            message: vm.message,
            user: vm.user,
            date: new Date()
        };
        chatSocket.emit('message', data);
        vm.messages.push(data);
        vm.message = '';
    };

    vm.timeFormater = TimeAgo.timeAgo;

    chatSocket.on('connect', function () {
        chatSocket.on('message', function(data) {
            if (!data.data) {
                return;
            }  
            vm.messages.push(data.data);
        });
    });
});