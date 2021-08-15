import React from 'react';
import styled from 'styled-components';

interface Props {
  size?: 'small' | 'medium' | 'large',
  hasIcon?: boolean,
  variant?: 'contained' | 'outlined',
}

const sizeString = (hasIcon: boolean) => ({
  small: `10px 20px 10px ${hasIcon ? 14 : 20}px`,
  medium: `12px 24px 12px ${hasIcon ? 18 : 24}px`,
  large: `14px 28px 14px ${hasIcon ? 22 : 28}px`,
});

export default styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.variant === 'outlined' ? 'rgb(240, 240, 240)' : 'white')};
  font-weight: 700;
  padding: ${(props) => sizeString(Boolean(props.hasIcon))[props.size || 'medium']};
  border: 0;
  border-radius: 12px;
  background-color: ${(props) => (props.variant === 'outlined' ? 'transparent' : '#00A2FF')};
  ${(props) => (props.variant === 'outlined' ? 'border: 3px solid rgb(44, 57, 71);' : '')};
  font-family: "Poppins", sans-serif;
  transition: background-color 100ms ease-out, border 100ms ease-out;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.variant === 'outlined' ? 'transparent' : '#2b5797')};
    ${(props) => (props.variant === 'outlined' ? 'border: 3px solid #00A2FF;' : '')};
  }
  &:disabled {
    cursor: default;
    background-color: ${(props) => (props.variant === 'outlined' ? 'transparent' : '#00A2FF')};
    ${(props) => (props.variant === 'outlined' ? 'border: 3px solid rgb(55, 71, 89);' : '')};
    opacity: 0.4;
  }
`;
