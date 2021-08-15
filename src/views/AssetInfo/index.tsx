import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import {
  ExternalLink, Activity, User, Calendar, Users,
} from 'react-feather';
import axios from 'axios';
import styled from 'styled-components';
import prettyBytes from 'pretty-bytes';
import pkgTypeString from 'helpers/pkgTypeString';

// Components import
import Chip from 'components/Chip';
import LabelChip from 'components/LabelChip';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Button from 'components/Button';
import Background from 'components/Background';

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
    download: {
      type: string;
      url: string;
      crc?: number;
      size?: number;
    };
    updated: number;
    usersNow: number;
    usersDay: number;
    usersMonth: number;
    usersTotal: number;
    tags: string[];
    config: {
      showMapSelect: boolean;
      defaultMap: string;
      maxPlayers: 36;
      minPlayers: 1;
      clientDownloadShared: boolean;
    } | null;
  }
}

interface InfoLinkProps {
  paddingTop?: boolean;
}

interface SideheaderProps {
  paddingTop?: boolean;
}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding: 20px 40px 40px 0px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 40px;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 250px;
  max-width: 250px;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(16px);
  padding: 20px;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  .content {
    display: flex;
    flex-direction: column;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & h1 {
    color: white;
    font-size: 2.5rem;
    margin: 0;
    margin-right: 10px;
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
  opacity: 0.7;
  font-weight: 400;
  font-size: 1.5rem;
  max-width: 600px;
  margin-top: 24px;
`;

const Description = styled.span`
  color: white;
  opacity: 0.9;
  font-size: 1rem;
  white-space: pre-wrap;
  min-height: 25px;
  margin-top: 45px;
  margin-bottom: 5px;
  padding-right: 25%;
  overflow-y: auto;
`;

const Date = styled.span`
  color: white;
  opacity: 0.4;
  font-weight: 500;
  font-size: 1.1rem;
  margin-top: 6px;
`;

const Sideheader = styled.span<SideheaderProps>`
  color: white;
  font-size: 1.3rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  ${(props) => (props.paddingTop ? 'margin-top: 24px;' : '')}
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  opacity: 0.6;
  font-size: 1.1rem;
  margin-top: 6px;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .tag {
    color: white;
    font-size: 0.8em;
    font-weight: 600;
    padding: 4px 8px 4px 8px;
    background-color: rgba(0, 162, 255, 0.8);
    border-radius: 4px;
    margin-right: 4px;
    margin-top: 4px;
    user-select: none;
  }
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

const MapLink = styled(Link)`
  text-decoration: none;
  transition: opacity 100ms ease-out;
  &:hover {
    opacity: 0.7;
  }
`;

const Config = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 600px;
  margin-top: 15px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityIcon = styled(Activity)`
  margin-right: 5px;
`;

const UserIcon = styled(User)`
  margin-right: 5px;
`;

const UsersIcon = styled(Users)`
  margin-right: 5px;
`;

const CalendarIcon = styled(Calendar)`
  margin-right: 5px;
`;

const LinkIcon = styled(ExternalLink)`
  margin-bottom: 2px;
  margin-right: 12px;
`;

interface RouteParams {
  id: string;
  type: string;
}

function Info() {
  const [assetInfo, setAssetInfo] = useState<AssetInfo | null>(null);
  const [assetInfoError, setAssetInfoError] = useState<Error | null>(null);
  const { id, type } = useParams<RouteParams>();
  const history = useHistory();

  useEffect(() => {
    let cancelPromise: boolean = false;
    async function getAssetInfo(): Promise<void> {
      try {
        // Reset the state in the case that we're navigating to the same route
        setAssetInfoError(null);
        if (assetInfo) setAssetInfo(null);

        // Load the data from the API
        const { data } = (await axios.get<AssetInfo>(`/asset/get?id=${id}`));

        // Update the state
        if (!cancelPromise) {
          setAssetInfo(data);
        }
      } catch (error) {
        console.error(error);
        setAssetInfoError(error);
      }
    }

    // Make the API call
    getAssetInfo();
    return () => { cancelPromise = true; };
  }, [id]);

  if (assetInfoError) {
    return <Message title="An error occured" subtitle="Looks like we couldn't find anything." paddingBottom />;
  }

  // If we haven't recieved any API data, return the loader
  if (!assetInfo) return <Loader paddingBottom />;
  const { asset } = assetInfo;

  // Format the date number to a string
  const dateString = DateTime.fromMillis(asset.updated * 1000).toFormat('d LLL h:mm a');

  // Handle 'open' button clicks
  const handleMapViewClick = () => {
    window.open(`https://maps.sbox.gg/noclip/${id}`, '_blank');
  };

  // Handle 'back' button clicks
  const handleBackClick = () => {
    const path = history.location.pathname;
    history.push(path.substring(0, path.lastIndexOf('/')));
  };

  return (
    <>
      <Background background={asset.background} />
      <Root>
        <Side>
          <div className="content">
            <Sideheader>Player Counts</Sideheader>
            <Stats>
              <span><ActivityIcon size={15} /> {asset.usersNow} Now</span>
              <span><UserIcon size={15} /> {asset.usersDay} Today</span>
              <span><UsersIcon size={15} /> {asset.usersMonth} Month</span>
              <span><CalendarIcon size={15} /> {asset.usersTotal} Total</span>
            </Stats>
            {type === 'gamemode' && asset.tags.length > 0 && (
              <>
                <Sideheader paddingTop>Tags</Sideheader>
                <Tags>
                  {asset.tags.map((tag) => <span className="tag">{tag}</span>)}
                </Tags>
              </>
            )}
          </div>
          <Actions>
            {/* <Button
              disabled
              style={{ marginRight: 10 }}
              onClick={handleOpenClick}
            >
              Open in s&box
            </Button> */}
            {type === 'map' && (
            <Button
              disabled={assetInfo.asset.packageType !== 1}
              style={{ marginBottom: 10 }}
              variant="outlined"
              onClick={handleMapViewClick}
              hasIcon
            >
              <LinkIcon size={18} strokeWidth={3} /> Scott&apos;s Map Viewer
            </Button>
            )}
            <Button
              type="button"
              style={{ marginBottom: 10 }}
              variant="outlined"
              onClick={() => window.open(asset.download.url || '#')}
            >
              Download
            </Button>
            <Button type="button" variant="outlined" onClick={handleBackClick}>Go Back</Button>
          </Actions>
        </Side>
        <Main>
          <Header>
            <img className="logo" src={asset.org.thumb || '/apple-touch-icon.png'} alt="org thumbnail" />
            <h1>{asset.title}</h1>
            <Chip marginLeft={10}>{pkgTypeString(asset.packageType)}</Chip>
            <Chip marginLeft={10}>{asset.download.type.toUpperCase()}{asset.download.type === 'upload' && ` - ${prettyBytes(asset.download.size || 0)}`}</Chip>
          </Header>
          <Date>
            By {asset.org.title},
            {' '} Updated {dateString}
          </Date>
          {asset.config && (
          <Config>
            <MapLink to={`/assets/map/${asset.config.defaultMap}`}><LabelChip label="default map" text={asset.config.defaultMap} /></MapLink>
            <LabelChip label="min players" text={asset.config.minPlayers.toString()} />
            <LabelChip label="max players" text={asset.config.maxPlayers.toString()} />
            <LabelChip label="show map select" text={asset.config.showMapSelect.toString()} />
            <LabelChip label="client download shared" text={asset.config.clientDownloadShared.toString()} />
          </Config>
          )}
          <Subheader>{asset.summary || 'No summary provided'}</Subheader>
          <InfoLink href={asset.org.socialWeb || '#'} paddingTop>🔗 Website</InfoLink>
          <InfoLink href={asset.org.socialTwitter || '#'}>🐦 Twitter</InfoLink>
          <Description>{asset.description}</Description>
        </Main>
      </Root>
    </>
  );
}

export default Info;
export type { AssetInfo };
