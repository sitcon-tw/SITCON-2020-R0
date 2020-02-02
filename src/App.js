import React from 'react';
import './assets/scss/main.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Test from './test';
import R0Page from './R0Page';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <R0Page />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
