import React from 'react';
import styled from 'styled-components';
import Background from 'components/Background';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 98px;
  align-text: center;
`;

const Header = styled.h1`
  color: white;
  font-size: 3rem;
  margin: 0;
`;

const Subheader = styled.span`
  color: white;
  opacity: 0.6;
  font-weight: 400;
  font-size: 1.8rem;
`;

function Home() {
  return (
    <>
      <Background background="https://files.facepunch.com/garry/520632a2-e9d1-43c3-a51f-b059a73e407d.jpg" />
      <Root>
        <Header>s&box API Explorer</Header>
        <Subheader>v1.3 by astrojaxx</Subheader>
      </Root>
    </>
  );
}

export default Home;
