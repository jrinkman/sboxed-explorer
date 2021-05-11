import React from 'react';
import styled from 'styled-components';

interface Props {
  paddingBottom?: boolean;
  message?: string;
}

const Root = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: ${(props) => (props.paddingBottom ? '98px' : '0px')};
  & .message {
    color: white;
    opacity: 0.75;
    font-size: 1.2rem;
    font-weight: 700;
    margin-top: 24px;
  }
`;

const RippleLoader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

function Message(props: Props) {
  const { message, paddingBottom } = props;

  return (
    <Root paddingBottom={paddingBottom}>
      <RippleLoader>
        <div />
        <div />
      </RippleLoader>
      {message && <span className="message">{message}</span>}
    </Root>
  );
}

export default Message;
