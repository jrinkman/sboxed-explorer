import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  subtitle?: string;
  paddingBottom?: boolean;
}

interface RootProps {
  paddingBottom?: boolean;
}

const Root = styled.div<RootProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: ${(props) => (props.paddingBottom ? '98px' : '0px')};
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  margin: 0;
`;

const Subtitle = styled.span`
  color: white;
  opacity: 0.6;
  font-weight: 400;
  font-size: 1rem;
`;

function Loader(props: Props) {
  const { title, subtitle, paddingBottom } = props;

  return (
    <Root paddingBottom={Boolean(paddingBottom)}>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Root>
  );
}

export default Loader;
