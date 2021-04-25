import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Loader from '../../base/Loader';
import Message from '../../base/Message';

interface GamemodeInfo {
  asset: {
    org: {
      ident: string;
      title: string;
      description: string;
      thumb: string;
      socialTwitter: string;
      socialWeb: string;
    },
    ident: string;
    title: string;
    summary: string;
    description: string;
    thumb: string;
    background: string;
    packageType: number;
    downloadUrl: string;
    updated: number;
  }
}

interface RootProps {
  background: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 40px;
`;

const Background = styled.div<RootProps>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -100;
  background-image: url("${(props) => props.background}");
  background-size: cover;
  opacity: 0.1;
`;

const Header = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin: 0;
`;

const Subheader = styled.span`
  color: white;
  opacity: 0.6;
  font-weight: 400;
  font-size: 1.5rem;
`;

const Description = styled.span`
  color: white;
  opacity: 0.8;
  font-size: 1rem;
  margin-top: 55px;
  width: 50%;
`;

interface InfoRouteParams {
  id: string;
}

function Info() {
  const [gamemode, setGamemode] = useState<GamemodeInfo | null>(null);
  const [menuError, setMenuError] = useState<Error | null>(null);
  const { id } = useParams<InfoRouteParams>();

  useEffect(() => {
    async function getMenuData(): Promise<void> {
      try {
        setGamemode((await axios.get(`/asset/get?id=${id}`)).data as GamemodeInfo);
      } catch (error) {
        console.error(error);
        setMenuError(error);
      }
    }

    getMenuData();
  }, []);

  if (menuError) {
    return <Message title="An error occured" subtitle="Looks like we couldn't find that gamemode." paddingBottom />;
  }
  if (!gamemode) return <Loader paddingBottom />;

  return (
    <>
      <Background background={gamemode.asset.background} />
      <Root>
        <Header>{gamemode.asset.title}</Header>
        <Subheader>{gamemode.asset.summary}</Subheader>
        <Description>{gamemode.asset.description}</Description>
      </Root>
    </>
  );
}

export default Info;
