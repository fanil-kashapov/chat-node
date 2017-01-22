export default class ChatSocket {
    constructor (socketFactory) {
        this.socketFactory = socketFactory;
    }

    static chatSocketFactory (socketFactory) {
        const ins = new ChatSocket(socketFactory);

        return ins.socketFactory();
    }
}
