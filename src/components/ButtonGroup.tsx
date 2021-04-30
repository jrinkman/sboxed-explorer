import React, { useState } from 'react';
import styled from 'styled-components';

const Group = styled.div`
  display: inline-flex;
  button {
    color: white;
    font-weight: 700;
    opacity: 0.6;
    padding: 6px 12px 6px 12px;
    border: 0;
    background-color: #2b5797;
    font-family: "Poppins", sans-serif;
    transition: opacity 100ms ease-out;
    text-transform: uppercase;
    &:first-child {
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
    }
    &:last-child {
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
    }
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
    &.active {
      opacity: 1;
    }
  }
`;
interface Props {
  options: string[];
  onChange: (value: string) => void;
}

function ButtonGroup(props: Props) {
  const { options, onChange } = props;
  const [active, setActive] = useState<string>(options ? options[0] : 'none');

  const onClick = (key: string) => {
    setActive(key);
    onChange(key);
  };

  return (
    <Group>
      {options.map((option) => (
        <button
          className={option === active ? 'active' : undefined}
          type="button"
          key={option}
          onClick={() => onClick(option)}
        >
          {option}
        </button>
      ))}
    </Group>
  );
}

export default ButtonGroup;
