require('../index');
const mongoose = require('mongoose');

// Schema for room model to abide by
const roomSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  is_public: Boolean,
  created_at: Date,
});

// Room model class declared
const Room = mongoose.model('Room', roomSchema);

//----------------------------------------------------------------------
//                            ROOM METHODS
//----------------------------------------------------------------------

// ADD ROOM:
// takes in two strings and a boolean value and records a new room instance in
// the database based on the room id being considered a unique instance.
const addRoom = ({ name, description, isPublic }) => {
  const room = new Room({ name, description, isPublic });
  return Room.findOne({ id: room.id })
    .then((match) => {
      if (!match) {
        return room.save();
      }
      return 'DUPE FOUND';
    })
    .catch((err) => console.error(err));
};

// GET ROOMS:
// when invoked will return all room instances recorded in the database in a list.
const getRooms = () => Room.find().sort().exec();

module.exports = {
  addRoom,
  getRooms,
};
