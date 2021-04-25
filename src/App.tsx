import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [menuData, setMenuData] = useState(null);
  const [menuError, setMenuError] = useState<Error | null>(null);

  useEffect(() => {
    async function getMenuData() {
      try {
        setMenuData((await axios.get('/menu/index')).data);
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
  if (!menuData) return <div>loading...</div>;

  return <div>{JSON.stringify(menuData)}</div>;
}

export default App;
