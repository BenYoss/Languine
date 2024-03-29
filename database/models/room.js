require('../index');
const mongoose = require('mongoose');

// Schema for room model to abide by
const roomSchema = new mongoose.Schema({
  name: String,
  description: String,
  is_public: Boolean,
  id_host: String,
  created_at: Date,
});

const passwordSchema = new mongoose.Schema({
  password: String,
  room: String,
});

// Room model class declared
const Room = mongoose.model('Room', roomSchema);
const RoomPass = mongoose.model('RoomPass', passwordSchema);

//----------------------------------------------------------------------
//                            ROOM METHODS
//----------------------------------------------------------------------

// ADD ROOM:
// takes in two strings and a boolean value and records a new room instance in
// the database based on the room id being considered a unique instance.
const addRoom = (name, description, isPublic, host) => {
  const date = new Date();
  const room = new Room({
    name, description, is_public: isPublic, id_host: host, created_at: date,
  });
  return Room.findOne({ name: room.name })
    .then((match) => {
      if (!match && room.name.length) {
        return room.save();
      }
      return match;
    })
    .catch((err) => console.error(err));
};

// GET ROOMS:
// when invoked will return all room instances recorded in the database in a list.
const getRooms = (options) => Room.find(options).sort().exec();

const deleteRoom = (id) => Room.deleteOne({ _id: id }).exec();

const createPassword = ({ password, roomName }) => {
  const pass = new RoomPass({ password, room: roomName });
  return RoomPass.findOne({ _id: pass.Id })
    .then((match) => {
      if (!match) {
        return pass.save();
      }
      return match;
    })
    .catch((err) => console.error(err));
};

const updateRoom = (id, options) => Room.findOneAndUpdate({ _id: id },
  options).then((data) => console.log(data)).catch((err) => console.error(err));

const getPassword = ({ roomName }) => RoomPass.findOne({ room: roomName }).exec();

const updatePassword = (roomName, password) => RoomPass.findOneAndUpdate({ room: roomName },
  password).then((pass) => {
  const hash = password.password;
  if (!pass) {
    return createPassword({ password: hash, roomName });
  }
  return null;
}).catch((err) => console.error(err));

const deletePassword = ({ roomName }) => RoomPass.deleteOne({ room: roomName }).exec();

module.exports = {
  addRoom,
  getRooms,
  deleteRoom,
  createPassword,
  getPassword,
  deletePassword,
  updateRoom,
  updatePassword,
};
