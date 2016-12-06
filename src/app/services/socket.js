'use strict';

var moduleName = 'chatApp.socket';

class ChatSocket {
    constructor(socketFactory) {
        this.socketFactory = socketFactory;
        //this.io = io.connect('localhost:8080', { user: localStorage.user });
    }

    static chatSocketFactory(socketFactory) {
        var ins = new ChatSocket(socketFactory);
        // var socket = ins.socketFactory({
        //     ioSocket: ins.io
        // });

        return ins.socketFactory();
    }
}

angular.module(moduleName, [])
    .factory('chatSocket', ChatSocket.chatSocketFactory);

ChatSocket.chatSocketFactory.$inject = ['socketFactory'];

export default moduleName;