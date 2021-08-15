import React, { useState } from 'react';
import styled from 'styled-components';

interface StyleProps {
  marginTop?: number;
  marginBottom?: number;
  width?: number;
}

const Input = styled.input<StyleProps>`
  display: flex;
  margin-top: ${(props) => (props.marginTop || 0)}px;
  margin-bottom: ${(props) => (props.marginBottom || 0)}px;
  min-width: ${(props) => (props.width || 220)}px;
  height: 33px;
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: white;
  background-color: #1c2635;
  border: 2.5px solid transparent;
  transition: border 200ms cubic-bezier(0, 0, 0, 1.0), border-radius 200ms cubic-bezier(0, 0, 0, 1.0), background-color 200ms cubic-bezier(0, 0, 0, 1.0);
  outline: none;
  &:disabled {
    opacity: 0.6;
  }
  &:focus {
    border: 2.5px solid #36404F;
    border-radius: 15px;
  }
`;

interface Props {
  placeholder?: string;
  marginTop?: number;
  marginBottom?: number;
  width?: number;
  onSubmit?: (text: string) => void;
}

export default function Search(props: Props) {
  const {
    placeholder, marginTop, marginBottom, width, onSubmit,
  } = props;
  const [search, setSearch] = useState('');

  // Search debounce
  React.useEffect(() => {
    const debouceTimer = setTimeout(() => { if (onSubmit) onSubmit(search); }, 350);
    return () => clearTimeout(debouceTimer);
  }, [search]);

  return (
    <Input
      type="text"
      value={search}
      placeholder={placeholder}
      marginTop={marginTop}
      marginBottom={marginBottom}
      width={width}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
