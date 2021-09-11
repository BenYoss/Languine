import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getAccount, getUsers } from '../helpers/helpers';
import '../styles/app.css';
import Chat from './messages/chat';
import Homepage from './homepage';
import Footer from './footer';
import Join from './join';
import RoomList from './rooms';
import NavBar from './navBar';
import Profile from './profile/profile';
import Bucket from './files/bucket';
import File from './files/file';
import UserProfiles from './userProfiles';

function App() {
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAccount()
      .then((userInfo) => {
        window.language = userInfo.language;
        getUsers()
          .then((userList) => {
            userList.forEach((u) => {
              if (userInfo.id === u.id_google) {
                setUser(u);
              }
            });
            setUsers(userList);
          });
      });
  }, []);

  return (
    <div>
      <NavBar user={user} />
      <div className="app-container" style={{ paddingTop: '50px' }}>
        <Router>
          <Route exact path="/">
            <Homepage user={user} />
          </Route>
          <Route path="/discussion">
            <Chat userType={user} />
          </Route>
          <Route path="/fileupload">
            <Bucket />
          </Route>
          <Route path="/join">
            <Join user={user} />
          </Route>
          <Route path="/roomlist">
            {users.length ? (
              <RoomList users={users} user={user} />
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
          <Route path="/404">
            <div className="card col-lg-14">
              <img className="rounded mx-auto d-block" src="https://thumbs.gfycat.com/EveryWealthyHatchetfish-small.gif" width="600" height="300" alt="" />
              <h1 className="text-center">404</h1>
            </div>
          </Route>
        </Router>
      </div>
      <div style={{ paddingTop: '80px' }}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
