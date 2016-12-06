'use strict';

var moduleName = 'socket.ChatCtrl';

class ChatCtrl {
    constructor($auth, $location, chatSocket, TimeAgo, Sounds, Filters) {
        this.$auth = $auth;
        this.$location = $location;
        this.chatSocket = chatSocket;
        this.Sounds = Sounds;
        this.Filters = Filters;

        this.users = [];
        this.messages = [];
        this.timeFormater = TimeAgo.timeAgo;
        this.user = angular.fromJson(localStorage.user);
        this.sortByDate = Filters.sortByDate;

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
                self.Sounds.notification();
                self.messages.push(data.data);
                localStorage.messages = angular.toJson(self.messages);
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
                if (data.room) {
                    self.messages = angular.fromJson(localStorage.messages) || [];
                    self.isChatActive = true;
                }
                //self.messages.push(data.data);
            });

            self.chatSocket.on('room', () => {
                self.isChatActive = true;
            });

            self.chatSocket.on('room-leave', () => {
                self.isChatActive = false;
            });

            self.chatSocket.on('room-sync', (data) => {
                let messages = angular.fromJson(data.messages);
                self.messages = self.Filters.uniqByProperty([...self.messages, ...messages], 'date');
            });

            self.chatSocket.on('room-sync-init', () => {
                self.chatSocket.emit('room-sync', { messages: angular.toJson(self.messages) });
            });


        });
    }

    sendMessage() {
        var self = this;

        var data = {
            message: self.message,
            type: 'message',
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
    
    sendPhoto(img) {
        var self = this;
        var data = {
            message: img,
            type: 'photo',
            user: self.user,
            date: new Date()
        };

        self.chatSocket.emit('message', data);
        self.messages.push(data);
    }
}

angular.module(moduleName, [])
    .controller('ChatCtrl', ChatCtrl);

ChatCtrl.$inject = ['$auth', '$location', 'chatSocket', 'TimeAgo', 'Sounds', 'Filters'];

export default moduleName;