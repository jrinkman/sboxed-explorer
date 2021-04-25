import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuCard from './components/Card';

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

function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);
  const [menuError, setMenuError] = useState<Error | null>(null);

  useEffect(() => {
    async function getMenuData(): Promise<void> {
      try {
        setMenuItems((await axios.get('/menu/index')).data as MenuItem[]);
      } catch (error) {
        console.error(error);
        setMenuError(error);
      }
    }

    getMenuData();
  }, []);

  if (menuError) {
    return (
      <div>
        An error occured.
        {JSON.stringify(menuError)}
      </div>
    );
  }
  if (!menuItems) return <div>loading...</div>;

  return (
    <div>
      {menuItems.map((menuItem) => (
        <section>
          <h1>{menuItem.title}</h1>
          {menuItem.packages.map((gamemode) => <MenuCard gamemode={gamemode} />)}
        </section>
      ))}
    </div>
  );
}

export default Home;
export type { GamemodePackage };
