'use strict';

var moduleName = 'chatApp.socket';

class ChatSocket {
    constructor (socketFactory) {
        this.socketFactory = socketFactory;
        this.io = io.connect('localhost:8080');
    }

    static chatSocketFactory(socketFactory) {
        var ins = new ChatSocket(socketFactory);
        var socket = ins.socketFactory({
            ioSocket: ins.io
        });

        return socket;
    }
}

// function chatSocket(socketFactory) {
//     var myIoSocket = io.connect('localhost:8080');

//     var mySocket = socketFactory({
//         ioSocket: myIoSocket
//     });

//     return mySocket;
// }



angular.module(moduleName, [])
   .factory('chatSocket', ChatSocket.chatSocketFactory);

ChatSocket.chatSocketFactory.$inject = ['socketFactory'];

export default moduleName;


// app.factory('chatSocket', function (socketFactory) {
//     var myIoSocket = io.connect('localhost:8080');

//     var mySocket = socketFactory({
//         ioSocket: myIoSocket
//     });

//     return mySocket;
// });

