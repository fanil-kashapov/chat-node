var Message = require("./model/Message"),
    io = require("socket.io"),
    User = require("./model/User.js");

module.exports = function (http) {
    const ioSrv = io.listen(http);
    var users = [];

    // Listen for connection
    ioSrv.on("connection", (socket) => {
        // Globals
        // var defaultRoom = "general";
       //var users = ["General", "angular", "socket.io", "express", "node", "mongo", "PHP", "laravel"];
        
        //     if (err) return console.error(err);

        //     return user;
        // })

        // Emit the rooms array
        socket.emit("init", {
            users,
        });

        // Listens for new user
        socket.on("new user", (data) => {
            // Tell all those in the room that a new user joined
            users.push(data);
            io.emit("user joined", data);
        });

        // Listens for a new chat message
        socket.on("new message", (data) => {
            // Create message
            var newMsg = new Message({
                username: data.username,
                message: data.message,
                // room: data.room.toLowerCase(),
                created: new Date(),
            });
            // Save it to database
            newMsg.save((err, msg) => {
            // Send message to those connected in the room
            io.emit("message created", msg);
            });
        });
    });
};
