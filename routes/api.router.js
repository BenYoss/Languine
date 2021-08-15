const express = require('express');
const pdfjs = require('pdfjs-dist/build/pdf');
const pdfjsworker = require('pdfjs-dist/build/pdf.worker.entry');
const { File } = require('../database/models/models');
const { uploadFile } = require('../config/Gcloud_Storage');

const apiRouter = express.Router();
/** _________________________________________________
 *              PDF global worker options:
 *      defines the type of worker build for PDFjs.
 *  _________________________________________________
 */
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsworker;

/**
 * @func GET request for uploads:
 *
 * GET takes in req data and searches in database for an existing record, then returns the result.
 * @func getFiles searches the File entity in database for all file records of User ID.
 *
 * @input : req - the id of current logged-in user.
 * @output : files - PDF file data fetched from database and returned as array of objects.
 */
apiRouter.get('/uploads', (req, res) => {
  File.getFiles(req.query)
    .then((files) => {
      res.status(200).send(files);
    })
    .catch(() => res.status(500).end());
});

/**
 * @func POST request for bucket:
 *
 * POST takes in data retrieved by the upload form in bucket.jsx.
 * @func uploadFile takes in file data and transfers data to Google Cloud's Storage API.
 * @func addFile adds the output url from uploadFile to the database as a new record.
 *
 * @input : req -
 *              | @var file - specified form-url data from upload.
 *              | @var user - id of user specified.
 */
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

/**
 * @func DELETE request for bucket:
 *
 * DELETE takes in the id of a file and deletes it from the database.
 * @func deleteFile deletes a file from the database.
 */

apiRouter.delete('/bucket', (req, res) => {
  const { id } = req.query;
  File.deleteFile(id)
    .then(() => {
      res.status(200).end();
    })
    .catch(() => res.status(500).end());
});

// Export router for rendering to server.

module.exports = {
  apiRouter,
};
