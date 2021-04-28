import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Card, { Asset } from 'components/AssetCard';
import Loader from 'components/Loader';
import Message from 'components/Message';
import pkgTypeString from 'helpers/pkgTypeString';

interface AssetResponse {
  type: number;
  assets: Asset[];
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 40px;
  padding-right: 40px;
`;

const Section = styled.section`
  display: flex;
  padding-bottom: 48px;
  flex-direction: column;
  .packages {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
    margin-left: -12px;
    margin-right: -12px;
  }
`;

const Header = styled.h1`
  color: white;
  font-size: 2rem;
  margin: 0;
`;

const Subheader = styled.span`
  color: white;
  opacity: 0.6;
  font-weight: 400;
  font-size: 1rem;
`;

interface RouteParams {
  type: string;
}

function Assets() {
  const [assets, setAssets] = useState<AssetResponse | null>(null);
  const [assetError, setAssetError] = useState<Error | null>(null);
  const { type: assetType } = useParams<RouteParams>();

  useEffect(() => {
    let cancelPromise: boolean = false;
    async function getMenuData(): Promise<void> {
      try {
        // Reset the state in the case that we're navigating to the same route
        if (assets) setAssets(null);

        // Load the API data
        const { data } = await axios.get<AssetResponse>(`/asset/find/${assetType}`);

        // Update the state
        if (!cancelPromise) {
          setAssets(data);
        }
      } catch (error) {
        console.error(error);
        setAssetError(error);
      }
    }

    getMenuData();

    return () => {
      cancelPromise = true;
    };
  }, [assetType]);

  if (assetError) {
    return <Message title="An error occured" subtitle="Check the console for more details." paddingBottom />;
  }
  if (!assets) return <Loader paddingBottom />;

  const assetTypeName = pkgTypeString(assets.type);
  return (
    <Root>
      <Section>
        <div className="header">
          <Header>{assetTypeName}s</Header>
          <Subheader>Retrieved {assets.assets.length} {assetTypeName}s from the API</Subheader>
        </div>
        <div className="packages">
          {assets.assets.map((asset) => <Card key={asset.ident} asset={asset} />)}
        </div>
      </Section>
    </Root>
  );
}

export default Assets;
