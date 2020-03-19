import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.colors.background};
    font-size: 14px;
    color: ${props => props.theme.colors.textHeader};
    font-family: sans-serif;
  }

  html, body, #root {
    height: 100%;
    min-width: 1080px;
  }

  .p-1 {
    padding: 1rem;
  }

  .mr-1 {
    margin-right: 1rem;
  }
`;
