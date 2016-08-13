'use strict';

app.factory('chatSocket', function (socketFactory) {
    var socket = socketFactory();
    return socket;
});