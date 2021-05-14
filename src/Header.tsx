import React, { useState } from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { User } from 'firebase/auth';

// Components / helpers
import Button from 'components/Button';
import Avatar from 'components/Avatar';
import runtimeConstants from 'helpers/runtimeConstants';
import steamLogo from 'assets/steam.svg';

const Root = styled.header`
  display: flex;
  flex-grow: 1;
  max-height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px 24px 40px;
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
`;

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
  margin-left: 12px;
  &:first-child {
    margin-left: 0px;
  }
  &.active {
    opacity: 1;
  }
  &:hover {
    opacity: 1;
  }
`;

const HeaderNavAuth = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const HeaderLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderLogoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const HeaderLogoLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  span {
    color: white;
    letter-spacing: 3px;
    font-weight: 700;
    margin-left: 10px;
    text-transform: uppercase;
    user-select: none;
  }
  span.version {
    transition: opacity 100ms ease-out;
    margin-left: 5px;
    opacity: 0.6;
  }
  span.version:hover {
    opacity: 1;
  }
`;

const ButtonLogo = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 12px;
`;

interface Props {
  user: User | null;
}

function Header(props: Props) {
  const { user } = props;

  // Callback for signing in
  const onSignInClick = () => {
    window.location.replace(`${axios.defaults.baseURL}/auth`);
  };

  return (
    <Root>
      <HeaderLogo>
        <HeaderLogoLink to="/">
          <HeaderLogoImage src="/logo192.png" alt="logo" />
          <span>api explorer</span>
        </HeaderLogoLink>
        <HeaderLogoLink to="/changelog">
          <span className="version">v1.3.5</span>
        </HeaderLogoLink>
      </HeaderLogo>
      <HeaderNav>
        <HeaderNavLink to="/" exact activeClassName="active">
          home
        </HeaderNavLink>
        <HeaderNavLink to="/menu" exact activeClassName="active">
          menu
        </HeaderNavLink>
        <HeaderNavLink to="/assets/gamemode" activeClassName="active">
          modes
        </HeaderNavLink>
        <HeaderNavLink to="/assets/map" activeClassName="active">
          maps
        </HeaderNavLink>
        {runtimeConstants.isLocal && (
        <HeaderNavLink to="/dev" activeClassName="active">
          dev
        </HeaderNavLink>
        )}
        <HeaderNavAuth>
          {user ? <Avatar onClick={() => console.log('lol')} src={user.photoURL || ''} alt="Profile Image" /> :
          <Button onClick={onSignInClick} size="small"><ButtonLogo src={steamLogo} alt="steam logo" />Sign In</Button>}
        </HeaderNavAuth>
      </HeaderNav>
    </Root>
  );
}

export default Header;
