'use strict';

var moduleName = 'socket.ChatCtrl';

export default class ChatCtrl {
    constructor(chatSocket, TimeAgo, Sounds, Filters) {
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
        // TODO: We are using es2015 - with arrow functions we dont need this old hack (self = this).
        // Please use .bind() for context binding
        var self = this;

        self.chatSocket.on('message', function(data) {
            if (!data.data) {
                return;
            }
            self.messages.push(data.data);
            localStorage.messages = angular.toJson(self.messages);

            self.Sounds.notification();
        });

        self.chatSocket.on('user-join', (data) => {
            // TODO: Why we need this '!!~' ? And what is the meaning of '~'
            if (data.user && !!~self.users.filter((el) => el._id === data.user._id).length) {
                // TODO: As our function get only one parameter - we can avoid parenthesis. e.g.
                // .filter(el => el._id...)
                self.users.push(data.user);
            }
        });

        self.chatSocket.on('init-data', (data) => {
            if (data.users) {
                self.users = data.users.filter((el) => el._id !== self.user._id);
            }
            if (data.room) {
                self.messages = angular.fromJson(localStorage.messages) || [];
                self.isChatActive = true;
            }
        });

        self.chatSocket.on('room', () => {
            self.isChatActive = true;
        });

        self.chatSocket.on('room-leave', () => {
            self.isChatActive = false;
        });

        self.chatSocket.on('connect', function(data) {
            self.chatSocket.emit('join', { user: self.user });

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
        self.message = undefined;
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