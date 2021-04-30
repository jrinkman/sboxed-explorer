import React from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import Background from 'components/Background';
import Button from 'components/Button';

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 112px;
  align-text: center;
`;

const Border = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  border-radius: 62px;
  width: 225px;
  height: 225px;
  margin-bottom: 62px;
`;

const Logo = styled.span`
  cursor: default;
  user-select: none;
  font-size: 10rem;
  font-weight: 800;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: white;
`;

const Header = styled.h1`
  color: white;
  font-size: 2.8rem;
  margin: 0;
`;

const Subheader = styled.span`
  color: white;
  opacity: 0.6;
  font-weight: 500;
  font-size: 1.8rem;
`;

const Link = styled.a`
  color: white;
  font-weight: 500;
  font-size: 1.8rem;
  text-decoration: none;
`;

const Actions = styled.div`
  display: flex;
  margin-top: 38px;
  button {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

function Home() {
  const history = useHistory();

  const handleChangelogClick = () => {
    history.push('/changelog');
  };

  const handleOpenClick = () => {
    // window.open('steam://run/4000');
    window.open('steam://run/590830');
    window.focus();
  };

  return (
    <>
      <Background background="https://files.facepunch.com/garry/520632a2-e9d1-43c3-a51f-b059a73e407d.jpg" />
      <Root>
        <Border>
          <Logo>&</Logo>
        </Border>
        <Header>API Explorer</Header>
        <Subheader>v1.3 <Link href="https://google.com">astrojaxx</Link></Subheader>
        <Actions>
          <Button onClick={handleChangelogClick}>View Changelog</Button>
          <Button onClick={handleOpenClick}>Open s&box</Button>
        </Actions>
      </Root>
    </>
  );
}

export default Home;
