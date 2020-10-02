import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './chat';
import Homepage from './homepage';
import Join from './join';
import RoomList from './rooms';
import NavBar from './navBar';

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/discussion">
          <Chat />
        </Route>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/roomlist">
          <RoomList />
        </Route>
      </Router>
    </div>
  );
}

export default App;
