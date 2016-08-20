'use strict';

// app.controller('ChatCtrl', function ($scope, $auth, $location, chatSocket, TimeAgo) {
//     if (!$auth.isAuthenticated()) {
//         $location.path('singin');
//     } 

//     var vm = this;
//     vm.messages = [];
//     vm.user = angular.fromJson(localStorage.user);

//     vm.sendMessage = function() {
//         var data = {
//             message: vm.message,
//             user: vm.user,
//             date: new Date()
//         };
//         chatSocket.emit('message', data);
//         vm.messages.push(data);
//         vm.message = '';
//     };

//     vm.timeFormater = TimeAgo.timeAgo;

//     chatSocket.on('connect', function () {
//         chatSocket.on('message', function(data) {
//             if (!data.data) {
//                 return;
//             }  
//             vm.messages.push(data.data);
//         });
//     });
// });

var moduleName = 'socket.ChatCtrl';

class ChatCtrl {
    constructor ($auth, $location, chatSocket, TimeAgo) {
        this.$auth = $auth;
        this.$location = $location;
        this.chatSocket = chatSocket;

        this.messages = [];
        this.user = angular.fromJson(localStorage.user);
        this.timeFormater = TimeAgo.timeAgo;

        this.init();
    }

    init () {
        var self = this;
        self.chatSocket.on('connect', function () {
            self.chatSocket.on('message', function(data) {
                if (!data.data) {
                    return;
                }  
                self.messages.push(data.data);
            });
        });
    }

    sendMessage () {
        var self = this;

        var data = {
            message: self.message,
            user: self.user,
            date: new Date()
        };

        self.chatSocket.emit('message', data);
        self.messages.push(data);
        self.message = '';
    }
}

angular.module(moduleName, [])
    .controller('ChatCtrl', ChatCtrl);

ChatCtrl.$inject = ['$auth', '$location', 'chatSocket', 'TimeAgo'];

export default moduleName;