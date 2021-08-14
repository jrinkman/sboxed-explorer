import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';

// Views
import Home from 'views/Home';
import Menu from 'views/Menu';
import Changelog from 'views/Changelog';
import Assets from 'views/Assets';
import AssetInfo from 'views/AssetInfo';

// Header component
import Header from './Header';

const Main = styled.main`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
`;

function App() {
  return (
    <>
      <Header />
      <Main>
        <Switch>
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
          <Route path="/">
            <Home />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Main>
    </>
  );
}

export default App;
