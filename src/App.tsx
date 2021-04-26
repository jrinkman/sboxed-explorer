import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import Home from './views/Home';
import Info from './views/Info';

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
`;

const Main = styled.main`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
`;

const Credit = styled.span`
  color: white;
  opacity: 0.7;
  letter-spacing: 3px;
  font-weight: 700;
  text-transform: uppercase;
  user-select: none;
`;

const HeaderLink = styled(Link)`
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
        <HeaderLink to="/">
          <img className="logo-image" src="/logo192.png" alt="logo" />
          <span className="logo-text">api explorer</span>
        </HeaderLink>
        <Credit>BY ASTROJAXX</Credit>
      </Header>
      <Main>
        <Switch>
          <Route path="/info/:id">
            <Info />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
