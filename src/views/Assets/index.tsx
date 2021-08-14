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
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  .packages {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: rgba(33, 43, 54, 0.5);
    height: calc(100vh - 235px);
    padding-top: 20px;
    padding-left: 40px;
    margin-left: -12px;
    overflow-y: auto;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 32px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 10;
`;

const SectionActions = styled.div`
  display: flex;
  flex-direction: column;
`;

interface RouteParams {
  type: string;
}

function capitalize(input: string) {
  if (input.length < 2) return '';
  return input.charAt(0).toUpperCase() + input.slice(1);
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

  // Sort functions
  const filteredAssets = assets?.filter(assetSearch(filter));
  return (
    <Root>
      <Section>
        <SectionHeader>
          <div>
            <Heading
              title={`${capitalize(assetType)}s`}
              subtitle={assets ? `Retrieved ${assets.length} ${assetType}s from the API` : 'Making API request'}
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
          {assets ? filteredAssets?.sort(assetFuncs[sortBy]).map(
            (asset) => <Card key={asset.ident} asset={asset} />,
          ) : <Loader paddingBottom />}
        </div>
      </Section>
    </Root>
  );
}

export default Assets;
