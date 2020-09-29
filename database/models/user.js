require('../index');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id_google: String,
  username: String,
  thumbnail: String,
  description: String,
  id_language: Number,
});

const User = mongoose.model('User', userSchema);

const addUser = ({
  username, thumbnail, description, idGoogle,
}) => {
  const user = new User({
    username,
    thumbnail,
    description,
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

module.exports = {
  addUser,
};
