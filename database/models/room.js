const mongoose = require('mongoose');
require('../index');

const roomSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  is_public: Boolean,
  created_at: Date,
});

const Room = mongoose.model('Room', roomSchema);

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

module.exports = {
  addRoom,
};
