import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Card, { Asset } from 'components/AssetCard';
import Search from 'components/Search';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Heading from 'components/Heading';
import ButtonGroup from 'components/ButtonGroup';
import pkgTypeString from 'helpers/pkgTypeString';

// Asset sorting & searching functions
import assetFuncs from 'helpers/assetFuncs';
import assetSearch from 'helpers/assetSearch';

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
`;

const SectionActions = styled.div`
  display: flex;
  flex-direction: column;
`;

interface RouteParams {
  type: string;
}

function Assets() {
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const [assetError, setAssetError] = useState<Error | null>(null);
  const [sortBy, setSortBy] = useState<string>('recent');
  const [filter, setFilter] = useState<string>('');
  const { type: assetType } = useParams<RouteParams>();

  useEffect(() => {
    let cancelPromise: boolean = false;
    async function getAssets(): Promise<void> {
      try {
        // Reset the state in the case that we're navigating to the same route
        if (assets) setAssets(null);
        setSortBy('recent');
        setFilter('');

        // Load the API data
        const { data } = await axios.get<Asset[]>(`/asset/list?type=${assetType}`);

        // Update the state
        if (!cancelPromise) {
          setAssets(data);
        }
      } catch (error) {
        console.error(error);
        setAssetError(error);
      }
    }

    // Make the API call
    getAssets();
    return () => { cancelPromise = true; };
  }, [assetType]);

  if (assetError) return <Message title="An error occured" subtitle="Check the console for more details." paddingBottom />;
  if (!assets) return <Loader paddingBottom />;

  // Sort functions
  const filteredAssets = assets.filter(assetSearch(filter));
  return (
    <Root>
      <Section>
        <SectionHeader>
          <div>
            <Heading
              title={`${assetType}s`}
              subtitle={`Retrieved ${assets.length} ${assetType}s from the API`}
            />
          </div>
          <SectionActions>
            <ButtonGroup
              label="Sort By"
              options={['recent', 'alphabetical', 'creator']}
              onChange={(sort) => setSortBy(sort)}
            />
            <Search
              width={340}
              marginTop={5}
              placeholder="Enter filter (e.g. 'Sandbox')"
              onChange={(e) => setFilter(e.target.value)}
            />
          </SectionActions>
        </SectionHeader>
        <div className="packages">
          {filteredAssets.sort(assetFuncs[sortBy]).map(
            (asset) => <Card key={asset.ident} asset={asset} />,
          )}
        </div>
      </Section>
    </Root>
  );
}

export default Assets;
