import React from 'react';
import styled from 'styled-components';

interface Props {
  size?: 'small' | 'medium' | 'large',
  hasIcon?: boolean,
}

const sizeString = (hasIcon: boolean) => ({
  small: `10px 20px 10px ${hasIcon ? 14 : 20}px`,
  medium: `12px 24px 12px ${hasIcon ? 18 : 24}px`,
  large: `14px 28px 14px ${hasIcon ? 22 : 28}px`,
});

export default styled.button<Props>`
  display: flex;
  align-items: center;
  color: white;
  font-weight: 700;
  padding: ${(props) => sizeString(Boolean(props.hasIcon))[props.size || 'medium']};
  border: 0;
  border-radius: 12px;
  background-color: #00A2FF;
  font-family: "Poppins", sans-serif;
  transition: background-color 100ms ease-out;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    background-color: #2b5797;
  }
  &:disabled {
    cursor: default;
    background-color: #00A2FF;
    opacity: 0.4;
  }
`;
