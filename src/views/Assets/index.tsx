import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Card, { Asset } from 'components/AssetCard';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Heading from 'components/Heading';
import ButtonGroup from 'components/ButtonGroup';
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

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface RouteParams {
  type: string;
}

function Assets() {
  const [assets, setAssets] = useState<AssetResponse | null>(null);
  const [assetError, setAssetError] = useState<Error | null>(null);
  const [sortBy, setSortBy] = useState<string>('recent');
  const { type: assetType } = useParams<RouteParams>();

  useEffect(() => {
    let cancelPromise: boolean = false;
    async function getMenuData(): Promise<void> {
      try {
        // Reset the state in the case that we're navigating to the same route
        if (assets) setAssets(null);
        setSortBy('recent');

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

  if (assetError) return <Message title="An error occured" subtitle="Check the console for more details." paddingBottom />;
  if (!assets) return <Loader paddingBottom />;

  // Sort functions
  if (sortBy === 'recent') assets.assets = assets.assets.sort((a, b) => b.updated - a.updated);
  if (sortBy === 'alphabetical') {
    assets.assets = assets.assets.sort((a, b) => {
      const aVal = a.title.toLowerCase();
      const bVal = b.title.toLowerCase();
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    });
  }

  // Get the display name of the package type
  const assetTypeName = pkgTypeString(assets.type);
  return (
    <Root>
      <Section>
        <SectionHeader>
          <div>
            <Heading
              title={`${assetTypeName}s`}
              subtitle={`Retrieved ${assets.assets.length} ${assetTypeName}s from the API`}
            />
          </div>
          <ButtonGroup
            options={['recent', 'alphabetical']}
            onChange={(sort) => setSortBy(sort)}
          />
        </SectionHeader>
        <div className="packages">
          {assets.assets.map((asset) => <Card key={asset.ident} asset={asset} />)}
        </div>
      </Section>
    </Root>
  );
}

export default Assets;
