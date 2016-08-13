// export function for listening to the socket
module.exports = function (socket) {
  // send the new user their name and a list of users
//     socket.emit('init', {
//         name: userName
//     });

//   // notify other clients that a new user has joined
//     socket.broadcast.emit('user:join', {
//         name: userName
//     });

  // broadcast a user's message to other users
    socket.on('message', function (data) {
      console.log(data);
        socket.broadcast.emit('message', {
            data: data
        });
    });

  // clean up when a user leaves, and broadcast it to other users
    // socket.on('disconnect', function () {
    //     socket.broadcast.emit('user:left', {
    //         name: userName
    //     });
    //     //userNames.free(name);
    // });
};