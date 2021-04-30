import styled from 'styled-components';

interface BackgroundProps {
  background: string;
}

export default styled.div<BackgroundProps>`
position: fixed;
width: 100%;
height: 100%;
top: 0;
right: 0;
z-index: -100;
background-image: url("${(props) => props.background}");
background-size: cover;
opacity: 0.1;
`;
