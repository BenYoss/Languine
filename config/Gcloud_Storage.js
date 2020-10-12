require('util');

const gc = require('./index.config');

const bucket = gc.bucket('languine.appspot.com');

const uploadFile = (file) => new Promise((res, rej) => {
  const { originalname, buffer } = file;
  const blob = bucket.file(originalname.replace(/ /g, '_'));
  console.log(blob);
  const blobStream = blob.createWriteStream({
    resumable: true,
  });
  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    console.log('test');
    await res(publicUrl);
  })
    .on('error', (err) => {
      console.error(err);
      rej(err, 'Failed to upload File');
    });
});

module.exports = {
  uploadFile,
};
