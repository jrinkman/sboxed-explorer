import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import axios from 'axios';
import styled from 'styled-components';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Button from 'components/Button';
import Background from 'components/Background';
import pkgTypeString from 'helpers/pkgTypeString';

interface AssetInfo {
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

interface InfoLinkProps {
  paddingTop?: boolean;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 40px;
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

const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 45px;
  margin-bottom: 45px;
  width: 75%;
`;

const DescriptionItem = styled.span`
  color: white;
  opacity: 0.9;
  font-size: 1rem;
  height: 25px;
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

const Chip = styled.div`
  color: white;
  padding: 6px 8px 6px 8px;
  border-radius: 16px;
  font-weight: 700;
  font-size: 1rem;
  background-color: rgba(0,0,0,0.4);
  backdrop-filter: blur(10px);
  cursor: default;
  user-select: none;
  margin-left: 10px;
`;

const Actions = styled.div`
  display: flex;
  padding-bottom: 40px;
`;

interface InfoRouteParams {
  id: string;
}

function generateDescription(description?: string) {
  if (description) {
    console.log(description);
    // Split each newline character into its own item
    return description.split('\r\n').map((content) => <DescriptionItem>{content}</DescriptionItem>);
  }

  // Return a placeholder description
  return <DescriptionItem>No description provided</DescriptionItem>;
}

function Info() {
  const [assetInfo, setAssetInfo] = useState<AssetInfo | null>(null);
  const [assetInfoError, setAssetInfoError] = useState<Error | null>(null);
  const { id } = useParams<InfoRouteParams>();
  const history = useHistory();

  useEffect(() => {
    async function getMenuData(): Promise<void> {
      try {
        // Load the data from the API
        const { data } = (await axios.get<AssetInfo>(`/asset/get/${id}`));

        // Update the state
        setAssetInfo(data);
      } catch (error) {
        console.error(error);
        setAssetInfoError(error);
      }
    }

    getMenuData();
  }, []);

  if (assetInfoError) {
    return <Message title="An error occured" subtitle="Looks like we couldn't find anything." paddingBottom />;
  }
  if (!assetInfo) return <Loader paddingBottom />;
  const { asset } = assetInfo;

  // Format the date number to a string
  const dateString = DateTime.fromMillis(asset.updated * 1000).toFormat('d LLL h:mm a');

  const handleOpenClick = () => {
    // window.open('steam://run/4000');
    window.open('steam://run/590830');
    window.focus();
  };

  const handleBackClick = () => {
    const path = history.location.pathname;
    history.push(path.substring(0, path.lastIndexOf('/')));
  };

  return (
    <>
      <Background background={asset.background} />
      <Root>
        <Header>
          <img className="logo" src={asset.org.thumb || '/apple-touch-icon.png'} alt="org thumbnail" />
          <h1>{asset.title}</h1>
          <Chip>{pkgTypeString(asset.packageType)}</Chip>
        </Header>
        <Date>
          By {asset.org.title},
          {' '} Updated {dateString}
        </Date>
        <Subheader>{asset.summary || 'No summary provided'}</Subheader>
        <InfoLink href={asset.org.socialWeb || '#'} paddingTop>🔗 Website</InfoLink>
        <InfoLink href={asset.org.socialTwitter || '#'}>🐦 Twitter</InfoLink>
        <Description>{generateDescription(asset.description)}
        </Description>
        <Actions>
          <Button
            disabled
            style={{ marginRight: 10 }}
            onClick={handleOpenClick}
          >
            Open in s&box
          </Button>
          <Button
            type="button"
            style={{ marginRight: 10 }}
            onClick={() => window.open(asset.downloadUrl || '#')}
          >
            Download
          </Button>
          <Button type="button" onClick={handleBackClick}>Go Back</Button>
        </Actions>
      </Root>
    </>
  );
}

export default Info;
export type { AssetInfo };
