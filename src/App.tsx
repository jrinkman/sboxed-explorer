import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  NavLink,
  Route,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';

// Runtime constants
import runtimeConstants from 'helpers/runtimeConstants';

// Views
import Home from 'views/Home';
import Menu from 'views/Menu';
import Changelog from 'views/Changelog';
import Assets from 'views/Assets';
import AssetInfo from 'views/AssetInfo';
import Auth from 'views/Auth';
import Dev from 'views/Dev';

// Header component
import Header from './Header';

const Main = styled.main`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
`;

function App() {
  return (
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/assets/:type/:id">
            <AssetInfo />
          </Route>
          <Route path="/assets/:type">
            <Assets />
          </Route>
          <Route path="/changelog">
            <Changelog />
          </Route>
          {runtimeConstants.isLocal && (
            <Route path="/dev">
              <Dev />
            </Route>
          )}
          <Route path="/">
            <Home />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
