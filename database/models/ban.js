require('../index.js');
const mongoose = require('mongoose');

const banSchema = new mongoose.Schema({
  id_room: String,
  id_user: String,
});

const Ban = mongoose.model('Ban', banSchema);

const banUser = (userId, roomId) => {
  const ban = new Ban({ id_room: roomId, id_user: userId });
  return Ban.find({ id_room: roomId, id_user: userId })
    .then((result) => {
      console.log(result);
      if (!result.length) {
        return ban.save();
      }
      return '';
    })
    .catch((err) => console.error(err));
};

const pardonUser = (userId, roomId) => Ban.deleteOne({
  where:
    { id_user: userId, id_room: roomId },
})
  .then((result) => {
    console.log(result.id_user, 'has been deleted');
  })
  .catch((err) => console.error(err));

const getBannedUsers = (roomId) => Ban.find({ id_room: roomId }).exec();

module.exports = {
  banUser,
  pardonUser,
  getBannedUsers,
};
