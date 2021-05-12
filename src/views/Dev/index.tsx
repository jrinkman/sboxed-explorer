import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import ButtonRow from 'components/ButtonRow';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';

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

const Code = styled.code`
  max-width: calc(100vw - 80px);
  white-space: pre;
  overflow-x: auto;
  color: white;
  margin-top: 12px;
  margin-bottom: 24px;
`;

function Dev() {
  const history = useHistory();

  // Callback for toggling store
  const onToggleStore = (key: string, toggle: boolean = true) => {
    if (toggle) { localStorage.setItem(key, 'T'); } else { localStorage.removeItem(key); }

    // Reload the window to refresh the store
    window.location.reload();
  };

  // Callback for signing in
  const onSignInClick = () => {
    window.location.replace(`${axios.defaults.baseURL}/auth`);
  };

  // Callback for signing out
  const onSignOutClick = async () => {
    console.log('Signing out...');
    await signOut(getAuth());
    console.log('Signed out.');
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
        <Button size="small" onClick={() => onToggleStore('dev-useProdApi')}>[Store] Use Prod URL</Button>
        <Button size="small" onClick={() => onToggleStore('dev-useProdApi', false)}>[Store] Use Local URL</Button>
      </ButtonRow>
      <Code>{JSON.stringify(getAuth().currentUser || {}, null, 2)}</Code>
      <ButtonRow marginRight={10}>
        <Button size="small" onClick={onSignInClick}>Sign In</Button>
        <Button size="small" onClick={onSignOutClick}>Sign Out</Button>
        <Button size="small" onClick={() => history.push('/auth')}>Goto Auth</Button>
      </ButtonRow>
    </Root>
  );
}

export default Dev;
