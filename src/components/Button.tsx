import styled from 'styled-components';

export default styled.button`
  color: white;
  font-weight: 700;
  padding: 12px 24px 12px 24px;
  border: 0;
  border-radius: 12px;
  background-color: #00A2FF;
  font-family: "Poppins", sans-serif;
  transition: background-color 100ms ease-out;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    background-color: #2b5797;
  }
  &:disabled {
    cursor: default;
    background-color: #00A2FF;
    opacity: 0.4;
  }
`;
