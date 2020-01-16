import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Test from './Test';
import TG_BOT from './IRC'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <h1>Recived Messages</h1>
      <Router>
        <Switch>
          <Route exact path="/">
            <TG_BOT />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
