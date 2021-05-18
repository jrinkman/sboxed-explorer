import styled from 'styled-components';

interface Props {
  fontSize?: string;
  marginLeft?: number;
  marginRight?: number;
}

export default styled.div<Props>`
  color: white;
  padding: 6px 8px 6px 8px;
  border-radius: 16px;
  font-weight: 700;
  font-size: ${(props) => (props.fontSize || '1em')};
  background-color: rgba(0,0,0,0.35);
  backdrop-filter: blur(10px);
  cursor: default;
  user-select: none;
  margin-left: ${(props) => (props.marginLeft || 0)}px;
  margin-right: ${(props) => (props.marginRight || 0)}px;
`;
