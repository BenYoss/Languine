Languine <img src="https://image.flaticon.com/icons/png/128/472/472527.png" alt="" height="30" width="30" />
=========
Languine is a messaging site that breaks the language barrier by translating messages at real time!

Description
=========
Languine is a social networking site that allows for users to communicate across the world though real-time translatable message boards.
The primary focus of Languine is to allow the users of the site to communicate with eachother without having the need to know eachother's languages.
The users of Languine are granted the ability to create rooms of their own by filling out the creation form, or they can join an existing room from
the room list available. If the user does not want other users to join their room, there is also a privitization option that would prompt users
with a password before joining the room. Additionally, if the user wanted to understand the contents within a PDF file that is written in a language they may not know, Languine comes with a built-in PDF translator to allow for a better understanding of the contents inside.

Dependencies
========
Stack: React, MongoDB(Mongoose), Node, Express
```javascript
"dependencies": {
    "@google-cloud/storage": "^5.3.0",
    "axios": "^0.20.0",
    "bootstrap": "^4.5.2",
    "crypto-js": "^4.0.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "filepond": "^4.21.0",
    "moment": "^2.29.1",
    "mongoose": "^5.10.6",
    "multer": "^1.4.2",
    "nodemon": "^2.0.4",
    "passport": "^0.4.1",
    "passport-google-oauth20": "^2.0.0",
    "pdfjs-dist": "^2.5.207",
    "prop-types": "^15.7.2",
    "query-string": "^6.13.4",
    "react": "^16.13.1",
    "react-bootstrap": "^1.3.0",
    "react-dom": "^16.13.1",
    "react-filepond": "^7.1.0",
    "react-pdf": "^5.0.0",
    "react-router-dom": "^5.2.0",
    "react-scroll-to-bottom": "^4.0.0",
    "socket.io": "^2.3.0",
    "socket.io-client": "^2.3.0"
  },
  "devDependencies": {
    "@babel/core": "^7.11.6",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-react": "^7.10.4",
    "babel-loader": "^8.1.0",
    "css-loader": "^4.3.0",
    "eslint": "^7.9.0",
    "eslint-config-airbnb": "^18.2.0",
    "eslint-plugin-import": "^2.22.0",
    "eslint-plugin-jsx-a11y": "^6.3.1",
    "eslint-plugin-react": "^7.20.6",
    "eslint-plugin-react-hooks": "^4.1.2",
    "style-loader": "^1.2.1",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12"
  },
  ```
Installation
=======

Before proceeding into the installation guide, the repository MUST be forked, then cloned onto a local machine.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/800px-Npm-logo.svg.png" alt="" height="20" width="55" /> installation (node/linux)

Now assuming that the repository has already been cloned, proceeding into the cloned repo's directory
issue the command below to install all app dependencies.

```bash
  npm install
```

This corresponds to the latest tagged release.
Add ``--beta`` for the latest tagged release candidate,
or ``--edge`` for the latest ``master`` version.

Once the above command is issued, there would be a new folder created within the app's directory titled ``node_modules``.
This folder will contain all of the required dependencies for the app to operate accordingly.

Once dependencies are installed, let's set up the environmental variables; luckily, there is a package that makes this job easier for us, ``dotenv``.

First, let's create the .env file where all of our variables will be housed, and to do that, issue the command below in the app's main directory:

```bash
touch .env
```
Inside, the variable names should look like this:

Variable | Description
------------ | -------------
  PORT| server port
  SOCKET_HOST| host for the socket servers (when deploying use domain name)
  DB_USER| database username
  DB_PASS| database user's password
  DB_DATABASE| name of the database being accessed
  CLIENT_ID| key from the google Oauth
  CLIENT_SECRET| secret generated from google Oauth
  API_KEY_TRANS| google translate API key
  BUCKET_NAME| Name of the bucket from google cloud
  BUCKET_KEYFILE| Name of the JSON file given when creating a google API service
  
  Lastly, the webpack should build itself in order to render the client side of the application, let's do that by issuing the command below:
  
  ```bash
  npm run build
  ```
  
  Once this command finishes its output, the webpack will create a ``bundle.js`` for the app to encode the data in the React files.
  
  The app can then start locally. The Node server can start with the command ``npm start`` and the web-client by issuing ``npm run dev``.
  
  Database
  =======
  
  Before moving onto the next installation phase, the required database management system should be configured onto the machine.
  
  To test if MongoDB is installed already, issue the command below:
  
  ```bash
  which mongo
  ```
  
  If the output from this command looks like this, then Mongodb is successfully installed:
  
  ```bash
  usr/bin/mongo
  ```
  
  If MongoDB is not installed, visit this step-by-step tutorial on the official website: https://docs.mongodb.com/manual/installation/.
  
  issue the command ``sudo service mongodb start`` to start up the MongoDB server.
  
  Once mongoDB is successfully installed on the machine, the next step is to create a user account using ``MongoDB Atlas``.
  This will assist in setting up not only a user account to access the database, but also to manage a database online, rather than locally.
  
  A great tutorial to follow for creating MongoDB Atlas clusters is here: https://medium.com/@bretcameron/mongodb-a-beginners-guide-8fca0c7787a4.
  
  Bucket Creation
  ======
  
  The next step for configuration is to obtain the google cloud bucket keyFile.
  
  Normally, when creating a google cloud app, a bucket will also be created along with the app itself, this can be accessable when searching for the keyword ``bucket`` in th e google cloud searchbar provided.
 
  When proceeding into bucket configuration, a great article to follow can be found here: https://medium.com/@olamilekan001/image-upload-with-google-cloud-storage-and-node-js-a1cf9baa1876.

  Deployment
  =======
  
  Assuming the google cloud project is already created and configured accordingly, let's create an ``app.yaml`` for the app engine to operate:
  
  ```bash
  touch app.yaml
  ```
  
  Once the app.yaml is created, insert the following code below inside of the file scope:
  
  ```yaml
runtime: nodejs
env: flex

manual_scaling:
    instances: 1

env_variables:
 //Copy variables from .env here...
 //remove the HOST env var, a HOST var is created automatically when deploying with google cloud
```

Languine, - <b>Translatable Message Board</b> (2020)
