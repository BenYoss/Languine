const express = require('express');
const { User, Room, Message } = require('../database/models/models');

const dbrouter = express.Router();

dbrouter.get('/users', (req, res) => {
  User.findUsers(req.query)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).end();
    });
});

dbrouter.post('/users', (req, res) => {
  User.addUser(req.body)
    .then(() => {
      res.status(201).send('this is the poster for users');
    })
    .catch(() => res.status(500).end());
});

dbrouter.get('/rooms', (req, res) => {
  Room.getRooms(req.query)
    .then((rooms) => {
      res.status(200).send(rooms);
    })
    .catch(() => res.status(500).end());
  // res.send('this is the getter for rooms');
});

dbrouter.post('/rooms', (req, res) => {
  Room.addRoom(req.body)
    .then(() => {
    })
    .catch(() => res.status(500).end());
  res.send('rooms');
});

dbrouter.delete('/rooms', (req, res) => {
  Room.deleteRoom(req.query)
    .then(() => {
      res.status(200).send('room deleted');
    })
    .catch(() => res.status(500).end());
});

dbrouter.get('/languages', (req, res) => {
  res.status(200).send('this is the getter for languages');
});

dbrouter.get('/messages', (req, res) => {
  Message.getMessages(req.query)
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch(() => res.status(500).end());
});

dbrouter.post('/messages', (req, res) => {
  Message.addMessage(req.body)
    .then(() => {
      console.log('message saved to DB');
      res.status(201).end();
    })
    .catch(() => res.status(500).end());
});

dbrouter.delete('/messages', (req, res) => {
  Message.deleteMessage(req.query)
    .then(() => {
      console.log('message removed from DB');
      res.status(200).end();
    })
    .catch(() => res.status(500).end());
});

dbrouter.get('/files', (req, res) => {
  res.status(200).send('this is the getter for files');
});

module.exports = {
  dbrouter,
};
