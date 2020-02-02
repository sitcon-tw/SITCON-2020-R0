import React from 'react';
// import logo from './logo.svg';
import './assets/scss/main.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Test from './test';
// import IRC from './IRC';
import IntegratedIRC from './Intergrated-IRC';

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
      <Router>
        <Switch>
          <Route exact path="/">
            <IntegratedIRC />
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
