require('../index');
const mongoose = require('mongoose');

// schema for message table
const messageSchema = new mongoose.Schema({
  id: Number,
  id_user: String,
  id_room: String,
  text: String,
  name_user: String,
  thumbnail_user: String,
  timestamp: Date,
});

// message model is declared
const Message = mongoose.model('Message', messageSchema);

const addMessage = (userId, roomId, text, username, thumbnail) => {
  const date = new Date();
  const message = new Message({
    id_user: userId,
    id_room: roomId,
    text,
    name_user: username,
    thumbnail_user: thumbnail,
    timestamp: date,
  });

  return Message.findOne({ id: message.Id })
    .then(() => message.save())
    .catch((err) => console.error(err));
};

const getMessages = (options) => Message.find(options).sort().exec();

const deleteMessage = (options) => Message.deleteMany(options).exec();

module.exports = {
  addMessage,
  getMessages,
  deleteMessage,
};
