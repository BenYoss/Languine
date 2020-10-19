const express = require('express');
const pdf = require('pdfjs-dist/es5/build/pdf');
const { File } = require('../database/models/models');
const { uploadFile } = require('../config/Gcloud_Storage');

const apiRouter = express.Router();
pdf.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker';

apiRouter.get('/uploads', (req, res) => {
  File.getFiles(req.query)
    .then((files) => {
      res.status(200).send(files);
    })
    .catch(() => res.status(500).end());
});

apiRouter.post('/bucket', (req, res) => {
  const { file, user } = req;
  uploadFile(file)
    .then((result) => {
      if (result.includes('.pdf')) {
        File.addFile(user.id, result, file.originalname, file.size)
          .then(() => {
            res.status(201).end();
          })
          .catch((err) => console.error(err));
      }
      res.status(201).send(result);
    })
    .catch(() => res.status(500).end());
});

module.exports = {
  apiRouter,
};
