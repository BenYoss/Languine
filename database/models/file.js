require('../index');
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  id: Number,
  id_user: String,
  filetext: String,
  title: String,
  size: String,
  timestamp: Date,
});

const File = mongoose.model('File', fileSchema);

const addFile = (userId, fileText, title, size) => {
  const newTime = new Date();
  const fileBuff = fileText.toString('binary');
  const file = new File({
    id_user: userId, filetext: fileBuff, title, size, timestamp: newTime,
  });

  return File.findOne({ id: file.Id })
    .then(() => {
      file.save();
    })
    .catch((err) => console.error(err));
};

const getFiles = (options) => File.find(options).sort().exec();

const deleteFile = (id) => File.deleteOne({ _id: id }).exec();

module.exports = {
  addFile,
  getFiles,
  deleteFile,
};
