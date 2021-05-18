import React, { useState } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  margin-right: 5px;
`;

const Label = styled.div`
  color: white;
  background-color: #2b5797;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  user-select: none;
  padding: 2px 12px 2px 12px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const Text = styled.div`
  color: white;
  background-color: rgba(255,255,255,0.15);
  font-size: 13px;
  font-weight: 500;
  user-select: none;
  padding: 2px 12px 2px 12px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

interface Props {
  label: string;
  text: string;
}

function LabelChip(props: Props) {
  const { label, text } = props;

  return (
    <Root>
      <Label>{label}</Label>
      <Text>{text}</Text>
    </Root>
  );
}

export default LabelChip;
