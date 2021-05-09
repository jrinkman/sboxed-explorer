import React from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';

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

function Header() {
  return (
    <Root>
      <HeaderLogo>
        <HeaderLogoLink to="/">
          <HeaderLogoImage src="/logo192.png" alt="logo" />
          <span>api explorer</span>
        </HeaderLogoLink>
        <HeaderLogoLink to="/changelog">
          <span className="version">v1.3.4</span>
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
      </HeaderNav>
    </Root>
  );
}

export default Header;
