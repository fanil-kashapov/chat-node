import socket from '.././src/app/services/socket';

describe('socket', function () {

    var io;

    beforeEach(mocks.inject(function (socketFactory) {
        state = socketFactory;
    }));

    beforeEach(inject(($injector) => {
        io = socket.chatSocketFactory($injector.get('socketFactory'));
    }));

    //var client = io.connect("https://172.25.34.63:4433", options);
    it("echos message", function (done) {
        io.on('connect', function(data) {
            io.emit('join', { user: self.user });
        });
    })
    // client.once("connect", function () {
    //         client.once("echo", function (message) {
    //             message.should.equal("Hello World");
 
    //             client.disconnect();
    //             done();
    //         });
 
    //         client.emit("echo", "Hello World");
    //     });
});