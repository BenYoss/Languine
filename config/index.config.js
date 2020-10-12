const { Storage } = require('@google-cloud/storage');
const path = require('path');

const GCLOUD_PROJECT_ID = 'languine';

const GCLOUD_PROJECT_KEYFILE = path.join(__dirname, './languine-12749f5fa72d.json');

const storage = new Storage();

module.exports = storage;
