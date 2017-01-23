'use strict';

export default class ChatCtrl {
    constructor (chatSocket, TimeAgo, Sounds, Filters) {
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

    init () {
        // TODO: We are using es2015 - with arrow functions we dont need this old hack (this = this).
        // Please use .bind() for context binding
        this.chatSocket.on('message', (data) => {
            if (!data.data)
                return;

            this.messages.push(data.data);
            localStorage.messages = angular.toJson(this.messages);

            this.Sounds.notification();
        });

        this.chatSocket.on('user-join', (data) => {
            // TODO: Why we need this '!!~' ? And what is the meaning of '~'
            if (data.user && !this.users.filter((el) => el._id === data.user._id).length) {
                // TODO: As our function get only one parameter - we can avoid parenthesis. e.g.
                // .filter(el => el._id...)
                this.users.push(data.user);
            }
        });

        this.chatSocket.on('init-data', (data) => {
            if (data.users)
                this.users = data.users.filter((el) => el._id !== this.user._id);

            if (data.room) {
                this.messages = angular.fromJson(localStorage.messages) || [];
                this.isChatActive = true;
            }
        });

        this.chatSocket.on('room', () => {
            this.isChatActive = true;
        });

        this.chatSocket.on('room-leave', () => {
            this.isChatActive = false;
        });

        this.chatSocket.on('connect', (data) => {
            this.chatSocket.emit('join', { user: this.user });

            this.chatSocket.on('room-sync', (data) => {
                let messages = angular.fromJson(data.messages);
                this.messages = this.Filters.uniqByProperty([...this.messages, ...messages], 'date');
            });

            this.chatSocket.on('room-sync-init', () => {
                this.chatSocket.emit('room-sync', { messages: angular.toJson(this.messages) });
            });
        });
    }

    sendMessage () {
        var data = {
            message: this.message,
            type: 'message',
            user: this.user,
            date: new Date()
        };

        this.chatSocket.emit('message', data);
        this.messages.push(data);
        this.message = null;
    }

    createRoom (user) {
        this.isChatActive = true;
        this.chatSocket.emit('room', { owner: this.user, user });
    }

    closeRoom () {
        this.isChatActive = false;
        this.chatSocket.emit('room-leave');
    }

    sendPhoto (img) {
        var data = {
            message: img,
            type: 'photo',
            user: this.user,
            date: new Date()
        };

        this.chatSocket.emit('message', data);
        this.messages.push(data);
    }
}