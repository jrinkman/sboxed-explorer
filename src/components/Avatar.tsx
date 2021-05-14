import styled from 'styled-components';

interface Props {
  size?: 'small' | 'medium' | 'large'
  src: string;
}

const sizeStrings = {
  small: 40,
  medium: 50,
  large: 60,
};

export default styled.img<Props>`
  width: ${(props) => sizeStrings[props.size || 'medium']}px;
  height: ${(props) => sizeStrings[props.size || 'medium']}px;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 100ms ease-out;
  opacity: 1;
  margin-left: 12px;
  &:hover {
    opacity: 0.6;
  }
`;
