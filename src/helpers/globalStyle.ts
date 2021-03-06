import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background-color: #0F1319;
    margin: 0;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
  }

  body::-webkit-scrollbar,
  body *::-webkit-scrollbar {
    width: 8px;
    height: 6px;
    border-radius: 8px;
    background-color: rgba(145, 158, 171, 0.24);
  }

  body::-webkit-scrollbar-thumb,
  body ::-webkit-scrollbar-thumb {
    border: none;
    border-radius: 8px;
    background-color: rgba(99, 115, 129, 0.48);
  }

  body::-webkit-scrollbar-thumb:hover,
  body ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(99, 115, 129, 0.88);
  }
`;
