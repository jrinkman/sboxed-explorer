import styled from 'styled-components';

interface Props {
  marginLeft?: number;
  marginRight?: number;
}

export default styled.div<Props>`
  display: flex;
  padding-bottom: 10px;
  & button {
    margin-left: ${(props) => (props.marginLeft || 0)}px;
    margin-right: ${(props) => (props.marginRight || 0)}px;
  }
`;
