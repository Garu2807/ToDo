import styled, { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;
export const StyledApp = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 300px;
`;
