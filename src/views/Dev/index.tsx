import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import ButtonRow from 'components/ButtonRow';
import openIDUrl from 'helpers/openIDUrl';
// import axios from 'axios';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 40px;
  padding-right: 40px;
`;

const Text = styled.p`
  color: white;
`;

function Dev() {
  // Callback for toggling store
  const toggleStore = (key: string, toggle: boolean = true) => {
    if (toggle) {
      localStorage.setItem(key, 'T');
    } else {
      localStorage.removeItem(key);
    }

    // Reload the window to refresh the store
    window.location.reload();
  };

  const onLoginClick = () => {
    console.log(openIDUrl());
    window.location.replace(openIDUrl());
  };

  return (
    <Root>
      <ButtonGroup
        options={['one']}
        onChange={(val) => console.log(val)}
      />
      <ButtonGroup
        options={['one', 'two']}
        onChange={(val) => console.log(val)}
      />
      <ButtonGroup
        options={['one', 'two', 'three']}
        onChange={(val) => console.log(val)}
      />
      <Text>DEV USE PROD API: {localStorage.getItem('dev-useProdApi') ? 'YES' : 'NO'}</Text>
      <ButtonRow marginRight={10}>
        <Button onClick={() => toggleStore('dev-useProdApi')}>[Store] Use Prod URL</Button>
        <Button onClick={() => toggleStore('dev-useProdApi', false)}>[Store] Use Local URL</Button>
      </ButtonRow>
      <ButtonRow marginRight={10}>
        <Button onClick={onLoginClick}>Login</Button>
      </ButtonRow>
    </Root>
  );
}

export default Dev;
