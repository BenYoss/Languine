import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getUser } from '../helpers/helpers';
import Chat from './messages/chat';
import Homepage from './homepage';
import Join from './join';
import RoomList from './rooms';
import NavBar from './navBar';
import Profile from './profile';
import Bucket from './files/bucket';
import File from './files/file';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    getUser()
      .then((userInfo) => {
        setUser(userInfo);
        window.language = userInfo.language;
      });
  }, []);

  return (
    <div>
      <NavBar user={user} />
      <Router>
        <Route exact path="/">
          <Homepage user={user} />
        </Route>
        <Route path="/discussion">
          <Chat />
        </Route>
        <Route path="/fileupload">
          <Bucket />
        </Route>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/roomlist">
          <RoomList />
        </Route>
        <Route path="/file">
          <File />
        </Route>
        <Route path="/profile">
          <Profile user={user} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
