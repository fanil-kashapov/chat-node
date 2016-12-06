'use strict';

export default class ChatSocket {
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
