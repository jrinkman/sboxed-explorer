import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './views/Home';

function App() {
  return (
    <Router>
      <div>
        header tingz
      </div>
      <Switch>
        <Route path="/test">
          <div>Test route</div>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
