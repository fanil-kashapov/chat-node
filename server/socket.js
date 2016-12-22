'use strict';

let usersOnline = new Map(), // create a weak map
    usersDictionary = {},
    rooms = {};

//sockets = {}; //create dictionary of active sockets
// export function for listening to the socket

function getRoomName() {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split(''),
        length = Math.floor(Math.random() * chars.length);

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

module.exports = (socket) => {
    socket.on('join', (data) => {
        socket.currentUser = data.user;

        if (!usersOnline.has(data.user._id)) {
            usersOnline.set(data.user._id, data.user);
        }

        if (usersDictionary[data.user._id]) {
            usersDictionary[data.user._id].sockets.push(socket);
            if(usersDictionary[data.user._id].room) {
                socket.join(usersDictionary[data.user._id].room);
                socket.broadcast.to(usersDictionary[socket.currentUser._id].room).emit('room-sync-init');
            }
        } else {
            usersDictionary[data.user._id] = {
                sockets: [socket]
            };
        }

        socket.broadcast.emit('user-join', {
            user: data.user
        });

        socket.emit('init-data', {
            users: [...usersOnline.values()],
            room: usersDictionary[socket.currentUser._id].room
        });
    });


    socket.on('message', (data) => {
        socket.broadcast.to(usersDictionary[socket.currentUser._id].room).emit('message', {
            data
        });
    });

    socket.on('room', (data) => {
        var room = getRoomName();

        rooms[room] = usersDictionary[socket.currentUser._id];
        rooms[room] = [usersDictionary[data.user._id]];

        //update dictionary info
        usersDictionary[socket.currentUser._id].room = room;
        usersDictionary[data.user._id].room = room;

        // join user to chat room
        socket.join(room);
        usersDictionary[data.user._id].sockets.forEach((el) => {
            el.join(room);
        });

        socket.broadcast.to(room).emit('room', room, 'room created');
    });

    socket.on('room-leave', () => {
        //update dictionary info
        var room = usersDictionary[socket.currentUser._id].room;
        socket.broadcast.to(room).emit('room-leave', room, 'room closed');

        delete usersDictionary[socket.currentUser._id].room;
    });

    socket.on('room-sync-init', () => {
        socket.broadcast.to(usersDictionary[socket.currentUser._id].room).emit('room-sync-init');
    });

    socket.on('room-sync', (data) => {
        socket.broadcast.to(usersDictionary[socket.currentUser._id].room).emit('room-sync', data);
    });
};