import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AssetCard, { Asset } from 'components/AssetCard';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Heading from 'components/Heading';
import ButtonGroup from 'components/ButtonGroup';

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
`;

const SectionActions = styled.div`
  display: flex;
  flex-direction: column;
`;

function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);
  const [menuSort, setMenuSort] = useState<{[key: string]: string}>({});
  const [menuFilter, setMenuFilter] = useState<{[key: string]: string | undefined}>({});
  const [menuError, setMenuError] = useState<Error | null>(null);

  useEffect(() => {
    async function getMenuData(): Promise<void> {
      try {
        // Retireve the API data
        const [mostPopular, newestReleases] = await Promise.all([
          axios.get<Asset[]>('/sandbox-asset-list?order=popular'),
          axios.get<Asset[]>('/sandbox-asset-list?order=newest'),
        ]);

        // Update the state
        setMenuItems([
          {
            title: 'Most Popular',
            description: 'The most popular assets to date',
            packages: mostPopular.data,
          },
          {
            title: 'Recent',
            description: 'Fresh gamemodes and maps for your pleasure.',
            packages: newestReleases.data,
          },
        ]);
      } catch (error) {
        console.error(error);
        setMenuError(error as Error);
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
      {menuItems.map((item) => (
        <Section key={item.title}>
          <SectionHeader>
            <div>
              <Heading title={item.title} subtitle={item.description} />
            </div>
            <SectionActions>
              <ButtonGroup
                label="Sort By"
                options={['recent', 'alphabetical', 'creator']}
                onChange={(sort) => {
                  setMenuSort({
                    ...menuSort,
                    [item.title]: sort,
                  });
                }}
              />
            </SectionActions>
          </SectionHeader>
        </Section>
      ))}
    </Root>
  );
}

export default Menu;
