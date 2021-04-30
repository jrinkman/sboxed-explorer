import React, { useState } from 'react';
import styled from 'styled-components';

interface GroupProps {
  title?: string;
}

const Group = styled.div<GroupProps>`
  display: inline-flex;
  align-items: center;
  ${(props) => props.title && `
    background-color: #1c2635;
    padding: 4px;
    border-radius: 20px;
  `}
  & span.title {
    color: white;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    user-select: none;
    padding-left: 8px;
    padding-right: 12px;
  }
  button {
    color: white;
    font-size: 13px;
    font-weight: 700;
    opacity: 0.6;
    padding: 6px 12px 6px 12px;
    border: 0;
    background-color: #2b5797;
    font-family: "Poppins", sans-serif;
    transition: opacity 100ms ease-out;
    text-transform: uppercase;
    &:nth-child(${(props) => (props.title ? 2 : 1)}) {
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
  title?: string;
  options: string[];
  onChange: (value: string) => void;
}

function ButtonGroup(props: Props) {
  const { title, options, onChange } = props;
  const [active, setActive] = useState<string>(options ? options[0] : 'none');

  const onClick = (key: string) => {
    setActive(key);
    onChange(key);
  };

  return (
    <Group title={title}>
      {title && <span className="title">{title}</span>}
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
