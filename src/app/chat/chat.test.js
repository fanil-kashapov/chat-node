import chatCtrl from './chat.ctrl';
import time from './../services/time';
import filters from './../filters/filters';

describe('socket', function () {

    let chat;
    let timeSrv, mSounds, filtersFilters, mSocket;

    let user = {
        _id: 1,
        displayName: 'test'
    };
    let user2 = {
        _id: 2,
        displayName: 'test 2'
    };
    let users = [user, user2];
 
    beforeEach(inject(($rootScope) => {
        timeSrv = time.TimeAgoFactory();
        filtersFilters = filters.FiltersFactory();
        mSocket = new sockMock($rootScope);
        mSounds = new soundMock();
        // Create mock to user Chat
        chat = new chatCtrl(mSocket, timeSrv, mSounds, filtersFilters);

        chat.user = user;
    }));

    describe('input events', () => {
      /**
       * describe input event USER-JOIN
       * in params method get data with new User
       */
      it("user-join - event", () => {
          mSocket.receive('user-join', { user: user2});

          expect(chat.users[0].displayName).toEqual(user2.displayName);
          expect(chat.users[0]._id).toEqual(user2._id);
      });

      /**
       * describe input event - init date - client get data about his active chat and about active users
       */
      it("init-data - event", () => {
          let message = {
            message: 'hello',
            user,
            type: 'message',
            date: new Date()
          };

          mSocket.receive('init-data', { users: [user, user2] });

          expect(chat.users.length).toBe(1);
          expect(chat.users[0].displayName).toEqual(user2.displayName);

          expect(chat.isChatActive).toBeFalsy();
          //local storage with messages is empty
          expect(chat.messages.length).toEqual(0);
      });

      it("create room - event", function (done) {
        mSocket.receive('room')

        expect(chat.isChatActive).toBe(true);
      });

      it("leave room - event", function (done) {
        mSocket.receive('room-leave')

        expect(chat.isChatActive).toBe(false);
      });
      
    })

    describe('output events', () =>{
      /**
       * test default connect event JOIN - method send data with current(joined) user to socket server 
       */
      it("user join - event", () => {
          mSocket.receive('connect');

          expect(mSocket.emits['join'][0][0].user.displayName).toEqual(user.displayName);
          expect(mSocket.emits['join'][0][0].user._id).toEqual(user._id);
      });

      /**
       * test message event - method send data with message
       */
      it("send message - event", function (done) {
        let message = 'hello';

        expect(chat.message).not.toBeDefined();
        //emulate user input into text box
        chat.message = message;
        expect(chat.message).toBeDefined();
        expect(chat.message).toEqual(message);

        //emulate user click 'sendMessage'
        chat.sendMessage();

        expect(mSocket.emits['message'][0][0].message).toEqual(message);
        expect(mSocket.emits['message'][0][0].user._id).toBe(user._id);
        expect(mSocket.emits['message'][0][0].date).toEqual(new Date());
        expect(chat.message).not.toBeDefined();
      });

      /**
       * test create room event - method send request to create chat room
       */
      it("create room - event", function (done) {
        //emulate user click - create room
        chat.createRoom(user2);

        expect(chat.isChatActive).toBe(true);
        expect(mSocket.emits['room'][0][0].owner.displayName).toBe(user.displayName);
        expect(mSocket.emits['room'][0][0].user.displayName).toBe(user2.displayName);
      });

      it("leave room - event", function (done) {
        //emulate user click - leave room
        chat.closeRoom();

        expect(chat.isChatActive).toBe(false);
      });


    })
});

/*
Simple mock for socket.io
see: https://github.com/btford/angular-socket-io-seed/issues/4
thanks to https://github.com/southdesign for the idea
*/
var sockMock = function($rootScope){
  this.events = {};
  this.emits = {};

  // intercept 'on' calls and capture the callbacks
  this.on = function(eventName, callback){
    if(!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callback);
  };

  // intercept 'emit' calls from the client and record them to assert against in the test
  this.emit = function(eventName){
    var args = Array.prototype.slice.call(arguments, 1);

    if(!this.emits[eventName])
      this.emits[eventName] = [];
    this.emits[eventName].push(args);
  };

  //simulate an inbound message to the socket from the server (only called from the test)
  this.receive = function(eventName){
    var args = Array.prototype.slice.call(arguments, 1);

    if(this.events[eventName]){
      angular.forEach(this.events[eventName], function(callback){
        $rootScope.$apply(function() {
          callback.apply(this, args);
        });
      });
    };
  };
}

/**
 * mock Sound service logic
 */
var soundMock = function () {
    this.notification = function () {
        console.log('Sound srv - notification method');
        return 'play notification bip';
    }
}