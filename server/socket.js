const express = require('express');
const { useCallback } = require('react');
const socketio = require('socket.io');

const socketRouter = express.Router();

const io = socketio(socketRouter);

io.on('connection', (socket) => {
  console.log('A new connection has been made!');

  socket.on('join', ({ name, room }, cb) => {
    console.log(name, room);
    const err = true;

    if (err) {
      cb({ err: 'err' });
    }
  });

  socket.on('disconnect', () => {
    console.log('A disconnection has been made!');
  });
});

module.exports = {
  socketRouter,
};
