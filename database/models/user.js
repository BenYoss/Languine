require('../index');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id_google: String,
  username: String,
  background_img: String,
  thumbnail: String,
  description: String,
  language: String,
  id_room: String,
});

const User = mongoose.model('User', userSchema);

const addUser = (
  username, thumbnail, description, idGoogle, language,
) => {
  const user = new User({
    username,
    thumbnail,
    description,
    language,
    id_google: idGoogle,
  });

  return User.findOne({ id_google: idGoogle })
    .then((data) => {
      if (!data) {
        return user.save();
      }
      return 'DUPE HAS BEEN DETECTED';
    })
    .catch((err) => console.error(err));
};

const findUsers = (option) => User.find(option).sort().exec();

const updateUser = (id, options) => User.findOneAndUpdate({ id_google: id },
  options).catch((err) => console.error(err));

const updateUserRoom = (userId, roomId) => User.findOneAndUpdate({ id_google: userId },
  { id_room: roomId }).catch((err) => console.error(err));

module.exports = {
  addUser,
  findUsers,
  updateUserRoom,
  updateUser,
};
