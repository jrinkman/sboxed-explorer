import styled from 'styled-components';

interface Props {
  marginLeft?: number;
  marginRight?: number;
  vertical?: boolean;
}

export default styled.div<Props>`
  display: flex;
  ${(props) => (props.vertical ? 'flex-direction: column;' : '')}
  padding-bottom: 10px;
  & button {
    margin-${(props) => (props.vertical ? 'top' : 'left')}: ${(props) => (props.marginLeft || 0)}px;
    margin-${(props) => (props.vertical ? 'bottom' : 'right')}: ${(props) => (props.marginRight || 0)}px;
  }
`;
