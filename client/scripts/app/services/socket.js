'use strict';

app.factory('chatSocket', function (socketFactory) {
    var myIoSocket = io.connect('localhost:8080');

    var mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
});