import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getAccount, getUsers } from '../helpers/helpers';
import Chat from './messages/chat';
import Homepage from './homepage';
import Join from './join';
import RoomList from './rooms';
import NavBar from './navBar';
import Profile from './profile';
import Bucket from './files/bucket';
import File from './files/file';
import UserProfiles from './userProfiles';

function App() {
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAccount()
      .then((userInfo) => {
        setUser(userInfo);
        window.language = userInfo.language;
        getUsers()
          .then((userList) => {
            setUsers(userList);
          });
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
          {users.length ? (
            <RoomList users={users} />
          ) : ''}
        </Route>
        <Route path="/file">
          <File />
        </Route>
        <Route path="/user">
          <UserProfiles />
        </Route>
        <Route path="/profile">
          <Profile user={user} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
