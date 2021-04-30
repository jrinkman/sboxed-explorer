import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  subtitle?: string;
}

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

function Loader(props: Props) {
  const { title, subtitle } = props;

  return (
    <>
      <Header>{title}</Header>
      {subtitle && <Subheader>{subtitle}</Subheader>}
    </>
  );
}

export default Loader;
