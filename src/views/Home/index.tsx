import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AssetCard from 'components/AssetCard';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

interface MenuItem {
  title: string;
  description: string;
  packages: GamemodePackage[];
}

interface GamemodePackage {
  org: {
    ident: string;
    title: string;
  };
  ident: string;
  title: string;
  summary: string;
  thumb: string;
  packageType: number;
  updated: number;
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

function Gamemodes() {
  const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);
  const [menuError, setMenuError] = useState<Error | null>(null);

  useEffect(() => {
    async function getMenuData(): Promise<void> {
      try {
        setMenuItems((await axios.get('/menu')).data as MenuItem[]);
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
          <div className="header">
            <Header>{menuItem.title}</Header>
            <Subheader>{menuItem.description}</Subheader>
          </div>
          <div className="packages">
            {menuItem.packages.map((asset) => <AssetCard key={asset.ident} asset={asset} />)}
          </div>
        </Section>
      ))}
    </Root>
  );
}

export default Gamemodes;
export type { GamemodePackage };
