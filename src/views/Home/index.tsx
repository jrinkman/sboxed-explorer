import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import Background from 'components/Background';
import ButtonRow from 'components/ButtonRow';
import Button from 'components/Button';

import logoSvg from 'assets/sbox-brand-light.svg';
import profileImg from 'assets/profile.png';

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 90px;
  align-text: center;
`;

const LogoSvg = styled.img`
  height: 175px;
  width: auto;
  margin-bottom: 24px;
`;

const Header = styled.h1`
  color: white;
  font-size: 2.8rem;
  margin: 0;
  user-select: none;
`;

const Credit = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 92px;
  color: white;
  font-weight: 500;
  font-size: 1.4rem;
  text-decoration: none;
  opacity: 0.6;
  user-select: none;
  transition: opacity 100ms ease-out;
  &:hover {
    opacity: 0.8;
  }
`;

const CreditImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;

const BottomLink = styled.div`
  padding-bottom: 64px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  cursor: default;
  user-select: none;
  margin-top: 14px;
  .link {
    color: white;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    opacity: 0.6;
    user-select: none;
    transition: opacity 100ms ease-out;
    &:hover {
      opacity: 1;
    }
  }
`;

function Home() {
  const history = useHistory();

  const handleChangelogClick = () => {
    history.push('/changelog');
  };

  const handleMenuClick = () => {
    history.push('/menu');
  };

  return (
    <>
      <Background background="https://files.facepunch.com/garry/520632a2-e9d1-43c3-a51f-b059a73e407d.jpg" />
      <Root>
        <LogoSvg src={logoSvg} />
        <Header>API Explorer</Header>
        <Credit href="https://steamcommunity.com/profiles/76561198161943355/" target="_blank" rel="noreferrer">
          <CreditImage src={profileImg} />
          by astrojaxx
        </Credit>
        <ButtonRow marginLeft={5} marginRight={5}>
          <Button onClick={handleChangelogClick}>Goto Changelog</Button>
          <Button onClick={handleMenuClick}>Goto Menu</Button>
        </ButtonRow>
        <BottomLink>
          This project uses <a className="link" href="https://github.com/jrinkman/sboxed-proxy" target="_blank" rel="noreferrer">sboxed-proxy</a>
        </BottomLink>
      </Root>
    </>
  );
}

export default Home;
