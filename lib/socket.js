var Message = require("./model/Message");

module.exports = function (io, socket) {
    // Listen for connection
    io.on("connection", () => {
        // Globals
        // var defaultRoom = "general";
        // var rooms = ["General", "angular", "socket.io", "express", "node", "mongo", "PHP", "laravel"];
        var users = [];

        // Emit the rooms array
        socket.emit("init", {
            users,
        });

        // Listens for new user
        socket.on("new user", (data) => {
            // Tell all those in the room that a new user joined
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
