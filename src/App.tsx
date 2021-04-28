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

// Views
import Home from 'views/Home';
import Changelog from 'views/Changelog';
import Assets from 'views/Assets';
import AssetInfo from 'views/AssetInfo';

const Header = styled.header`
  display: flex;
  flex-grow: 1;
  max-height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px 24px 40px;
  .logo-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .logo-text {
    color: white;
    letter-spacing: 3px;
    font-weight: 700;
    margin-left: 10px;
    text-transform: uppercase;
    user-select: none;
  }
  .logo-text .version {
    opacity: 0.6;
  }
`;

const HeaderNav = styled.div`
  display: flex;
`;

const Main = styled.main`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
`;

// const Credit = styled.span`
//   color: white;
//   opacity: 0.7;
//   letter-spacing: 3px;
//   font-weight: 700;
//   text-transform: uppercase;
//   user-select: none;
// `;

const HeaderNavLink = styled(NavLink)`
  height: 100%;
  color: white;
  letter-spacing: 3px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  user-select: none;
  transition: opacity 100ms ease-out;
  opacity: 0.6;
  &.active {
    opacity: 1;
  }
  &:not(last-child) {
    margin-right: 12px;
  }
  &:hover {
    opacity: 1;
  }
`;

const HeaderLogoLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`;

function App() {
  return (
    <Router>
      <Header>
        <HeaderLogoLink to="/">
          <img className="logo-image" src="/logo192.png" alt="logo" />
          <span className="logo-text">api explorer <span className="version">v1.2</span></span>
        </HeaderLogoLink>
        <HeaderNav>
          <HeaderNavLink to="/" exact activeClassName="active">
            home
          </HeaderNavLink>
          <HeaderNavLink to="/assets/gamemode" activeClassName="active">
            gamemodes
          </HeaderNavLink>
          <HeaderNavLink to="/assets/map" activeClassName="active">
            maps
          </HeaderNavLink>
          <HeaderNavLink to="/changelog" activeClassName="active">
            changes
          </HeaderNavLink>
        </HeaderNav>
      </Header>
      <Main>
        <Switch>
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
    </Router>
  );
}

export default App;
