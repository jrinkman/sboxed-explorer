import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
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

interface InfoLinkProps {
  paddingTop?: boolean;
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

const Header = styled.div`
  display: flex;
  align-items: center;
  & h1 {
    color: white;
    font-size: 2.5rem;
    margin: 0;
  }
  & .logo {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    border-radius: 50%;
  }
`;

const Subheader = styled.span`
  color: white;
  opacity: 0.6;
  font-weight: 400;
  font-size: 1.5rem;
  max-width: 600px;
  margin-top: 24px;
`;

const Description = styled.span`
  color: white;
  opacity: 0.9;
  font-size: 1rem;
  margin-top: 55px;
  margin-bottom: 35px;
  width: 75%;
`;

const Date = styled.span`
  color: white;
  opacity: 0.4;
  font-weight: 500;
  font-size: 1.1rem;
  margin-top: 6px;
`;

const InfoLink = styled.a<InfoLinkProps>`
  color: #00A2FF;
  opacity: 1;
  font-weight: 500;
  font-size: 1.1rem;
  margin-top: ${(props) => (props.paddingTop ? '24px' : '6px')};
  transition: opacity 100ms ease-out;
  text-decoration: none;
  &:hover {
    opacity: 0.6;
  }
`;

const Button = styled.button`
  color: white;
  font-weight: 700;
  padding: 12px 24px 12px 24px;
  border: 0;
  border-radius: 12px;
  background-color: #00A2FF;
  font-family: "Poppins", sans-serif;
  transition: background-color 100ms ease-out;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    background-color: #2b5797;
  }
`;

// const Chip = styled.div`
//   color: white;
//   padding: 6px 8px 6px 8px;
//   border-radius: 16px;
//   font-weight: 700;
//   font-size: 1rem;
//   background-color: rgba(0,0,0,0.4);
//   backdrop-filter: blur(10px);
//   cursor: default;
//   user-select: none;
//   margin-right: 10px;
// `;

interface InfoRouteParams {
  id: string;
}

function Info() {
  const [gamemode, setGamemode] = useState<GamemodeInfo | null>(null);
  const [menuError, setMenuError] = useState<Error | null>(null);
  const { id } = useParams<InfoRouteParams>();
  const history = useHistory();

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

  // Format the date number to a string
  const dateString = DateTime.fromMillis(gamemode.asset.updated * 1000).toFormat('d LLL h:mm a');

  const handleBackClick = () => {
    history.push('/');
  };

  return (
    <>
      <Background background={gamemode.asset.background} />
      <Root>
        <Header>
          <img className="logo" src={gamemode.asset.org.thumb || '/apple-touch-icon.png'} alt="org thumbnail" />
          <h1>{gamemode.asset.title}</h1>
        </Header>
        <Date>
          By {gamemode.asset.org.title},
          {' '} Updated {dateString} (Pkg Type {gamemode.asset.packageType})
        </Date>
        <Subheader>{gamemode.asset.summary}</Subheader>
        <InfoLink href={gamemode.asset.org.socialWeb || '#'} paddingTop>🔗 Website</InfoLink>
        <InfoLink href={gamemode.asset.org.socialTwitter || '#'}>🐦 Twitter</InfoLink>
        <Description>{gamemode.asset.description}</Description>
        <div>
          <Button
            style={{ marginRight: 10 }}
            onClick={() => window.open(gamemode.asset.downloadUrl)}
          >
            Download
          </Button>
          <Button onClick={handleBackClick}>Go Back</Button>
        </div>
      </Root>
    </>
  );
}

export default Info;
