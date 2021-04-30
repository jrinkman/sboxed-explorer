import React from 'react';
import styled from 'styled-components';
import ButtonGroup from 'components/ButtonGroup';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 40px;
  padding-right: 40px;
`;

function Dev() {
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
    </Root>
  );
}

export default Dev;
