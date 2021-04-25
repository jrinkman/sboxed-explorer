import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import Home from './views/Home';

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
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
    cursor: default;
    user-select: none;
  }
`;

const Main = styled.main`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding-left: 40px;
  padding-right: 40px;
`;

function App() {
  return (
    <Router>
      <Header>
        <img className="logo-image" src="/logo192.png" alt="logo" />
        <span className="logo-text">api explorer</span>
      </Header>
      <Main>
        <Switch>
          <Route path="/test">
            <div>Test route</div>
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
