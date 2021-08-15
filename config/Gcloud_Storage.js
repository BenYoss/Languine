require('dotenv').config();
require('util');

const gc = require('./index.config');

const bucket = gc.bucket(process.env.BUCKET_NAME);

const uploadFile = (file) => new Promise((res, rej) => {
  const { originalname, buffer } = file;
  const blob = bucket.file(originalname.replace(/ /g, '_'));
  const blobStream = blob.createWriteStream({
    resumable: true,
  });
  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    await res(publicUrl);
  })
    .on('error', (err) => {
      console.error(err);
      rej(err, 'Failed to upload File');
    }).end(buffer);
});

module.exports = {
  uploadFile,
};
