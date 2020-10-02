import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './chat';
import Homepage from './homepage';
import Join from './join';

function App() {
  return (
    <div>
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
      </Router>
    </div>
  );
}

export default App;
