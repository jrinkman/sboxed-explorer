import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AssetCard, { Asset } from 'components/AssetCard';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Heading from 'components/Heading';
import ButtonGroup from 'components/ButtonGroup';
import assetSortFuncs from 'helpers/assetSortFuncs';

interface MenuItem {
  title: string;
  description: string;
  packages: Asset[];
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

function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);
  const [menuSort, setMenuSort] = useState<{[key: string]: string}>({});
  const [menuError, setMenuError] = useState<Error | null>(null);

  useEffect(() => {
    async function getMenuData(): Promise<void> {
      try {
        // Retireve the API data
        const { data } = (await axios.get<MenuItem[]>('/menu'));

        // Update the state
        setMenuItems(data);
      } catch (error) {
        console.error(error);
        setMenuError(error);
      }
    }

    getMenuData();
  }, []);

  if (menuError) {
    return <Message title="An error occured" subtitle="Check the console for more details." paddingBottom />;
  }
  if (!menuItems) return <Loader paddingBottom />;

  return (
    <Root>
      {menuItems.map((menuItem) => (
        <Section key={menuItem.title}>
          <SectionHeader>
            <div>
              <Heading title={menuItem.title} subtitle={menuItem.description} />
            </div>
            <ButtonGroup
              title="Sort By"
              options={['recent', 'alphabetical', 'creator']}
              onChange={(sort) => {
                setMenuSort({
                  ...menuSort,
                  [menuItem.title]: sort,
                });
              }}
            />
          </SectionHeader>
          <div className="packages">
            {menuItem.packages.sort(assetSortFuncs[menuSort[menuItem.title] || 'recent']).map((asset) => <AssetCard key={asset.ident} asset={asset} />)}
          </div>
        </Section>
      ))}
    </Root>
  );
}

export default Menu;
