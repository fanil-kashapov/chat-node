'use strict';

var moduleName = 'socket.ChatCtrl';

class ChatCtrl {
    constructor($auth, $location, chatSocket, TimeAgo, Sounds) {
        this.$auth = $auth;
        this.$location = $location;
        this.chatSocket = chatSocket;
        this.users = [];
        this.messages = [];
        this.user = angular.fromJson(localStorage.user);
        this.timeFormater = TimeAgo.timeAgo;
        this.Sounds = Sounds;

        this.init();
    }

    init() {
        var self = this;
        self.chatSocket.on('connect', function(data) {
            self.chatSocket.emit('join', { user: self.user });

            self.chatSocket.on('message', function(data) {
                if (!data.data) {
                    return;
                }
                self.Sounds.Notification();
                self.messages.push(data.data);
            });

            self.chatSocket.on('user-join', (data) => {
                if (data.user && !~self.users.filter((el) => el._id === data.user._id).length) {
                    self.users.push(data.user);
                }
                //self.messages.push(data.data);
            });

            self.chatSocket.on('init-data', (data) => {
                if (data.users) {
                    self.users = data.users.filter((el) => el._id !== self.user._id);
                }
                if (data.room)
                    self.isChatActive = true;
                //self.messages.push(data.data);
            });

            self.chatSocket.on('room', () => {
                self.isChatActive = true;
            });




        });
    }

    sendMessage() {
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

    createRoom(user) {
        var self = this;
        self.isChatActive = true;
        self.chatSocket.emit('room', { owner: self.user, user });
    }

    closeRoom() {
        var self = this;
        self.isChatActive = false;
        self.chatSocket.emit('room-leave');
    }
}

angular.module(moduleName, [])
    .controller('ChatCtrl', ChatCtrl);

ChatCtrl.$inject = ['$auth', '$location', 'chatSocket', 'TimeAgo', 'Sounds'];

export default moduleName;