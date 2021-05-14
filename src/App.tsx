import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// Runtime constants & components
import Loader from 'components/Loader';
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
  const [authUser, setAuthUser] = useState<User | null | undefined>(undefined);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), (user) => setAuthUser(user));
    return () => unsub();
  }, []);

  if (authUser === undefined) return <Loader />;
  return (
    <>
      {useLocation().pathname !== '/auth' && <Header user={authUser} />}
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
    </>
  );
}

export default App;
