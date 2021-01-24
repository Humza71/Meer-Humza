import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import { CssBaseline } from "@material-ui/core";

import AuthBackground from "components/AuthBackground";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    background: ${(props) => props.theme.palette.background.default};
  }
`;

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 5% 15%;
  overflow: hidden;
`;

const Auth = ({ children }) => {
  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <AuthBackground />
      {children}
    </Root>
  );
};

export default Auth;
