const express = require('express');
const {
  User, Room, Message, Ban,
} = require('../database/models/models');

// dbrouter acts as a new router instance.
const dbrouter = express.Router();

/**
 * @GET users from the database based on field search critera
 * @func findUsers
 */
dbrouter.get('/users', (req, res) => {
  User.findUsers(req.query)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).end();
    });
});

/**
 * @POST for users route.
 * Creates a new user based on data passed from client.
 */

dbrouter.post('/users', (req, res) => {
  User.addUser(req.body)
    .then(() => {
      res.status(201).send('this is the poster for users');
    })
    .catch(() => res.status(500).end());
});

/**
 * @PUT request for users route.
 * Updates user information based on user id and option critera.
 * NOTE: (When a user decides to change a specific feature on their profile, this request fires.)
 */

dbrouter.put('/users', (req, res) => {
  const { id, options } = req.body;
  User.updateUser(id, options)
    .then(() => {
      res.status(201).send('user has been updated');
    })
    .catch(() => res.status(500).end());
});

/**
 * @GET request for rooms route.
 * Gets room information based on the id of specified room.
 * The request for when a user enters a specific room.
 */
dbrouter.get('/rooms', (req, res) => {
  Room.getRooms(req.query)
    .then((rooms) => {
      res.status(200).send(rooms);
    })
    .catch(() => res.status(500).end());
});

/**
 * @POST for rooms route.
 * Creates a new room based on information passed in.
 */

dbrouter.post('/rooms', (req, res) => {
  Room.addRoom(req.body).then(() => {
    res.status(201).end();
  }).catch(() => res.status(500).end());
});

/**
 * @PUT request for rooms.
 * Updates a specific room based on id.
 */

dbrouter.put('/rooms', (req, res) => {
  const { id, options } = req.body;
  console.log(options);
  Room.updateRoom(id, options).then(() => {
    res.status(201).end();
  }).catch(() => res.status(500).end());
});

/**
 * @DELETE for rooms route.
 * Deletes a room from the database based on id.
 */

dbrouter.delete('/rooms', (req, res) => {
  Room.deleteRoom(req.query)
    .then(() => {
      res.status(200).send('room deleted');
    })
    .catch(() => res.status(500).end());
});

/**
 * @GET for languages route.
 * Gets languages based on a keyword criteria.
 * When a user wants to find languages in the list, this route fires.
 */

dbrouter.get('/languages', (req, res) => {
  res.status(200).send('this is the getter for languages');
});

/**
 * @GET request for messages route.
 * Gets message information based on the id of room.
 */

dbrouter.get('/messages', (req, res) => {
  Message.getMessages(req.query)
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch(() => res.status(500).end());
});

/**
 * @POST request for messages.
 * Creates a new message inside of specified room based on id.
 */

dbrouter.post('/messages', (req, res) => {
  Message.addMessage(req.body)
    .then(() => {
      console.log('message saved to DB');
      res.status(201).end();
    })
    .catch(() => res.status(500).end());
});

/**
 * @DELETE request for messages route.
 * Deletes a message from the database and room based on the id of the message.
 */

dbrouter.delete('/messages', (req, res) => {
  Message.deleteMessage(req.query)
    .then(() => {
      console.log('message removed from DB');
      res.status(200).end();
    })
    .catch(() => res.status(500).end());
});

/**
 * @GET request for banned users.
 * Gets all banned users based on the room id specified.
 */

dbrouter.get('/banned', (req, res) => {
  const { roomId } = req.query;

  Ban.getBannedUsers(roomId)
    .then((bannedUsers) => {
      res.status(200).send(bannedUsers);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

/**
 * @POST request for banned users.
 * Adds a new ban to a user based on room id.
 */

dbrouter.post('/banned', (req, res) => {
  const { userId, roomId } = req.body;

  Ban.banUser(userId, roomId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

/**
 * @DELETE request for banned users.
 * Pardons a user by removing their ban from the database.
 */

dbrouter.delete('/banned', (req, res) => {
  const { userId, roomId } = req.query;

  Ban.pardonUser(userId, roomId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = {
  dbrouter,
};
