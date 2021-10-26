import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Select, { Styles, GroupTypeBase } from 'react-select';
import Card, { Asset } from 'components/AssetCard';
import Search from 'components/Search';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Heading from 'components/Heading';
import ButtonGroup from 'components/ButtonGroup';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

interface SectionProps {
  isGamemode: boolean,
}

const Section = styled.section<SectionProps>`
  display: flex;
  flex-direction: column;
  .packages {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: rgba(33, 43, 54, 0.5);
    height: calc(100vh - ${(props) => (props.isGamemode ? 280 : 235)}px);
    padding: 20px 20px 0px 20px;
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

const CategoryOptions = [
  { value: 16, label: '👊 Fighting' },
  { value: 1, label: '🧱 Sandbox' },
  { value: 3, label: '⚽ Sports' },
  { value: 4, label: '🔫 Shooting' },
  { value: 5, label: '🏃 Parkour' },
  { value: 6, label: '🍿 Social' },
  { value: 8, label: '🎭 Roleplay' },
  { value: 9, label: '🏁 Racing' },
  { value: 10, label: '🕵 Mystery' },
  { value: 11, label: '⛏️ Survival' },
  { value: 12, label: '🐇 Animals' },
  { value: 13, label: '🌭 Food' },
  { value: 17, label: '👾 Retro' },
  { value: 18, label: '🎺 Music' },
  { value: 14, label: '🧠 Strategy' },
  { value: 15, label: '👩‍🚀 Space' },
  { value: 20, label: '💵 Tycoon' },
  { value: 19, label: '🎨 Art' },
  { value: 2, label: '🧪 Tech Demo / Experiments' },
  { value: 7, label: '💩 Meme' },
];

type CategoryStyleConfig = Partial<Styles<{
  value: number;
  label: string;
}, false, GroupTypeBase<{
  value: number;
  label: string;
}>>>

const CategoryStyles: CategoryStyleConfig = {
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    opacity: 0.6,
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: 'white !important',
    opacity: state.isFocused ? 0.8 : 0.5,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: 'white !important',
    opacity: state.isFocused ? 0.8 : 0.5,
  }),
  control: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    borderRadius: state.isFocused ? 15 : 20,
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 5,
    height: 40,
    color: 'white',
    backgroundColor: '#1c2635',
    outline: 'none',
    borderColor: state.menuIsOpen ? '#36404F !important' : 'transparent !important',
    boxShadow: 'none',
    borderWidth: 2.5,
    borderStyle: 'solid',
    // border: state.menuIsOpen ? '2.5px solid #36404F' : '2.5px solid transparent',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 20,
    backgroundColor: '#1c2635',
    paddingTop: 10,
    paddingBottom: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'white',
    cursor: 'pointer',
    opacity: state.isSelected || state.isFocused ? 1 : 0.4,
    backgroundColor: state.isFocused ? 'rgba(145,158,171,0.24)' : 'transparent',
    fontSize: 14,
    fontWeight: state.isSelected ? 600 : 500,
    borderRadius: 20,
  }),
};

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
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [category, setCategory] = useState<number | null>(null);
  const [search, setSearch] = useState<string>('');
  const { type: assetType } = useParams<RouteParams>();

  useEffect(() => {
    let cancelPromise: boolean = false;
    async function getAssets(): Promise<void> {
      try {
        // Reset the state in the case that we're navigating to the same route
        if (assets) setAssets(null);

        // Load the API data
        const url = `/asset/list?type=${assetType}&order=${sortOrder}${search.length > 0 ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`;
        const { data } = await axios.get<Asset[]>(url);

        // Update the state
        if (!cancelPromise) {
          setAssets(data);
        }
      } catch (error) {
        console.error(error);
        setAssetError(error as Error);
      }
    }

    // Make the API call
    getAssets();
    return () => { cancelPromise = true; };
  }, [assetType, sortOrder, search, category]);

  if (assetError) return <Message title="An error occured" subtitle="Check the console for more details." paddingBottom />;

  return (
    <Root>
      <Section isGamemode={assetType === 'gamemode'}>
        <SectionHeader>
          <div>
            <Heading
              title={`${capitalize(assetType)}s`}
              subtitle={assets ? `Retrieved ${assets.length} ${assetType}s from the API` : 'Making API request'}
            />
          </div>
          <SectionActions>
            <Search
              marginBottom={5}
              width={340}
              placeholder="Enter search terms"
              onSubmit={(value) => setSearch(value)}
            />
            {assetType === 'gamemode' && (
            <Select
              options={CategoryOptions}
              styles={CategoryStyles}
              placeholder="Choose category"
              isClearable
              onChange={(data) => setCategory(data?.value || null)}
            />
            )}
            <ButtonGroup
              label="Sort Order"
              options={['newest', 'popular', 'trending', 'live']}
              onChange={(sort) => {
                setSortOrder(sort);
              }}
            />
          </SectionActions>
        </SectionHeader>
        <div className="packages">
          {assets ? assets.map(
            (asset, index) => <Card key={`${asset.Ident}${index * 2}`} asset={asset} />,
          ) : <Loader paddingBottom />}
        </div>
      </Section>
    </Root>
  );
}

export default Assets;
