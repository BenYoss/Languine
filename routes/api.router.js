const express = require('express');
const pdf = require('pdfjs-dist/es5/build/pdf');
const { File } = require('../database/models/models');

const apiRouter = express.Router();
pdf.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker';

apiRouter.get('/uploads', (req, res) => {
  File.getFiles(req.query)
    .then((files) => {
      res.send(files);
    })
    .catch((err) => console.error(err));
});

apiRouter.post('/uploads', (req, res) => {
  // Imports the Google Cloud client library.
  const { file, user } = req;
  File.addFile(user.id, file.buffer, file.originalname, file.size)
    .then((uploadedFile) => {
      console.log(uploadedFile, 'was sent');
      res.end();
    })
    .catch((err) => console.error(err));
});

module.exports = {
  apiRouter,
};
